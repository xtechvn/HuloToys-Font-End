$(document).ready(function () {
    order_detail.Initialization()
})
var order_detail = {
    Data: {
        Index: 1,
        Size:10
    },
    Initialization: function () {
        $('.content-left-user').addClass('placeholder')
        $('.content-left-user .list-tab-menu .my-order-detail').addClass('active')
        $('.content-left-user .list-tab-menu .my-order-detail').addClass('active')

        order_detail.DynamicBind()
        order_detail.Detail()

        
       
    },
    DynamicBind: function () {
       
    },
    OrderAddress: function () {
        var request = {

        }
        $.when(
            global_service.POST(API_URL.AddressPopup, request)
        ).done(function (result) {
            $('body').append(result)
            address_client.Initialization()
            address_client.DynamicConfirmAddress(function (data) {
                order_detail.ConfirmOrderAddress(data)
            })
        })
    },
    Detail: function () {
        var request = {
            "id": $('#order-detail').val()
        }
        $.when(
            global_service.POST(API_URL.OrderHistoryDetail, request)
        ).done(function (result) {
            if (result.is_success && result.data) {
                order_detail.RenderDetail(result.data)
            }
            else {
                $('.box-payment-info').hide()
                $('.box-payment-failed').show()
            }
        })
    },
    RenderDetail: function (result) {
        var order = result.data
        var order_detail_object = result.data_order
       //--default + global value:
        $('#process-step-refund').hide()
        $('#process-step-order').show()

        $('.btn-buy-again').hide()
        $('.btn-review').hide()
        $('#order-no').html(order.orderno)
        var status_name = GLOBAL_CONSTANTS.OrderStatus.filter(obj => {
            return obj.id == order.orderstatus
        })
        $('.status-name').html(status_name[0].name)
        $('.created-time').html(global_service.DateTimeDotNetToString(order.createddate, true))
        $('.amount-before-discount').html(global_service.Comma(order.amount + order.discount))
        $('.delivery-fee').html('')
        $('.discount-fee').html(global_service.Comma(order.discount))
        $('.total-amount').html(global_service.Comma(order.amount))
        //--switch
        switch (order.status) {
            case 0: {
                $('.progress-confirmed').addClass('active')
                $('.progress-payment').removeClass('active')
                $('.progress-delivering').removeClass('active')
                $('.progress-received').removeClass('active')
                $('.progress-start-refund').removeClass('active')
                $('.progress-refunded').removeClass('active')
            } break
            case 1: {
                $('.progress-confirmed').removeClass('active')
                $('.progress-payment').addClass('active')
                $('.progress-delivering').removeClass('active')
                $('.progress-received').removeClass('active')
                $('.progress-start-refund').removeClass('active')
                $('.progress-refunded').removeClass('active')
            } break
            case 2: {
                $('.progress-confirmed').removeClass('active')
                $('.progress-payment').removeClass('active')
                $('.progress-delivering').addClass('active')
                $('.progress-received').removeClass('active')
                $('.progress-start-refund').removeClass('active')
                $('.progress-refunded').removeClass('active')

                $('.box-info-address .update-add').addClass('button-disabled')

            } break
            case 3: {
                $('.progress-confirmed').removeClass('active')
                $('.progress-payment').removeClass('active')
                $('.progress-delivering').removeClass('active')
                $('.progress-received').addClass('active')
                $('.progress-start-refund').removeClass('active')
                $('.progress-refunded').removeClass('active')

                $('.box-info-address .update-add').addClass('button-disabled')

                $('.btn-buy-again').show()
                $('.btn-review').show()
            } break
            case 4: {
                $('.progress-confirmed').removeClass('active')
                $('.progress-payment').removeClass('active')
                $('.progress-delivering').removeClass('active')
                $('.progress-received').removeClass('active')
                $('.progress-start-refund').removeClass('active')
                $('.progress-refunded').removeClass('active')
                $('.box-info-address .update-add').addClass('button-disabled')
                $('#process-step-refund').show()
                $('#process-step-order').hide()

                switch (order.paymentstatus) {
                    case 2: {
                        $('.progress-start-refund').addClass('active')

                    }
                    case 3: {
                        $('.progress-start-refund').addClass('active')
                        $('.progress-refunded').addClass('active')
                    }
                }
            } break
        }
        order_detail.RenderOrderProduct(order_detail_object)
        $('.date-time').hide()
        $('.progress-confirmed').find('.date-time').html(global_service.DateTimeDotNetToString(order.createddate, true))
        $('.progress-confirmed').find('.date-time').show()

        $('.content-left-user').removeClass('placeholder')
        order_detail.OrderAddress()

    },
    RenderOrderProduct: function ( order_detail_object) {
        var html_products = ''
        $(order_detail_object.carts).each(function (index_cart, cart_item) {
            html_products += HTML_CONSTANTS.OrderHistory.ItemProduct
                .replaceAll('{src}', cart_item.product.avatar)
                .replaceAll('{name}', cart_item.product.name)
                .replaceAll('{attributes}', order_detail.RenderVariationDetail(cart_item))
                .replaceAll('{price}', global_service.Comma(cart_item.product.amount) + ' đ')
                .replaceAll('{quanity}', global_service.Comma(cart_item.quanity))
                .replaceAll('{amount}', global_service.Comma(cart_item.total_amount) + ' đ')
        });
        $('.list-product-order').html(html_products)
    },
    RenderVariationDetail: function (item) {
        var variation_value = ''
        $(item.product.variation_detail).each(function (index_var, variation_item) {
            var attribute = item.product.attributes.filter(obj => {
                return obj._id === variation_item.id
            })
            var attribute_detail = item.product.attributes_detail.filter(obj => {
                return (obj.name === variation_item.name && obj.name === variation_item.name)
            })
            variation_value += attribute[0].name + ':' + attribute_detail[0].name
            if (index_var < ($(item.product.variation_detail).length - 1)) {
                variation_value += ', '
            }
        })
        return variation_value
    },
    ConfirmOrderAddress: function (data) {
        debugger
    },
}