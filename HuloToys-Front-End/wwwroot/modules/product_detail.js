$(document).ready(function () {
    product_detail.Initialization()
})
var product_detail = {
    Initialization: function () {
        product_detail.ShowLoading()
        product_detail.Detail()
        product_detail.DynamicBind()
    },
    DynamicBind: function () {
        $("body").on('click', ".attribute-detail", function () {
            var element = $(this)
            if (!element.hasClass('disabled')) {
                element.closest('ul').find('li').removeClass('active')
                element.addClass('active')
            }
            var product = product_detail.GetProductDetailSession()
            if (product != undefined) {
                product_detail.RenderChangedAttributeSelected(product)

            } else {
                window.location.reload()
            }
        });
        $("body").on('click', ".attribute-detail", function () {
            product_detail.RenderBuyNowButton()
        });
        $("body").on('click', ".add-cart", function () {
            product_detail.AddToCart()

        });
        $("body").on('click', ".buy-now", function () {
            product_detail.BuyNow()

        });
    },
    Detail: function () {
        var code = $('.section-details-product').attr('data-code')
        if (code == undefined || code.trim() == '')
            window.location.href = '/error'
        var request = {
            "id": code
        }
        $.when(
            global_service.POST(API_URL.ProductDetail, request)
        ).done(function (result) {
            if (result.is_success && result.data) {
                sessionStorage.setItem(STORAGE_NAME.ProductDetail, JSON.stringify(result.data))
                product_detail.RenderDetail(result.data)

            }
            else {
                window.location.href ='/Home/NotFound' 
            }
        })
    },
    RenderDetail: function (product) {
        var html = ''

        html += product_detail_constants.HTML.Images
            .replaceAll('{src}', product.avatar)

        $(product.images).each(function (index, item) {
            html += product_detail_constants.HTML.Images
                .replaceAll('{src}', item)

        });
        $('.section-details-product .gallery-product .swiper-wrapper').html(html)

        $('.section-details-product .name-product').html(product.name)
        if (product.product_sold_count == undefined || product.product_sold_count <= 0) {
            $('.section-details-product .total-sold').hide()
        } else {
            $('.section-details-product .total-sold').html(global_service.Comma(product.product_sold_count) + ' Đã bán')
        }
        if (product.reviews_count == undefined || product.reviews_count <= 0) {
            $('.section-details-product .total-sold').hide()
        } else {
            $('.section-details-product .total-review').html( global_service.Comma(product.reviews_count) + ' Đánh giá')
        }
      

        html = ''
        for (var i = 0; i < (product.star <= 0 ? 5 : product.star); i++) {
            html += product_detail_constants.HTML.Star
        }
        html += '' + (product.star <= 0 ? 5 : product.star)
        $('.box-review .review').html(html)

        if (product.variations != undefined && product.variations.length > 0) {
            const max_obj = product.variations.reduce(function (prev, current) {
                return (prev && prev.amount > current.amount) ? prev : current
            })
            const min_obj = product.variations.reduce(function (prev, current) {
                return (prev && prev.amount < current.amount) ? prev : current
            })
            if (max_obj.amount <= min_obj.amount)
                $('.section-details-product .price').html(global_service.Comma(min_obj.amount))
            else
                $('.section-details-product .price').html(global_service.Comma(min_obj.amount) + ' - ' + global_service.Comma(max_obj.amount))
        }
        else {
            $('.section-details-product .price').html(global_service.Comma(product.amount))

        }
        if (product.discount > 0) {
            $('#price-old').html(global_service.Comma(product.amount + product.discount))
        } else {
            $('#price-old').closest('.price-old').hide()
        }
        var total_stock = product.quanity_of_stock

        html = ''
        //html += product_detail_constants.HTML.Tr_Voucher.replaceAll('{span}', '')
        //html += product_detail_constants.HTML.Tr_Combo.replaceAll('{span}', '')
        html += product_detail_constants.HTML.Tr_Shipping
        //html += product_detail_constants.HTML.Tr_Combo.replaceAll('{span}', '')
        if (product.variations != undefined && product.variations.length > 0) {
            $(product.attributes).each(function (index, attribute) {
                var attr_detail =  product.attributes_detail.filter(obj => {
                    return obj.attribute_id === attribute._id
                })
                var html_item=''
                if (attr_detail != undefined && attr_detail.length > 0) {
                    $(attr_detail).each(function (index_detail, attribute_detail) {
                        html_item += product_detail_constants.HTML.Tr_Attributes_Td_li
                            .replaceAll('{active}', '')
                            .replaceAll('{src}', attribute_detail.img != undefined && attribute_detail.img.trim() != '' ? '<img src="' + attribute_detail.img +'" />':'')
                            .replaceAll('{name}', attribute_detail.name)
                    })
                }
                html += product_detail_constants.HTML.Tr_Attributes
                    .replaceAll('{level}', attribute._id)
                    .replaceAll('{name}', attribute.name)
                    .replaceAll('{li}', html_item)
            });
            total_stock = product.variations.reduce((n, { amount }) => n + amount, 0)
        }
        html += product_detail_constants.HTML.Tr_Quanity.replaceAll('{stock}', global_service.Comma(total_stock))
        
        $('.box-info-details tbody').html(html)
        $('#description').html(product.description)

        //--hide voucher (implement later):
        $('#voucher').hide()
        //$('#combo-discount').hide()
        $('#combo-discount .list-product .item-product').each(function (index, item) {
            var element = $(this)
            if (index < 5) return true
            else element.hide()
        })
        product_detail.RenderBuyNowButton()

        product_detail.RemoveLoading()
    },
    GetProductDetailSession: function () {
        var json = sessionStorage.getItem(STORAGE_NAME.ProductDetail)
        if (json != undefined && json.trim()!='') {
            return JSON.parse(json)
        }
        return undefined
    },
    RenderChangedAttributeSelected: function (product) {
        var options=[]
        $('.box-info-details tbody .attributes').each(function (index, item) {
            var element = $(this)
            var value = element.find('.box-tag').find('.active').attr('data-id')
            var level = element.attr('data-level')
            options.push({
                _id: null,
                level: level,
                name: value
            })
        })

        var variation = product.variations.filter(obj => {
            return product_detail.Compare2Array(obj.variation_attributes, options)
        })
        if (variation != undefined && variation.length>0) {
            $('.section-details-product .price').html(global_service.Comma(variation[0].amount))
            $('.box-info-details .box-detail-stock .soluong').html(global_service.Comma(variation[0].quanity_of_stock) + ' sản phẩm có sẵn')
        }
    },
    RenderBuyNowButton: function () {
        var no_select_all = false
        if ($('.box-info-details tbody .attributes').length <= 0) {

        }
        else {
            $('.box-info-details tbody .attributes').each(function (index, item) {
                var element = $(this)
                var li_active = element.find('.box-tag').find('.active')
                if (li_active.length <= 0) {
                    no_select_all = true
                    return false
                }
            })
        }
        if (no_select_all) {
            $('.add-cart').prop('disabled',true)
            $('.buy-now').prop('disabled', true)
            $('.add-cart').addClass('button-disabled')
            $('.buy-now').addClass('button-disabled')

        } else {
            $('.add-cart').prop('disabled', false)
            $('.buy-now').prop('disabled', false)
            $('.add-cart').removeClass('button-disabled')
            $('.buy-now').removeClass('button-disabled')
        }
    },
    AddToCart: function () {
        var product = product_detail.GetProductDetailSession()
        var usr = global_service.CheckLogin()
        var account_client_id=0
        if (usr) {
            account_client_id = usr.account_client_id
            var request = {
                "product": product,
                "quanity": parseInt($('#box-detail-stock .quantity').val()),
                "account_client_id": account_client_id
            }
            $.when(
                global_service.POST(API_URL.AddToCart, request)
            ).done(function (result) {
                if (result.is_success && result.data) {
                    sessionStorage.removeItem(STORAGE_NAME.ProductDetail)
                    sessionStorage.removeItem(STORAGE_NAME.BuyNowItem)
                    var cart_count = sessionStorage.getItem(STORAGE_NAME.CartCount)
                    if (cart_count) {
                        sessionStorage.setItem(STORAGE_NAME.CartCount, (parseInt(cart_count) + 1))
                    } else {
                        sessionStorage.setItem(STORAGE_NAME.CartCount, 1)
                    }
                    global_service.LoadCartCount()
                    //window.location.href = '/Order/Cart'
                }
            })
        }
        else {
            $('.mainheader .client-login').click()
            return
        }
       
    },
    BuyNow: function () {
        var product = product_detail.GetProductDetailSession()
        var usr = global_service.CheckLogin()
        var account_client_id = 0
        if (usr) {
            account_client_id = usr.account_client_id
            var request = {
                "product": product,
                "quanity": parseInt($('#box-detail-stock .quantity').val()),
                "account_client_id": account_client_id
            }
            sessionStorage.setItem(STORAGE_NAME.BuyNowItem, JSON.parse(request))
            window.location.href = '/Order/Payment'
        }
        else {
            $('.mainheader .client-login').click()
            return
        }
      
    },
    Compare2Array: function (arr1, arr2) {
        const objectsEqual = (o1, o2) =>
            Object.keys(o1).length === Object.keys(o2).length
            && Object.keys(o1).every(p => o1[p] === o2[p]);
        const arraysEqual = (a1, a2) =>
            a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]));
        return arraysEqual(arr1, arr2)

    },
    ShowLoading: function () {
        $('.section-details-product').addClass('placeholder')
        $('.section-description-product').addClass('placeholder')
        $('.section-category').addClass('placeholder')
    },
    RemoveLoading: function () {
        $('.section-details-product').removeClass('placeholder')
        $('.section-description-product').removeClass('placeholder')
        $('.section-category').removeClass('placeholder')
    }
}
var product_detail_constants = {
    HTML: {
        Images:`<div class="swiper-slide">
                                <img src="{src}" alt="" />
                            </div>`,
        Star:`<i class="icon icon-star"></i>`,
        Tr_Voucher:` <tr>
                                 <td>Mã giảm giá</td>
                                <td>
                                   {span}
                                </td> 
                            </tr>`,
        Tr_Voucher_Td_span:`<span class="coupon" data-id="{id}">{name}</span>`,
        Tr_Combo:` <tr>
                                <td>Combo khuyến mại</td>
                                <td> {span} </td>
                            </tr>`,
        Tr_Combo_Td_span: ` <span class="combo" data-id="{id}">{name}</span>`,

        Tr_Shipping:` <tr>
                                <td>Vận chuyển</td>
                                <td>Miễn phí vận chuyển</td>
                            </tr>`,
        Tr_Attributes:`<tr class="attributes" data-level="{level}">
                                <td>{name}</td>
                                <td>
                                    <ul class="box-tag">
                                       {li}

                                    </ul>
                                </td>
                            </tr>`,
        Tr_Attributes_Td_li: `<li class="attribute-detail {active}" data-id="{name}">{src} {name}</li>`,
        Tr_Quanity:`<tr class="box-detail-stock">
                                <td>Số lượng:</td>
                                <td>
                                    <div class="number-input">
                                        <button onclick="this.parentNode.querySelector('input[type=number]').stepDown()"></button>
                                        <input class="quantity" min="0" name="quantity" value="1" type="number">
                                        <button onclick="this.parentNode.querySelector('input[type=number]').stepUp()" class="plus"></button>
                                    </div>

                                    <span class="soluong">{stock} sản phẩm có sẵn</span>
                                </td>
                            </tr>`

    }
}