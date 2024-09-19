$(document).ready(function () {
	
    product_detail.Initialization()
})
var product_detail = {
    Initialization: function () {
        sessionStorage.removeItem(STORAGE_NAME.ProductDetail)
        sessionStorage.removeItem(STORAGE_NAME.SubProduct)
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
    //    $("body").on('click', ".attribute-detail", function () {
    //        product_detail.RenderBuyNowButton()
    //    });
    //    $("body").on('click', ".add-cart", function () {
    //        product_detail.AddToCart()

    //    });
    //    $("body").on('click', ".buy-now", function () {
    //        product_detail.BuyNow()

    //    });
    //    $("body").on('click', ".btn-go-to-cart", function () {
    //        window.location.href='/cart'

        //});
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
            if (result != null && result != undefined) {
                $('.section-details-product').removeClass('placeholder')
                $('.section-details-product').html(result)
                var swiperSmallThumb = new Swiper(".thumb-small", {
                    spaceBetween: 15,
                    slidesPerView: 4,
                    freeMode: true,
                    watchSlidesProgress: true,
                    navigation: {
                        nextEl: '.thumb-small .swiper-button-next',
                        prevEl: '.thumb-small .swiper-button-prev',
                    },
                });
                var swiperBigThumb = new Swiper(".thumb-big", {
                    spaceBetween: 15,
                    navigation: false,
                    thumbs: {
                        swiper: swiperSmallThumb,
                    },
                });
            }
            else {
               window.location.href='/error'

            }
        })
        $.when(
            global_service.POST(API_URL.GetProductDetail, request)
        ).done(function (result) {
            if (result.is_success && result.data && result.data.product_main) {
                sessionStorage.setItem(STORAGE_NAME.ProductDetail, JSON.stringify(result.data))
                sessionStorage.setItem(STORAGE_NAME.SubProduct, JSON.stringify(result.data.product_sub))
            }
        })
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
            $('.box-info-details .attribute-table .attributes').each(function (index, item) {
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
        $('.box-info-details .attribute-table .attributes').each(function (index, item) {
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
        if ($('.box-info-details .attribute-table .attributes').length <= 0) {

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
    AddToCart: function (buy_now=false) {
        var product = product_detail.GetSubProductSessionByAttributeSelected()
        if (product == undefined) {
            var json = sessionStorage.getItem(STORAGE_NAME.ProductDetail)
            if (json != undefined && json.trim() != '') {
                product = JSON.parse(json).product_main
               
            }
        }
        if (product == undefined) {
            window.location.reload()
        }
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
                    global_service.LoadCartCount()
                    product_detail.SuccessAddToCart()
                }
            })
        }
        else {
            product_detail.SaveProductDetailAttributeSelected()
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
        var product = product_detail.GetSubProductSessionByAttributeSelected()
        if (product == undefined) {
            var json = sessionStorage.getItem(STORAGE_NAME.ProductDetail)
            if (json != undefined && json.trim() != '') {
                product = JSON.parse(json).product_main

            }
        }
        if (product == undefined) {
            window.location.reload()
        }
        var usr = global_service.CheckLogin()
        var account_client_id = 0
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
                    sessionStorage.setItem(STORAGE_NAME.BuyNowItem, JSON.stringify(request) )
                    window.location.href ='/cart'
                }
            })
        }
        else {
            $('.mainheader .client-login').click()
            product_detail.SaveProductDetailAttributeSelected()
            return
        }
      
    },
    SaveProductDetailAttributeSelected: function () {
        var selected = {
            attributes: [],
            quanity:1
        }
        $('.box-info-details .attributes').each(function (index_detail, attribute_detail) {
            var tr_attributes = $(this)
            if (tr_attributes.find('.active').length > 0) {
                selected.attributes.push({
                    "level": tr_attributes.attr('data-level'),
                    "data": tr_attributes.find('.active').attr('data-id')
                })
            }
        })
        selected.quanity = $('.quantity').val()
        sessionStorage.setItem(STORAGE_NAME.ProductDetailSelected, JSON.stringify(selected))

    },
    RenderSavedProductDetailAttributeSelected: function () {
        var selected = sessionStorage.getItem(STORAGE_NAME.ProductDetailSelected)
        if (selected) {
            var data = JSON.parse(selected)
            if (data != undefined) {
                if (data.attributes != undefined && data.attributes.length > 0) {
                    $('.box-info-details .attributes').each(function (index_detail, attribute_detail) {
                        var tr_attributes = $(this)
                        var level = tr_attributes.attr('data-level')
                        var selected_value = data.attributes.filter(obj => {
                            return obj.level == level
                        })

                        tr_attributes.find('li').each(function (index_detail, attribute_detail) {
                            var li_attribute = $(this)
                            if (li_attribute.attr('data-id') == selected_value[0].data) {
                                li_attribute.trigger('click')
                                return false
                            }

                        })
                    })
                }
                if (data.quanity != undefined && data.quanity.trim() != '') {
                    $('.quantity').val(data.quanity)
                }
            }
            sessionStorage.removeItem(STORAGE_NAME.ProductDetailSelected)
        }


    },
    Compare2Array: function (arr1, arr2) {
        const objectsEqual = (o1, o2) =>
            Object.keys(o1).length === Object.keys(o2).length
            && Object.keys(o1).every(p => o1[p] === o2[p]);
        const arraysEqual = (a1, a2) =>
            a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]));
        return arraysEqual(arr1, arr2)

    }
}

