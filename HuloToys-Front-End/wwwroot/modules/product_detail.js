﻿$(document).ready(function () {
    product_detail.Initialization()
})
var product_detail = {
    Initialization: function () {

        product_detail.ShowLoading()
        sessionStorage.removeItem(STORAGE_NAME.ProductDetail)

        sessionStorage.removeItem(STORAGE_NAME.SubProduct)
        product_detail.Detail()
        product_detail.DynamicBind()
        global_service.LoadHomeProductGrid($('#combo-discount .list-product'), GLOBAL_CONSTANTS.GroupProduct.FlashSale, GLOBAL_CONSTANTS.Size)
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
        $("body").on('click', ".btn-go-to-cart", function () {
            window.location.href='/cart'

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
            
            if (result.is_success && result.data && result.data.product_main) {
                sessionStorage.setItem(STORAGE_NAME.ProductDetail, JSON.stringify(result.data))
                sessionStorage.setItem(STORAGE_NAME.SubProduct, JSON.stringify(result.data.product_sub))
                product_detail.RenderDetail(result.data.product_main, result.data.product_sub)
            }
            else {
                window.location.href ='/Home/NotFound' 
            }
        })
    },
    RenderDetail: function (product,product_sub) {
        var html = ''
        var img_src = product.avatar
        img_src = global_service.CorrectImage(product.avatar)


        html += HTML_CONSTANTS.Detail.Images
            .replaceAll('{src}', img_src)

        $(product.images).each(function (index, item) {

           img_src= global_service.CorrectImage(item)
            html += HTML_CONSTANTS.Detail.Images
                .replaceAll('{src}', img_src)

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
            html += HTML_CONSTANTS.Detail.Star
        }
        html += '' + (product.star <= 0 ? 5 : product.star)
        $('.box-review .review').html(html)

        if (product_sub != undefined && product_sub.length > 0) {
            const max_obj = product_sub.reduce(function (prev, current) {
                return (prev && prev.amount > current.amount) ? prev : current
            })
            const min_obj = product_sub.reduce(function (prev, current) {
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
        //html += HTML_CONSTANTS.Detail.Tr_Voucher.replaceAll('{span}', '')
        //html += HTML_CONSTANTS.Detail.Tr_Combo.replaceAll('{span}', '')
        html += HTML_CONSTANTS.Detail.Tr_Shipping
        //html += HTML_CONSTANTS.Detail.Tr_Combo.replaceAll('{span}', '')
        if (product_sub != undefined && product_sub.length > 0) {
            $(product.attributes).each(function (index, attribute) {
                var attr_detail =  product.attributes_detail.filter(obj => {
                    return obj.attribute_id === attribute._id
                })
                var html_item=''
                if (attr_detail != undefined && attr_detail.length > 0) {
                    $(attr_detail).each(function (index_detail, attribute_detail) {
                        img_src = global_service.CorrectImage(attribute_detail.img)

                        html_item += HTML_CONSTANTS.Detail.Tr_Attributes_Td_li
                            .replaceAll('{active}', '')
                            .replaceAll('{src}', attribute_detail.img != undefined && attribute_detail.img.trim() != '' ? '<img src="' + img_src +'" />':'')
                            .replaceAll('{name}', attribute_detail.name)
                    })
                }
                html += HTML_CONSTANTS.Detail.Tr_Attributes
                    .replaceAll('{level}', attribute._id)
                    .replaceAll('{name}', attribute.name)
                    .replaceAll('{li}', html_item)
            });
            total_stock = product_sub.reduce((n, { amount }) => n + amount, 0)
        }
        html += HTML_CONSTANTS.Detail.Tr_Quanity.replaceAll('{stock}', global_service.Comma(total_stock))
        
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
    GetSubProductSessionByAttributeSelected: function () {
        var json = sessionStorage.getItem(STORAGE_NAME.SubProduct)
        if (json != undefined && json.trim() != '') {
            var list = JSON.parse(json)
            var sub_list = list
            var options = []
            $('.box-info-details tbody .attributes').each(function (index, item) {
                var element = $(this)
                var value = element.find('.box-tag').find('.active').attr('data-id')
                var level = element.attr('data-level')
                options.push({
                    id: level,
                    name: value
                })

            })
            $(options).each(function (index, item) {
                
                sub_list = sub_list.filter(({ variation_detail }) =>
                    variation_detail.some(v => v.id == item.id && v.name==item.name)
                )
                    

            })
            return sub_list[0]
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
                id: level,
                name: value
            })
        })
        var json = sessionStorage.getItem(STORAGE_NAME.SubProduct)
        if (json != undefined && json.trim() != '') {
            var list = JSON.parse(json)
            var variation = list.filter(obj => {
                return product_detail.Compare2Array(obj.variation_detail, options)
            })
            if (variation != undefined && variation.length > 0) {
                $('.section-details-product .price').html(global_service.Comma(variation[0].amount))
                $('.box-info-details .box-detail-stock .soluong').html(global_service.Comma(variation[0].quanity_of_stock) + ' sản phẩm có sẵn')
            }
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
        var product = product_detail.GetSubProductSessionByAttributeSelected()
        var usr = global_service.CheckLogin()
        var account_client_id=0
        if (usr) {
            account_client_id = usr.account_client_id
            var request = {
                "product_id": product._id,
                "quanity": parseInt($('.box-detail-stock .quantity').val()),
                "account_client_id": account_client_id
            }
            $.when(
                global_service.POST(API_URL.AddToCart, request)
            ).done(function (result) {
                if (result.is_success && result.data) {
                    sessionStorage.removeItem(STORAGE_NAME.BuyNowItem)
                    if (result.data == 1) global_service.IncreaseCartCount()
                    product_detail.SuccessAddToCart()
                }
            })
        }
        else {
            $('.mainheader .client-login').click()
            return
        }
       
    },
    SuccessAddToCart: function () {
        $('#thanhcong .lightbox-description').html('Thêm sản phẩm vào giỏ hàng thành công')
        $('#thanhcong').addClass('overlay-active')
        $('#thanhcong .btn-close').addClass('btn-go-to-cart')
        $('#thanhcong .btn-close').removeClass('btn-close')
        $('#thanhcong .btn-go-to-cart').html('Xem giỏ hàng')
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

