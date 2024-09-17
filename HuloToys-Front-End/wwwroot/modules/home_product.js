$(document).ready(function () {
    home_product.Initialization()
})
var home_product = {
    Initialization: function () {
        if ($('.list-product-sale .swiper-wrapper').length > 0) {
            //--Product Sale Slide:
            global_service.LoadHomeProductGrid($('.list-product-sale .swiper-wrapper'), GLOBAL_CONSTANTS.GroupProduct.FlashSale, GLOBAL_CONSTANTS.Size)
            //-- Discount Grid:
            global_service.LoadHomeProductGrid($('#product-discount .scroll-product'), GLOBAL_CONSTANTS.GroupProduct.Discount, GLOBAL_CONSTANTS.GridSize)
            //-- Bear Grid:
            global_service.LoadHomeProductGrid($('#bear-collection .scroll-product'), GLOBAL_CONSTANTS.GroupProduct.BEAR_COLLECTION, GLOBAL_CONSTANTS.GridSize)
            //-- Intelligence Grid:
            global_service.LoadHomeProductGrid($('#intelligence-collection .scroll-product'), GLOBAL_CONSTANTS.GroupProduct.INTELLECTUAL_DEVELOPMENT, GLOBAL_CONSTANTS.GridSize)
        }
        $('.xemthem').hide()
    },
    ProductSaleList: function () {
    },
    //LoadHomeProductSlide: function (element, group_id, size) {
    //    element.addClass('placeholder')
    //    element.addClass('box-placeholder')
    //    element.css('width','100%')
    //    element.css('height','255px')
    //    var request = {
    //        "group_id": group_id,
    //        "page_index": 1,
    //        "page_size": size
    //    }
    //    $.when(
    //        global_service.POST(API_URL.ProductList, request)
    //    ).done(function (result) {
          
    //        var html = ''
    //        if (result.is_success) {

    //            $(result.data).each(function (index, item) {
    //                var img_src = item.avatar
    //                if (!img_src.includes(API_URL.StaticDomain)
    //                    && !img_src.includes("data:image")
    //                    && !img_src.includes("http"))
    //                    img_src = API_URL.StaticDomain + item.avatar
    //                html += HTML_CONSTANTS.Home.SlideProductItem
    //                    .replaceAll('{url}', '/san-pham/' + global_service.RemoveUnicode(item.name).replaceAll(' ', '-') + '--' + item._id)
    //                    .replaceAll('{avt}', img_src)
    //                    .replaceAll('{name}', item.name)
    //                    .replaceAll('{amount}', item.amount > 0 ? global_service.Comma(item.amount) + ' đ' : 'Giá liên hệ')
    //                    //.replaceAll('{review_point}', (item.rating == null || item.rating == undefined || item.rating <= 0) ? '5' : item.rating)
    //                    .replaceAll('{review_point}', '5')
    //                    .replaceAll('{review_count}', '')
    //                    .replaceAll('{old_price_style}', '')
    //                    .replaceAll('{price}', (item.amount == null || item.amount == undefined || item.amount <= 0) ? global_service.Comma(item.amount) + ' đ' : '')
    //            });
    //        }
    //        element.html(html)
    //        element.removeClass('placeholder')
    //        element.removeClass('box-placeholder')
    //        element.css('height', 'auto')
    //    })
    //},
    LoadHomeProductGrid: function (element, group_id, size) {
        element.addClass('placeholder')
        element.addClass('box-placeholder')
        element.css('width', '100%')
        element.css('height', '255px')
        var request = {
            "group_id": group_id,
            "page_index": 1,
            "page_size": size
        }
        $.when(
            global_service.POST(API_URL.ProductList, request)
        ).done(function (result) {
          
            var html = ''
            if (result.is_success) {

                $(result.data).each(function (index, item) {
                    var amount_html = 'Giá liên hệ'
                    if (item.amount_max != undefined
                        && item.amount_max != null
                        && item.amount_min != undefined
                        && item.amount_min != null) {
                        amount_html = global_service.Comma(item.amount_min) + ' - '+global_service.Comma(item.amount_max)
                    }
                    else if (item.amount != undefined
                        && item.amount != null && item.amount>0) {
                        amount_html = global_service.Comma(item.amount) 

                        }
                    html += HTML_CONSTANTS.Home.GridProductItem
                        .replaceAll('{url}', '/san-pham/' + global_service.RemoveUnicode(global_service.RemoveSpecialCharacters( item.product_name)).replaceAll(' ', '-') + '--' + item.id)
                        .replaceAll('{avt}', global_service.CorrectImage(item.image_thumb))
                        .replaceAll('{name}', item.product_name)
                        .replaceAll('{amount}',  amount_html )
                        .replaceAll('{review_point}', (item.rating == null || item.rating == undefined || item.rating <= 0) ? '5' : item.rating)
                        .replaceAll('{review_count}', (item.reviews_count == null || item.reviews_count == undefined || item.reviews_count <= 0) ? '(1)' : '(' + item.reviews_count + ')')
                        .replaceAll('{old_price_style}', (item.price_vnd == null || item.price_vnd == undefined || item.price_vnd <= 0) ? '' : '')
                        .replaceAll('{price}', (item.price_vnd == null || item.price_vnd == undefined || item.price_vnd <= 0) ? global_service.Comma(item.amount_vnd) + ' đ' : '')
                });
            }
            element.html(html)
            element.removeClass('placeholder')
            element.removeClass('box-placeholder')
            element.css('height', 'auto')

        })
    }

}