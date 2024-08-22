$(document).ready(function () {
    cart.Initialization()
})
var cart = {
    Initialization: function () {
        cart.DynamicBind()
        cart.CartItem()
    },
    DynamicBind: function () {
        $("body").on('click', ".section-cart .table-addtocart .remove-product", function () {
            var element=$(this)
            cart.RemoveCartItem(element)
        });
        $("body").on('click', ".box-checkbox-label", function () {
            var element = $(this)
            element.closest('.box-checkbox').find('input').click()
        });
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
                if (result.is_success && result.data) {
                    cart.RenderCartItem(result.data)
                }
                else {
                    $('.section-cart .container').html(HTML_CONSTANTS.Cart.Empty)

                }
            })

        }
     

    },
    RenderCartItem: function (list) {
        var html = ''
        //-- Table Product
        $(list).each(function (index, item) {
            var html_item = HTML_CONSTANTS.Cart.Product
                .replaceAll('{id}',item._id)
                .replaceAll('{amount}', item.product.amount)
                .replaceAll('{name}', item.product.name)
                .replaceAll('{attribute}', item.product.name)
                .replaceAll('{amount_display}', global_service.Comma(item.product.amount))
                .replaceAll('{quanity}', global_service.Comma(item.quanity))
                .replaceAll('{total_amount}', global_service.Comma(item.total_amount))
            var variation_value=''
            $(item.variation_detail).each(function (index_var, variation_item) {
                var attribute = item.attributes.filter(obj => {
                    return obj._id === variation_item._id
                })
                var attribute_detail = item.attributes_detail.filter(obj => {
                    return (obj.name === variation_item.name && obj.name === variation_item.name)
                })
                variation_value += attribute[0].name + ': ' + attribute_detail[0].name
            })
            html_item = html_item
                .replaceAll('{attribute}', variation_value)
            html += html_item
        });
        $('.section-cart .table-addtocart').html(html)
        //-- Remove placeholder:
        $('.section-cart').removeClass('placeholder')
    },
    RemoveCartItem: function (element) {

    }
}