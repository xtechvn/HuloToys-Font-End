$(document).ready(function () {

    product_raiting.Initialization()
})
var product_raiting = {
    Initialization: function () {
        
        product_raiting.DynamicBind()
    },
    DynamicBind: function () {
       
    },
    Detail: function () {

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

            if (result.is_success && result.data && result.data.product_main) {
                sessionStorage.setItem(STORAGE_NAME.ProductDetail, JSON.stringify(result.data))
                sessionStorage.setItem(STORAGE_NAME.SubProduct, JSON.stringify(result.data.product_sub))
                product_detail.RenderDetail(result.data.product_main, result.data.product_sub)
            }
            else {
                window.location.href = '/Home/NotFound'
            }
        })
    },
    RenderPagingSection: function (page) {

    }
}