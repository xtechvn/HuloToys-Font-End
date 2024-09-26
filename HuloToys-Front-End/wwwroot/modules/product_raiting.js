$(document).ready(function () {

    product_raiting.Initialization()
})
var product_raiting = {
    Initialization: function () {
        
        product_raiting.Detail()
        product_raiting.DynamicBind()
    },
    DynamicBind: function () {
        $("body").on('click', ".overview__filter", function () {
            var element = $(this)
            $('.overview__filter').removeClass('active')
            element.addClass('active')
        });
    },
    Detail: function () {
        product_raiting.RaitingCount()
        product_raiting.ListingComment()
        product_raiting.Paging(1)
    },
    DetailPaging: function (page) {
        product_raiting.Paging(page)
        product_raiting.ListingComment(page)
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#container-comment").offset().top
        }, 500);
    },
    ListingComment: function (page) {
        var request = {
            "id": $('.section-details-product').attr('data-code'),
            "page_index": page,
            "page_size": GLOBAL_CONSTANTS.RaitingPageSize
        }
        $.when(
            global_service.POST(API_URL.ProductReviewComment, request)
        ).done(function (result) {
            if (result != undefined) {
                $('#container-comment .product-ratings__list .product-comment-list').html(result)
            }
        })
    },
    Paging: function (page) {

        var request = {
            "function_name": 'product_raiting.DetailPaging',
            "page": page,
            "max_page": product_raiting.GetMaxPage()
        }
        $.when(
            global_service.POST(API_URL.ProductRaitingPaging, request)
        ).done(function (result) {
            if (result != undefined) {
                $('#container-comment .wrap-paging').html(result)
            }
        })
    },
    RaitingCount: function (page) {
        var request = {
            "id": $('.section-details-product').attr('data-code')
        }
        $.when(
            global_service.POST(API_URL.ProductRaitingCount, request)
        ).done(function (result) {
            if (result != undefined && result.is_success == true) {
                $.each(result.data.comment_count_by_star, function (key, value) {
                    $('#overview_filter_' + key + ' .count').html(global_service.Comma(value))

                });
                $('#overview_filter_all .count').html(global_service.Comma(result.data.total_count))
                $('#overview_filter_hascomment .count').html(global_service.Comma(result.data.has_comment_count))
                $('#overview_filter_hasmedia .count').html(global_service.Comma(result.data.has_media_count))
                sessionStorage.setItem(STORAGE_NAME.ProductCommentCount, JSON.stringify(result.data))
                
            }
        })
    },
    GetMaxPage: function () {
        var value = ''
        var max_page=1
        $('.overview__filter').each( function (index, value) {
            var element = $(this)
            if (element.hasClass('active')) {
                value = element.attr('data-value')
                return false
            }
        });
        if (value == '') value='all'
        var page_count = sessionStorage.getItem(STORAGE_NAME.ProductCommentCount)
        if (page_count != undefined && value.trim()!='') {
            var page_object = JSON.parse(page_count)
            switch (value) {
                case '5': {
                    max_page = page_object.comment_count_by_star[5] / GLOBAL_CONSTANTS.RaitingPageSize
                } break
                case '4': {
                    max_page = page_object.comment_count_by_star[4] / GLOBAL_CONSTANTS.RaitingPageSize

                } break
                case '3': {
                    max_page =page_object.comment_count_by_star[3] / GLOBAL_CONSTANTS.RaitingPageSize

                } break
                case '2': {
                    max_page = page_object.comment_count_by_star[2] / GLOBAL_CONSTANTS.RaitingPageSize

                } break
                case '1': {
                    max_page =page_object.comment_count_by_star[1] / GLOBAL_CONSTANTS.RaitingPageSize

                } break
                case 'all': {
                    max_page = page_object.total_count / GLOBAL_CONSTANTS.RaitingPageSize

                } break
                case 'comment': {
                    max_page = page_object.has_comment_count / GLOBAL_CONSTANTS.RaitingPageSize

                } break
                case 'media': {
                    max_page = page_object.has_media_count / GLOBAL_CONSTANTS.RaitingPageSize

                } break
            }
        }
        if (max_page < 1) max_page = 1
        if (max_page > (parseInt(max_page))) max_page = parseInt(max_page) +1
        return max_page
    }
}