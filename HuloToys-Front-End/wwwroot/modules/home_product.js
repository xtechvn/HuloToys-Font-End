$(document).ready(function () {
    home_product.Initialization()
})
var home_product = {
    Initialization: function () {
        home_product.ProductSaleList()
    },
    ProductSaleList: function () {
        var request = {
            "group_id": GLOBAL_CONSTANTS.GroupProduct.FlashSale,
            "page_index": 1,
            "page_size": GLOBAL_CONSTANTS.Size
        }
        $.when(
            global_service.POST(API_URL.ProductList, request)
        ).done(function (res) {
            if (res.is_success) {
                $('.list-product-sale .swiper-wrapper').addClass('placeholder')
                $('.list-product-sale .swiper-wrapper').addClass('box-placeholder')


            } else {

            }


        })
    }
}