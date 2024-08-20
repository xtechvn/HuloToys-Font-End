$(document).ready(function () {
    product_detail.Initialization()
})
var product_detail = {
    Initialization: function () {
        product_detail.ShowLoading()
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
        });
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
            if (result.is_success && result.data) {
               product_detail. RenderDetail(result.data)
              
            }
          
        })
    },
    RenderDetail: function (product) {
        var html = ''

        html += product_detail_constants.HTML.Images
            .replaceAll('{src}', product.avatar)

        $(product.images).each(function (index, item) {
            html += product_detail_constants.HTML.Images
                .replaceAll('{src}', item)

        });
        $('.section-details-product .gallery-product .swiper-wrapper').html(html)

        $('.section-details-product .name-product').html(product.name)
        if (product.product_sold_count == undefined || product.product_sold_count <= 0) {
            $('.section-details-product .total-sold').hide()
        } else {
            $('.section-details-product .total-sold').html(global_service.Comma(product.product_sold_count) + ' Đã bán')
        }
        if (product.reviews_count == undefined || product.reviews_count <= 0) {
            $('.section-details-product .total-sold').hide()
        } else {
            $('.section-details-product .total-review').html( global_service.Comma(product.reviews_count) + ' Đánh giá')
        }
      

        html = ''
        for (var i = 0; i < (product.star <= 0 ? 5 : product.star); i++) {
            html += product_detail_constants.HTML.Star
        }
        html += '' + (product.star <= 0 ? 5 : product.star)
        $('.box-review .review').html(html)

        if (product.variations != undefined && product.variations.length > 0) {
            const max_obj = product.variations.reduce(function (prev, current) {
                return (prev && prev.amount > current.amount) ? prev : current
            })
            const min_obj = product.variations.reduce(function (prev, current) {
                return (prev && prev.amount < current.amount) ? prev : current
            })
            if (max_obj.amount <= min_obj.amount)
                $('.section-details-product .price').html(global_service.Comma(min_obj.amount))
            else
                $('.section-details-product .price').html(global_service.Comma(min_obj.amount) + ' - ' + global_service.Comma(max_obj.amount))
        }
        else {
            $('.section-details-product .price').html(global_service.Comma(product.amount))

        }
        if (product.discount > 0) {
            $('#price-old').html(global_service.Comma(product.amount + product.discount))
        } else {
            $('#price-old').hide()
        }
        var total_stock = product.quanity_of_stock

        html = ''
        //html += product_detail_constants.HTML.Tr_Voucher.replaceAll('{span}', '')
        //html += product_detail_constants.HTML.Tr_Combo.replaceAll('{span}', '')
        html += product_detail_constants.HTML.Tr_Shipping
        //html += product_detail_constants.HTML.Tr_Combo.replaceAll('{span}', '')
        if (product.variations != undefined && product.variations.length > 0) {
            $(product.attributes).each(function (index, attribute) {
                var attr_detail =  product.attributes_detail.filter(obj => {
                    return obj.attribute_id === attribute._id
                })
                var html_item=''
                if (attr_detail != undefined && attr_detail.length > 0) {
                    $(attr_detail).each(function (index_detail, attribute_detail) {
                        html_item += product_detail_constants.HTML.Tr_Attributes_Td_li
                            .replaceAll('{active}', '')
                            .replaceAll('{src}', attribute_detail.img != undefined && attribute_detail.img.trim() != '' ? '<img src="' + attribute_detail.img +'" />':'')
                            .replaceAll('{name}', attribute_detail.name)
                    })
                }
                html += product_detail_constants.HTML.Tr_Attributes
                    .replaceAll('{level}', attribute._id)
                    .replaceAll('{name}', attribute.name)
                    .replaceAll('{li}', html_item)
            });
            total_stock = product.variations.reduce((n, { amount }) => n + amount, 0)
        }
        html += product_detail_constants.HTML.Tr_Quanity.replaceAll('{stock}', global_service.Comma(total_stock))
        
        $('.box-info-details tbody').html(html)
        $('#description').html(product.description)

        //--hide voucher (implement later):
        $('#voucher').hide()
        //$('#combo-discount').hide()
        $('#combo-discount .list-product .item-product').each(function (index, item) {
            var element = $(this)
            if (index < 5) return true
            else element.hide()
        })

        product_detail.RemoveLoading()
    },
    ShowLoading: function () {
        $('.section-details-product').addClass('placeholder')
        $('.section-description-product').addClass('placeholder')
        $('.section-category').addClass('placeholder')
    },
    RemoveLoading: function () {
        $('.section-details-product').removeClass('placeholder')
        $('.section-description-product').removeClass('placeholder')
        $('.section-category').removeClass('placeholder')
    }
}
var product_detail_constants = {
    HTML: {
        Images:`<div class="swiper-slide">
                                <img src="{src}" alt="" />
                            </div>`,
        Star:`<i class="icon icon-star"></i>`,
        Tr_Voucher:` <tr>
                                 <td>Mã giảm giá</td>
                                <td>
                                   {span}
                                </td> 
                            </tr>`,
        Tr_Voucher_Td_span:`<span class="coupon" data-id="{id}">{name}</span>`,
        Tr_Combo:` <tr>
                                <td>Combo khuyến mại</td>
                                <td> {span} </td>
                            </tr>`,
        Tr_Combo_Td_span: ` <span class="combo" data-id="{id}">{name}</span>`,

        Tr_Shipping:` <tr>
                                <td>Vận chuyển</td>
                                <td>Miễn phí vận chuyển</td>
                            </tr>`,
        Tr_Attributes:`<tr class="attributes" data-level="{level}">
                                <td>{name}</td>
                                <td>
                                    <ul class="box-tag">
                                       {li}

                                    </ul>
                                </td>
                            </tr>`,
        Tr_Attributes_Td_li: `<li class="attribute-detail {active}">{src} {name}</li>`,
        Tr_Quanity:`<tr>
                                <td>Số lượng:</td>
                                <td>
                                    <div class="number-input">
                                        <button onclick="this.parentNode.querySelector('input[type=number]').stepDown()"></button>
                                        <input class="quantity" min="0" name="quantity" value="1" type="number">
                                        <button onclick="this.parentNode.querySelector('input[type=number]').stepUp()" class="plus"></button>
                                    </div>

                                    <span class="soluong">{stock} sản phẩm có sẵn</span>
                                </td>
                            </tr>`

    }
}