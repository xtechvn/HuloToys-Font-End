$(document).ready(function () {
    cart.Initialization()
})
var cart = {
    Initialization: function () {
        cart.DynamicBind()
        cart.CartItem()
        $('.select-delivery .list-option').fadeOut()
        $('.select-bank .list-option').fadeOut()
        $('.voucher ').hide()
        cart.OrderAddress()

    },
    DynamicBind: function () {
        $("body").on('click', ".select-delivery .tt, .select-bank .tt ", function () {
            var element = $(this)
            var list_option = element.closest('.select-option').find('.list-option')
            if (list_option.is(':hidden')) {
                $('.select-delivery .list-option').fadeOut()
                $('.select-bank .list-option').fadeOut()
                list_option.fadeIn()

            } else {
                list_option.fadeOut()
            }

        });
        $("body").on('click', ".section-cart .table-addtocart .remove-product", function () {
            var element = $(this)
            cart.RemoveCartItem(element.closest('.product').attr('data-cart-id'))
        });
        $("body").on('click', "#lightbox-delete-cart .btn-save", function () {
            cart.ConfirmRemoveCartItem()
        });
        $("body").on('click', ".box-checkbox-label,.delivery .list-option label,.pay .list-option label", function () {
            var element = $(this)
            element.closest('.box-checkbox').find('input').click()
            var value = element.closest('.box-checkbox').find('.option-name').text()
            element.closest('.select-option').find('.tt').text(value)
            if (!element.closest('.list-option').is(':hidden')) {
                element.closest('.list-option').fadeOut()
            }
        });
        $("body").on('click', ".box-checkbox input, .number-input button", function () {            
            cart.ReRenderAmount()
        });
        $("body").on('click', ".btn-confirm-cart", function () {
            cart.ConfirmCart()
        });
    },
    OrderAddress: function () {
        var request = {

        }
        $.when(
            global_service.POST(API_URL.AddressPopup, request)
        ).done(function (result) {
            $('body').append(result)
            address_client.Initialization()
            address_client.DynamicConfirmAddress(function (data) {
                cart.ConfirmCartAddress(data)
            })
        })
    },
    ConfirmCartAddress: function (data) {
        
        debugger
    },
    CartItem: function () {
        var usr = global_service.CheckLogin()
        if (usr) {
            var request = {
                "account_client_id": usr.account_client_id
            }
            $.when(
                global_service.POST(API_URL.CartList, request)
            ).done(function (result) {
                if (result.is_success && result.data && result.data.length > 0) {
                    cart.RenderCartItem(result.data)
                }
                else {
                    $('#main').html(HTML_CONSTANTS.Cart.Empty)

                }
            })

        } else {
            $('#main').html(HTML_CONSTANTS.Cart.Empty)
            $('.mainheader .client-login').click()
        }
     

    },
    RenderCartItem: function (list) {
        var html = ''
        var total_amount = 0

        //-- Table Product
        $(list).each(function (index, item) {
            var html_item = HTML_CONSTANTS.Cart.Product
                .replaceAll('{id}',item._id)
                .replaceAll('{amount}', item.product.amount)
                .replaceAll('{name}', item.product.name)
                .replaceAll('{amount_display}', global_service.Comma(item.product.amount))
                .replaceAll('{quanity}', global_service.Comma(item.quanity))
                .replaceAll('{total_amount}', global_service.Comma(item.total_amount))
            var variation_value=''
            $(item.product.variation_detail).each(function (index_var, variation_item) {
                var attribute = item.product.attributes.filter(obj => {
                    return obj._id === variation_item.id
                })
                var attribute_detail = item.product.attributes_detail.filter(obj => {
                    return (obj.name === variation_item.name && obj.name === variation_item.name)
                })
                variation_value += attribute[0].name + ':' + attribute_detail[0].name
                if (index_var < ($(item.product.variation_detail).length - 1)) {
                    variation_value+=', <br />'
                }
            })
            var img_src = item.product.avatar
            if (!img_src.includes(API_URL.StaticDomain)
                && !img_src.includes("data:image")
                && !img_src.includes("http"))
                img_src = API_URL.StaticDomain + item.product.avatar

            html_item = html_item
                .replaceAll('{attribute}', variation_value)
                .replaceAll('{src}', img_src)

            html += html_item
            total_amount += item.total_amount
        });
        $('.section-cart .table-addtocart').html(html)
        $('.total-shipping-fee').hide()
        $('.total-sp').html('('+ $('.table-addtocart .product').length+  ' sản phẩm) ')


        //-- Remove placeholder:
        $('.section-cart').removeClass('placeholder')
      //--Render Amount:
        cart.ReRenderAmount()

    },
    ReRenderAmount: function () {
        var total_amount_cart = 0

        $('.table-addtocart .product').each(function (index, item) {
            var element = $(this)
            
            var amount = parseFloat(element.attr('data-amount'))
            var quanity = parseInt(element.find('.quantity').val())
            var total_amount_product = amount * quanity
            element.find('.product-line-price').html(global_service.Comma(total_amount_product) + ' đ')
            if (element.find('.checkbox-cart').is(":checked")){
                total_amount_cart += total_amount_product
            }
            $('.total-amount .pr').html(global_service.Comma(total_amount_cart) + ' đ')
            $('.total-final-amount .pr').html(global_service.Comma(total_amount_cart) + ' đ')
        })
        if (total_amount_cart > 0) {
            $('.btn-confirm-cart').removeClass('button-disabled')

        } else {
            $('.btn-confirm-cart').addClass('button-disabled')

        }
    },
    RemoveCartItem: function (data_id) {
        $('#lightbox-delete-cart').addClass('overlay-active')
        $('#lightbox-delete-cart').attr('data-cart-id', data_id)
    },
    ConfirmRemoveCartItem: function () {
        var data_id = $('#lightbox-delete-cart').attr('data-cart-id')
        $('.table-addtocart .product').each(function (index, item) {
            var element = $(this)
            if (element.attr('data-cart-id') == data_id) {
                element.remove()
                return false
            }
        })
        if ($('.table-addtocart .product').length <= 0) {
            $('#main').html(HTML_CONSTANTS.Cart.Empty)

        }
        var request = {
            "id": data_id
        }
        $.when(
            global_service.POST(API_URL.CartDelete, request)
        ).done(function (result) {
            for (var i = 0; i < $('.table-addtocart .product').length; i++) {
                global_service.DecreaseCartCount()

            }
        })
        $('#lightbox-delete-cart').removeClass('overlay-active')
       

        
    },
    ConfirmCart: function () {
        $('.btn-confirm-cart').addClass('button-disabled')
        var usr = global_service.CheckLogin()
        if (usr) {
            var carts = []
            $('.table-addtocart .product').each(function (index, item) {
                var element = $(this)
                if (element.find('.checkbox-cart').is(':checked')) {
                    var cart = {
                        "id": element.attr('data-cart-id'),
                        "quanity": parseInt(element.find('.quantity').val())
                    }
                    carts.push(cart)
                }
            })
            if (carts.length > 0) {
                var request = {
                    "carts": carts,
                    "account_client_id": usr.account_client_id,
                    "payment_type": $('input[name="select-bank"]:checked').val(),
                    "delivery_type": $('input[name="select-delivery"]:checked').val(),
                }
                $.when(
                    global_service.POST(API_URL.CartConfirm, request)
                ).done(function (result) {
                    if (result.is_success && result.data != undefined) {
                        request.result = result.data
                        sessionStorage.setItem(STORAGE_NAME.Order, JSON.stringify(request))
                        global_service.DecreaseCartCount()

                        window.location.href = '/order/payment/' + result.data.id

                    }
                    else {
                        $('#lightbox-cannot-add-cart').addClass('overlay-active')
                        $('.btn-confirm-cart').removeClass('button-disabled')


                    }

                })
            }
           

        } else {
            $('.mainheader .client-login').click()
            $('.btn-confirm-cart').removeClass('button-disabled')
            return
        }
       
    }
}