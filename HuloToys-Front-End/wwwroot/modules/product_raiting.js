$(document).ready(function () {

    product_raiting.Initialization()
})
var product_raiting = {
    Initialization: function () {
        sessionStorage.removeItem(STORAGE_NAME.ProductCommentCount)

        product_raiting.Detail()
        product_raiting.DynamicBind()
    },
    DynamicBind: function () {
        $("body").on('click', ".overview__filter", function () {
            var element = $(this)
            $('.overview__filter').removeClass('active')
            element.addClass('active')
            product_raiting.ListingComment()
            product_raiting.Paging(1)
        });
    },
    Detail: function () {
        product_raiting.RaitingCount()
        product_raiting.ListingComment()
    },
    DetailPaging: function (page) {
        product_raiting.Paging(page)
        product_raiting.ListingComment(page)
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#container-comment").offset().top
        }, 500);
    },
    ListingComment: function (page) {
        $("#container-comment .product-ratings__list").addClass('placeholder')
        $("#container-comment .product-ratings__list").addClass('box-placeholder')
        var request = product_raiting.GetFilter(page)
        $.when(
            global_service.POST(API_URL.ProductReviewComment, request)
        ).done(function (result) {
            if (result != undefined) {
                $('#container-comment .product-ratings__list .product-comment-list').html(result)
            }
            $("#container-comment .product-ratings__list").removeClass('placeholder')
            $("#container-comment .product-ratings__list").removeClass('box-placeholder')
            $('.img-product').lightGallery({
                speed: 500,
                plugins: [lgVideo],
            });

        })
    },
    Paging: function (page) {
        if (page > 0) {
            var request = {
                "function_name": 'product_raiting.DetailPaging',
                "page": page,
                "max_page": product_raiting.GetMaxPage(),
                "total_count": product_raiting.GetTotalCount()
            }
            $.when(
                global_service.POST(API_URL.ProductRaitingPaging, request)
            ).done(function (result) {
                if (result != undefined) {
                    $('#container-comment .wrap-paging').html(result)
                }
            })
        }

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
                product_raiting.RaitingAvarage(result)
                product_raiting.Paging(1)

            }
        })
    },
    GetMaxPage: function () {
        var max_page = 1
        var value = product_raiting.GetRaitingFilterValue()
        var page_count = sessionStorage.getItem(STORAGE_NAME.ProductCommentCount)
        if (page_count != undefined && value.trim() != '') {
            var page_object = JSON.parse(page_count)
            switch (value) {
                case '5': {
                    max_page = page_object.comment_count_by_star[5] / GLOBAL_CONSTANTS.RaitingPageSize
                } break
                case '4': {
                    max_page = page_object.comment_count_by_star[4] / GLOBAL_CONSTANTS.RaitingPageSize

                } break
                case '3': {
                    max_page = page_object.comment_count_by_star[3] / GLOBAL_CONSTANTS.RaitingPageSize

                } break
                case '2': {
                    max_page = page_object.comment_count_by_star[2] / GLOBAL_CONSTANTS.RaitingPageSize

                } break
                case '1': {
                    max_page = page_object.comment_count_by_star[1] / GLOBAL_CONSTANTS.RaitingPageSize

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
        if (max_page > (parseInt(max_page))) max_page = parseInt(max_page) + 1
        return max_page
    },
    GetTotalCount: function () {

        var total_count = 0
        var value = product_raiting.GetRaitingFilterValue()

        if (value == undefined || value == '') value = 'all'
        var page_count = sessionStorage.getItem(STORAGE_NAME.ProductCommentCount)
        if (page_count != undefined && value.trim() != '') {
            var page_object = JSON.parse(page_count)
            switch (value) {
                case '5': {
                    total_count = page_object.comment_count_by_star[5]
                } break
                case '4': {
                    total_count = page_object.comment_count_by_star[4]

                } break
                case '3': {
                    total_count = page_object.comment_count_by_star[3]

                } break
                case '2': {
                    total_count = page_object.comment_count_by_star[2]

                } break
                case '1': {
                    total_count = page_object.comment_count_by_star[1]

                } break
                case 'all': {
                    total_count = page_object.total_count

                } break
                case 'comment': {
                    total_count = page_object.has_comment_count

                } break
                case 'media': {
                    total_count = page_object.has_media_count

                } break
            }
        }
        if (total_count < 0) total_count = 0

        return total_count
    },
    RaitingAvarage: function (result) {
        var total_star = 0
        var count = 0
        $.each(result.data.comment_count_by_star, function (key, value) {
            $('#overview_filter_' + key + ' .count').html(global_service.Comma(value))
            count += value
            total_star += (key * value)

        });
        var avarage = parseFloat(total_star / count).toFixed(1)
        $('#container-comment .overview__rating-score').html(global_service.Comma(parseFloat(total_star / count).toFixed(1)))
        var avarage_value = parseInt(total_star / count)
        $('#container-comment .rating-stars__stars i').each(function (index, item) {
            var element = $(this)
            if (index > avarage_value) {
                element.hide()
            }

        });
    },
    GetFilter: function (page) {
        var request = {
            "id": $('.section-details-product').attr('data-code'),
            "page_index": page,
            "page_size": GLOBAL_CONSTANTS.RaitingPageSize
        }
        var filter_value = product_raiting.GetRaitingFilterValue()
        if (filter_value != undefined) {
            switch (filter_value) {
                case '5':
                case '4':
                case '3':
                case '2':
                case '1': {
                    request.stars = filter_value
                } break
                case 'all': {


                } break
                case 'comment': {
                    request.has_comment = true

                } break
                case 'media': {
                    request.has_media = true

                } break
            }
        }
        return request
    },
    GetRaitingFilterValue: function () {
        var selected_element = undefined

        $('#container-comment .overview__filter').each(function (index, item) {
            var element = $(this)
            if (element.hasClass('active')) {
                selected_element = element
                return false
            }
        });
        return selected_element.attr('data-value')
    }
}