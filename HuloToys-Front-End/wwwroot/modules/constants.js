var STORAGE_NAME = {
    Login:'account'
}
var API_URL = {
    Login:'/Client/Login',
    Register:'/Client/Register',
    ProductDetail:'/Product/detail',
    ProductList:'/Product/list'
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
    GroupProduct: {
        FlashSale: 15
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
                                        <div class="price-old">
                                            So với giá cũ {price} <i class="icon icon-info"></i>
                                            <div class="info-detail">
                                                Giá sản phẩm <b>rẻ nhất</b> của đơn vị khác
                                                được Hulo Toys nghiên cứu trên <b>mọi nền tảng</b>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>`
    }

}