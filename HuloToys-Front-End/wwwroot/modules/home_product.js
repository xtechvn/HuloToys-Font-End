$(document).ready(function () {
    home_product.Initialization()
})
var home_product = {
    Initialization: function () {
        if ($('.list-product-sale .swiper-wrapper').length > 0) {
            //--Product Sale Slide:
            home_product.LoadHomeProductSlide($('.list-product-sale .swiper-wrapper'), GLOBAL_CONSTANTS.GroupProduct.FlashSale, GLOBAL_CONSTANTS.Size)
            //-- Discount Grid:
            home_product.LoadHomeProductGrid($('#product-discount .scroll-product'), GLOBAL_CONSTANTS.GroupProduct.Discount, GLOBAL_CONSTANTS.GridSize)
            //-- Bear Grid:
            home_product.LoadHomeProductGrid($('#bear-collection .scroll-product'), GLOBAL_CONSTANTS.GroupProduct.BEAR_COLLECTION, GLOBAL_CONSTANTS.GridSize)
            //-- Intelligence Grid:
            home_product.LoadHomeProductGrid($('#intelligence-collection .scroll-product'), GLOBAL_CONSTANTS.GroupProduct.INTELLECTUAL_DEVELOPMENT, GLOBAL_CONSTANTS.GridSize)
        }
       
    },
    ProductSaleList: function () {
    },
    LoadHomeProductSlide: function (element, group_id, size) {
        element.addClass('placeholder')
        element.addClass('box-placeholder')
        element.css('width','100%')
        element.css('height','255px')
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
                    html += HTML_CONSTANTS.Home.SlideProductItem
                        .replaceAll('{url}', '/san-pham/' + global_service.RemoveUnicode(item.product_name).replaceAll(' ', '-') + '--' + item.id)
                        .replaceAll('{avt}', item.image_thumb)
                        .replaceAll('{name}', item.product_name)
                        .replaceAll('{amount}', item.amount_vnd > 0 ? global_service.Comma(item.amount_vnd) + ' đ' : 'Giá liên hệ')
                        .replaceAll('{review_point}', (item.rating == null || item.rating == undefined || item.rating <= 0) ? '5' : item.rating)
                        .replaceAll('{review_count}', (item.reviews_count == null || item.reviews_count == undefined || item.reviews_count <= 0) ? '(1)' :'(' +item.reviews_count+')')
                        .replaceAll('{old_price_style}', (item.price_vnd == null || item.price_vnd == undefined || item.price_vnd <= 0) ? '' : '')
                        .replaceAll('{price}', (item.price_vnd == null || item.price_vnd == undefined || item.price_vnd <= 0) ? global_service.Comma(item.amount_vnd) + ' đ' : '')
                });
            }
            element.html(html)
            element.removeClass('placeholder')
            element.removeClass('box-placeholder')
            element.css('height', 'auto')
        })
    },
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
                    html += HTML_CONSTANTS.Home.GridProductItem
                        .replaceAll('{url}', '/san-pham/' + global_service.RemoveUnicode(item.product_name).replaceAll(' ','-')+'--' + item.id)
                        .replaceAll('{avt}', item.image_thumb)
                        .replaceAll('{name}', item.product_name)
                        .replaceAll('{amount}', item.amount_vnd > 0 ? global_service.Comma(item.amount_vnd) + ' đ' : 'Giá liên hệ')
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