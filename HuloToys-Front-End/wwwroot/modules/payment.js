$(document).ready(function () {
    payment.Initialization()
})
var payment = {
    Initialization: function () {
        payment.DynamicBind()
        payment.Detail()
       
    },
    DynamicBind: function () {
        $("body").on('click', ".box-payment-info .btn", function () {
            $('.box-payment-info').hide()
            $('.box-payment-sucess').show()

        });
    },
    Detail: function () {
        var usr = global_service.CheckLogin()
        if (usr) {
            var request = {
                "id": $('.section-payment').attr('data-id')
            }
            $.when(
                global_service.POST(API_URL.OrderDetail, request)
            ).done(function (result) {
                if (result.is_success && result.data) {
                    payment.RenderBankTransfer(result.data)
                }
                else {
                    $('.box-payment-info').hide()
                    $('.box-payment-failed').show()
                }
            })

        } else {
            window.location.href='/home/error'
        }


    },
    RenderBankTransfer: function (order_detail) {
        switch (order_detail.payment_type) {
            case 2:
            case 3: {
                $('.box-payment-info').show()
                $('.box-payment-failed').hide()
                $('.box-payment-sucess').hide()
                $('.order-no').html(order_detail.order_no)
                var payment_type = GLOBAL_CONSTANTS.PaymentType.filter(obj => {
                    return obj.id === order_detail.payment_type
                })
                $('.payment-type').html(payment_type[0].name)
                $('.box-payment-info .flex-tr-transfer-description b').html(order_detail.order_no + ' thanh toan')
                $('.box-payment-info .flex-tr-amount b').html(global_service.Comma(order_detail.total_amount) + ' thanh toan')
                $('.box-payment-info').removeClass('placeholder')
                var request = {
                    "id": order_detail._id
                }
                $.when(
                    global_service.POST(API_URL.QRCode, request)
                ).done(function (result) {
                    if (result.is_success && result.data) {
                        debugger
                        $('.box-payment-info .img-qr img').attr('src', result.data)
                    }
                })
            } break
            case 1:
            case 4: {
                $('.box-payment-sucess').show()
                $('.box-payment-info').remove()
                $('.box-payment-failed').remove()
            } break;
        }

        $('.box-payment-info').removeClass('placeholder')
    }
}