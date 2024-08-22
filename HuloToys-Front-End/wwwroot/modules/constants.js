var STORAGE_NAME = {
    Login: 'account',
    ProductDetail: 'ProductDetail',
    CartCount: 'CartCount',
    BuyNowItem: 'BuyNowItem',
    SubProduct: 'SubProduct'

}
var API_URL = {
    Login:'/Client/Login',
    Register:'/Client/Register',
    ProductDetail:'/Product/ProductDetail',
    ProductList:'/Product/GetList',
    AddToCart: '/Cart/AddToCart',
    CartCount: '/Cart/CartCount',
    CartList: '/Cart/GetList',
    StaticDomain:'https://static-image.adavigo.com'
}
var NOTIFICATION_MESSAGE = {
    LoginIncorrect:'Tài khoản / Mật khẩu không chính xác, vui lòng thử lại',
    RegisterIncorrect:'Thông tin đăng ký không chính xác, vui lòng thử lại hoặc liên hệ bộ phận chăm sóc',
    EmailInCorrect:'Vui lòng nhập đúng địa chỉ Email',
    PhoneNotCorrect:'Vui lòng nhập đúng số điện thoại',
    PasswordTooShort:'Vui lòng nhập mật khẩu trên {count} ký tự',
    PasswordConfirmNotEqual:'Xác nhận mật khẩu và mật khẩu không khớp',
    EmptyField:'Vui lòng không để trống'
}
var THIRDPARTY_CONSTANTS = {
    Facebook: {
        AppId: '406702408540759',
        Version:'v20.0'
    },
    GSI: {
        ClientID:'65575993345-u9qk911fs77lls8tgmn2c3gjk04lg78c.apps.googleusercontent.com'
    }
}
var GLOBAL_CONSTANTS = {
    Size: 6,
    GridSize: 12,
    GroupProduct: {
        FlashSale: 15,
        Discount: 16,
        BEAR_COLLECTION: 17,
        INTELLECTUAL_DEVELOPMENT:18
    }
}
var HTML_CONSTANTS = {
    GoogleAccountNotRegistered : '<span class="err err-gg-account" style=" width: 100%; text-align: -webkit-center; ">Tài khoản Google chưa được đăng ký, vui lòng điền đầy đủ thông tin và nhấn tạo tài khoản</span>',
    Home: {
        SlideProductItem:` <div class="swiper-slide">
                            <div class="item-product">
                                <a href="{url}">
                                    <div class="box-thumb">
                                        <div class="thumb-product">
                                            <img src="{avt}" alt="" />
                                        </div>
                                    </div>
                                    <div class="box-info">
                                        <h3 class="name-product">{name}</h3>
                                        <div class="flex-price">
                                            <div class="price-sale">{amount}</div>
                                            <div class="review">{review_point}<i class="icon icon-star"></i><span class="total-review">{review_count}</span></div>
                                        </div>
                                        <div class="price-old" style="{old_price_style}">
                                            So với giá cũ {price} <i class="icon icon-info"></i>
                                            <div class="info-detail">
                                                Giá sản phẩm <b>rẻ nhất</b> của đơn vị khác
                                                được Hulo Toys nghiên cứu trên <b>mọi nền tảng</b>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>`,
        GridProductItem:`<div class="item-product">
                        <a href="">
                            <div class="box-thumb">
                                <div class="thumb-product">
                                    <img src="{avt}" alt="" />
                                </div>
                            </div>
                            <div class="box-info">
                                <h3 class="name-product">{name}</h3>
                                <div class="flex-price">
                                    <div class="price-sale">{amount}</div>
                                    <div class="review">{review_point}<i class="icon icon-star"></i><span class="total-review">{review_count}</span></div>
                                </div>
                                <div class="price-old" style="{old_price_style}">
                                    So với giá cũ {price} <i class="icon icon-info"></i>
                                    <div class="info-detail">
                                        Giá sản phẩm <b>rẻ nhất</b> của đơn vị khác
                                        được Hulo Toys nghiên cứu trên <b>mọi nền tảng</b>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>`
    },
    Detail: {
        Images: `<div class="swiper-slide">
                                <img src="{src}" alt="" />
                            </div>`,
        Star: `<i class="icon icon-star"></i>`,
        Tr_Voucher: ` <tr>
                                 <td>Mã giảm giá</td>
                                <td>
                                   {span}
                                </td> 
                            </tr>`,
        Tr_Voucher_Td_span: `<span class="coupon" data-id="{id}">{name}</span>`,
        Tr_Combo: ` <tr>
                                <td>Combo khuyến mại</td>
                                <td> {span} </td>
                            </tr>`,
        Tr_Combo_Td_span: ` <span class="combo" data-id="{id}">{name}</span>`,

        Tr_Shipping: ` <tr>
                                <td>Vận chuyển</td>
                                <td>Miễn phí vận chuyển</td>
                            </tr>`,
        Tr_Attributes: `<tr class="attributes" data-level="{level}">
                                <td>{name}</td>
                                <td>
                                    <ul class="box-tag">
                                       {li}

                                    </ul>
                                </td>
                            </tr>`,
        Tr_Attributes_Td_li: `<li class="attribute-detail {active}" data-id="{name}">{src} {name}</li>`,
        Tr_Quanity: `<tr class="box-detail-stock">
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
    },
    Cart: {
        Product:`<div class="product" data-cart-id="{id}" data-amount="{amount}">
                            <div class="product-checkall">
                                <div class="box-checkbox">
                                    <input type="checkbox" name="checkbox-cart-product" class="checkbox-cart" />
                                    <label class="box-checkbox-label"></label>
                                </div>
                            </div>
                            <div class="product-image">
                                <img class="thumb-product" src="{src}" alt="" />
                                <div class="product-title">
                                    <h3 class="name-product">
                                       {name}
                                    </h3>
                                    <p class="product-description">{attribute}</p>
                                </div>

                            </div>
                            <div class="product-price">
                                <span class="price-one">{amount_display}</span>
                                <span class="price-old" style="display:none">
                                    932.00đ <span class="percent">6%</span>
                                    <div class="discount">
                                        <span class="bg-sale">Giảm 30K</span>
                                    </div>
                            </div>
                            <div class="product-quantity">
                                <div class="number-input">
                                    <button onclick="this.parentNode.querySelector('input[type=number]').stepDown()"></button>
                                    <input class="quantity" min="0" name="quantity" value="{quanity}" type="number">
                                    <button onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                                            class="plus"></button>
                                </div>
                            </div>

                            <div class="product-line-price">{total_amount} đ</div>
                            <div class="product-removal">
                                <button class="remove-product">
                                    Xóa
                                </button>
                            </div>
                        </div>`,
        Empty:` <div class="breadcrumb">
            <ul>
                <li><a href="/">Trang chủ</a></li>
                <li class="active"><a href="javascript:;">Giỏ hàng / Thanh toán</a></li>
            </ul>
        </div>
        <div class="box-empty">
            <img src="/images/empty.png" alt="" />
            <h3 class="title">Giỏ hàng trống</h3>
            <p>Không có sản phẩm nào trong giỏ hàng của bạn</p>
            <a href="/" class="btn btn-base">Tiếp tục mua sắm</a>
        </div>`
    }

}