$(document).ready(function () {
	 if (window.history && window.history.pushState) {
         $(window).on('popstate', function () {
             debugger
            window.location.reload()
        });

    }
    cart.Initialization()
})
var cart = {
    Data: {
        cancel_token:false
    },
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
        $("body").on('click', ".box-checkbox-all", function () {
            var element = $(this)
            var checkbox = element.closest('.box-checkbox').find('input')
            if (!checkbox.is(":checked")) {
                $('.table-addtocart .box-checkbox').each(function (index_var, variation_item) {
                    var element_product = $(this)
                    element_product.find('input').prop('checked', true)
                })
            } else {
                $('.table-addtocart .box-checkbox').each(function (index_var, variation_item) {
                    var element_product = $(this)
                    element_product.find('input').prop('checked', false)
                })
            }
            cart.ReRenderAmount()
        });
        $("body").on('click', ".box-checkbox-label,.delivery .list-option label,.pay .list-option label", function () {
            var element = $(this)
            element.closest('.box-checkbox').find('input').click()
            var check_all=true
            $('.table-addtocart .box-checkbox').each(function (index_var, variation_item) {
                var element_checkbox = $(this)
                if (!element_checkbox.find('input').is(":checked")) {
                    check_all = false
                    return false
                }
            })
            if (check_all) {
                $('.box-checkbox-all').closest('.box-checkbox').find('input').prop('checked', true)
            } else {
                $('.box-checkbox-all').closest('.box-checkbox').find('input').prop('checked', false)

            }
            var value = element.closest('.box-checkbox').find('.option-name').text()
            element.closest('.select-option').find('.tt').text(value)
            if (!element.closest('.list-option').is(':hidden')) {
                element.closest('.list-option').fadeOut()
            }
        });
        $("body").on('click', ".box-checkbox, .number-input button, .checkbox-cart", function () {
            cart.ReRenderAmount()
        });
        $("body").on('click', ".btn-confirm-cart", function () {
            cart.ConfirmCart()
        });
        $("body").on('keyup', ".product-quantity input", function () {
            $('.btn-confirm-cart').addClass('button-disabled')
            $('.btn-confirm-cart').addClass('placeholder')

            var element = $(this)
            setTimeout(() => {
                cart.ChangeCartQuanity(element.closest('.product'))
                cart.ReRenderAmount()

            }, 1000);

        });
        $("body").on('click', ".product-quantity button", function () {
            $('.btn-confirm-cart').addClass('button-disabled')
            $('.btn-confirm-cart').addClass('placeholder')

            var element = $(this)
            setTimeout(() => {
                cart.ChangeCartQuanity(element.closest('.product'))
                cart.ReRenderAmount()

            }, 1000);
        });
        $("body").on('click', "#lightbox-delete-cart .btn-back", function () {
            $('#lightbox-delete-cart').removeClass('overlay-active')


        });
    },
    OrderAddress: function () {
        cart.RenderDefaultAddress();
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
    RenderDefaultAddress: function () {
        var usr = global_service.CheckLogin()
        if (usr == undefined || usr.account_client_id == undefined) {
            return
        }
        var request = {
            "account_client_id": usr.account_client_id
        }
        $.when(
            global_service.POST(API_URL.DefaultAddress, request)
        ).done(function (result) {
            if (result.is_success) {
                cart.ConfirmCartAddress(result.data)

            }
        })
    },
    ConfirmCartAddress: function (data) {
        if (data != undefined && data.id != undefined) {
            $('#address-receivername').attr('data-id', data.id)
            $('#address-receivername').html(data.receivername)
            $('#address-phone').html(data.phone)
            $('#address').html(address_client.RenderDetailAddress(data))
            sessionStorage.setItem(STORAGE_NAME.CartAddress, JSON.stringify(data))
        }
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
                    cart.RenderBuyNowSelection()
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
                .replaceAll('{id}', item._id)
                .replaceAll('{product_id}', item.product._id)
                .replaceAll('{amount}', item.product.amount)
                .replaceAll('{name}', item.product.name)
                .replaceAll('{amount_display}', global_service.Comma(item.product.amount))
                .replaceAll('{quanity}', global_service.Comma(item.quanity))
                .replaceAll('{total_amount}', global_service.Comma(item.total_amount))
            var variation_value = ''
            $(item.product.variation_detail).each(function (index_var, variation_item) {
                var attribute = item.product.attributes.filter(obj => {
                    return obj._id === variation_item.id
                })
                var attribute_detail = item.product.attributes_detail.filter(obj => {
                    return (obj.name === variation_item.name && obj.name === variation_item.name)
                })
                variation_value += attribute[0].name + ':' + attribute_detail[0].name
                if (index_var < ($(item.product.variation_detail).length - 1)) {
                    variation_value += ', <br />'
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


        //-- Remove placeholder:
        $('.section-cart').removeClass('placeholder')
        //--Render Amount:
        cart.ReRenderAmount()
        cart.RenderCartNumberOfProduct()
    },
    RenderBuyNowSelection: function () {
        var buy_now_item = sessionStorage.getItem(STORAGE_NAME.BuyNowItem)
        if (buy_now_item) {
            var buy_now = JSON.parse(buy_now_item)
            $('.table-addtocart .product').each(function (index, item) {
                var element = $(this)
                if (element.attr('data-product-id') == buy_now.product_id) {
                    element.find('.checkbox-cart').prop('checked', true)
                    cart.ReRenderAmount()
                    return false
                }
            })
            sessionStorage.removeItem(STORAGE_NAME.BuyNowItem)
        }
        
    },
    RenderCartNumberOfProduct: function () {
        $('.total-sp').html('(' + $('.table-addtocart .product').length + ' sản phẩm) ')

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
            sessionStorage.removeItem(STORAGE_NAME.CartCount)
            global_service.LoadCartCount()
            cart.RenderCartNumberOfProduct()
            cart.ReRenderAmount()

        })
        $('#lightbox-delete-cart').removeClass('overlay-active')
       

        
    },
    
    ConfirmCart: function () {
        var usr = global_service.CheckLogin()
        if (usr) {
            var carts = []
            $('.table-addtocart .product').each(function (index, item) {
                var element = $(this)
                if (element.find('.checkbox-cart').is(':checked')) {
                    var cart = {
                        "id": element.attr('data-cart-id'),
                        "amount": element.attr('data-amount'),
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
                    "address": JSON.parse(sessionStorage.getItem(STORAGE_NAME.CartAddress)) 
                }
                $.when(
                    global_service.POST(API_URL.CartConfirm, request)
                ).done(function (result) {
                    if (result.is_success && result.data != undefined) {
                        request.result = result.data
                        sessionStorage.setItem(STORAGE_NAME.Order, JSON.stringify(request))
                        sessionStorage.removeItem(STORAGE_NAME.CartCount)
                        global_service.LoadCartCount()

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
       
    },
    ChangeCartQuanity: function (element) {

        var product_id = element.attr('data-product-id')
        if (product_id == undefined || product_id.trim() == '') return
        var usr = global_service.CheckLogin()
        var account_client_id = 0
        if (usr) {
            account_client_id = usr.account_client_id
            var request = {
                "product_id": product_id,
                "quanity": parseInt(element.find('.product-quantity').find('input').val()),
                "account_client_id": account_client_id
            }
            $.when(
                global_service.POST(API_URL.CartChangeQuanity, request)
            ).done(function (result) {
                $('.btn-confirm-cart').removeClass('placeholder')


            })
        }
        else {
            $('.btn-confirm-cart').removeClass('placeholder')


            return
        }

    },
    CheckCartProductDetail: function (carts) {
        var request = {
            "carts": carts
        }
        $.when(
            global_service.POST(API_URL.CartChangeQuanity, request)
        ).done(function (result) {

        })
    }
}