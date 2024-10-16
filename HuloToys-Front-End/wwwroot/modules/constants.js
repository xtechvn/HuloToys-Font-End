﻿var STORAGE_NAME = {
    Login: 'account',
    ProductDetail: 'ProductDetail',
    CartCount: 'CartCount',
    BuyNowItem: 'BuyNowItem',
    SubProduct: 'SubProduct',
    Order: 'Order',
    AddressClient: 'AddressClient',
    CartAddress: 'CartAddress',
    ProductDetailSelected: 'ProductDetailSelected',
    ProductCommentCount: 'ProductCommentCount',
    OrderDetail: 'OrderDetail'
}
var API_URL = {
    Login: '/Client/Login',
    Register: '/Client/Register',
    ProductDetail: '/Product/ProductDetail',
    ProductList: '/Product/GetList',
    AddToCart: '/Cart/AddToCart',
    CartCount: '/Cart/CartCount',
    CartList: '/Cart/GetList',
    CartDelete: '/Cart/Delete',
    CartDeleteByOrder: '/Cart/DeleteByOrder',
    CartConfirm: '/Order/Confirm',
    OrderDetail: '/Order/GetDetail',
    OrderHistoryDetail: '/Order/GetHistoryDetail',
    QRCode: '/Order/QRCode',
    StaticDomain: 'https://static-image.adavigo.com',
    OrderListing: '/Order/Listing',
    AddressList: '/Client/AddressList',
    AddressDetail: '/Client/AddressDetail',
    AddressPopup: '/Client/AddressPopup',
    AddressProvince: '/Client/Province',
    AddressDistrict: '/Client/District',
    AddressWard: '/Client/Ward',
    UpdateAddress: '/Client/SubmitAddress',
    DefaultAddress: '/Client/DefaultAddress',
    CartChangeQuanity: '/Cart/ChangeQuanity',
    CartCheckProductDetail: '/Cart/CheckProduct',
    GlobalSearch: '/Product/Search',
    ProductReviewComment: '/Product/ReviewComment',
    ProductRaitingCount: '/Product/RaitingCount',
    ProductRaitingPaging: '/Product/RaitingPaging',
    OrderRaitingUploadImage: '/Files/SummitImages',
    OrderRaitingUploadVideo: '/Files/SummitVideo',
    OrderRaitingSubmmit: '/Order/InsertRaiting',
    ClientForgotPassword: '/Client/ForgotPassword',
    ProductSearchListingPaging: '/Product/SearchListingPaging',


}
var NOTIFICATION_MESSAGE = {
    LoginIncorrect: 'Tài khoản / Mật khẩu không chính xác, vui lòng thử lại',
    RegisterIncorrect: 'Thông tin đăng ký không chính xác, vui lòng thử lại hoặc liên hệ bộ phận chăm sóc',
    EmailInCorrect: 'Vui lòng nhập đúng địa chỉ Email',
    PhoneNotCorrect: 'Vui lòng nhập đúng số điện thoại',
    PasswordTooShort: 'Vui lòng nhập mật khẩu trên {count} ký tự',
    PasswordConfirmNotEqual: 'Xác nhận mật khẩu và mật khẩu không khớp',
    EmptyField: 'Vui lòng không để trống'
}
var THIRDPARTY_CONSTANTS = {
    Facebook: {
        AppId: '406702408540759',
        Version: 'v20.0'
    },
    GSI: {
        ClientID: '65575993345-u9qk911fs77lls8tgmn2c3gjk04lg78c.apps.googleusercontent.com'
    }
}
var GLOBAL_CONSTANTS = {
    Size: 6,
    GridSize: 12,
    GroupProduct: {
        FlashSale: 15,
        Discount: 16,
        BEAR_COLLECTION: 17,
        INTELLECTUAL_DEVELOPMENT: 18
    },
    PaymentType: [
        { id: 1, name: 'Thanh toán khi nhận hàng(COD)' },
        { id: 2, name: 'Chuyển khoản qua ngân hàng' },
        { id: 3, name: 'Thanh toán QR-PAY' },
        { id: 4, name: 'Thẻ Visa - Master Card' },
    ],
    OrderStatus: [
        { id: 0, name: 'Chờ thanh toán' },
        { id: 1, name: 'Đang xử lý ' },
        { id: 2, name: 'Đang giao hàng' },
        { id: 3, name: 'Hoàn thành' },
        { id: 4, name: 'Đã hủy' },
    ],
    RaitingPageSize: 5,
    OrderReviewCreate: {
        MaxImage: 5,
        MaxVideo: 1,
        ImageExtension: ['jpeg', 'jpg', 'png', 'bmp'],
        VideoExtension: ['mp4'],
        MaxImageSize: 1572864,
        MaxVideoSize: 52428800
    }
}
var HTML_CONSTANTS = {
    GoogleAccountNotRegistered: '<span class="err err-gg-account" style=" width: 100%; text-align: -webkit-center; ">Tài khoản Google chưa được đăng ký, vui lòng điền đầy đủ thông tin và nhấn tạo tài khoản</span>',
    Global: {
        SelectOption: `<option value="{value}">{name}</option>`
    },
    Home: {
        SlideProductItem: ` <div class="swiper-slide">
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
                                            <div class="review">{review_point}<i class="icon icon-star"></i><span class="total-review">({review_count})</span></div>
                                        </div>
                                        <div class="price-old" style="{old_price_style}">
                                            <nw >So với: {price} <i class="icon icon-info"></i></nw>
                                            <div class="info-detail">
                                                Giá sản phẩm <b>rẻ nhất</b> của đơn vị khác
                                                được Hulo Toys nghiên cứu trên <b>mọi nền tảng</b>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>`,
        GlobalSearchProductItem: ` <div class="item-product">
            <a href="{url}">
                <div class="box-thumb">
                    <div class="thumb-product">
                        <img src="{avt}" width="100px" height="100px" alt="">
                    </div>
                </div>
                <div class="box-info">
                    <h3 class="name-product">{name}</h3>
                    <div class="flex-price">
                    <div class="price-sale">{amount}</div>
                     <div class="review">{review_point}<i class="icon icon-star"></i><span class="total-review">{review_count}</span></div>
                    </div>
                    <div class="price-old">
                     <nw style="display:none;">So với giá cũ {price} <i class="icon icon-info"></i></nw>
                        <div class="info-detail">
                            Giá sản phẩm <b>rẻ nhất</b> của đơn vị khác
                            được Hulo Toys nghiên cứu trên <b>mọi nền tảng</b>
                        </div>
                    </div>
                </div>
            </a>
        </div>`,
        GlobalSearchByKeyword: ` <div class="item-product">
            <a href="{url}">
                <div class="box-info">
                    <h3 class="name-product">{name}</h3>
                </div>
            </a>
        </div>`,
        GlobalSearchBoxLoading:` <div class="list-product-recomment">
        <div class="item-product">
            <a href="">
                <div class="box-thumb">
                    <div class="thumb-product">
                        <img src="/assets/images/product.jpg" alt="">
                    </div>
                </div>
                <div class="box-info">
                    <h3 class="name-product">Đồ Chơi Lắp Ráp Tàu Vũ Trụ Lele Brother, Xếp Hình Cho Bé Từ 6 Tuổi</h3>
                    <div class="flex-price">
                        <div class="price-sale">689,098đ</div>
                        <div class="review">4.8<i class="icon icon-star"></i><span class="total-review">(322)</span></div>
                    </div>
                    <div class="price-old">
                        So với giá cũ 767,009đ <i class="icon icon-info"></i>
                        <div class="info-detail">
                            Giá sản phẩm <b>rẻ nhất</b> của đơn vị khác
                            được Hulo Toys nghiên cứu trên <b>mọi nền tảng</b>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        <div class="item-product">
            <a href="">
                <div class="box-thumb">
                    <div class="thumb-product">
                        <img src="/assets/images/product.jpg" alt="">
                    </div>
                </div>
                <div class="box-info">
                    <h3 class="name-product">Đồ Chơi Lắp Ráp Tàu Vũ Trụ Lele Brother, Xếp Hình Cho Bé Từ 6 Tuổi</h3>
                    <div class="flex-price">
                        <div class="price-sale">689,098đ</div>
                        <div class="review">4.8<i class="icon icon-star"></i><span class="total-review">(322)</span></div>
                    </div>
                    <div class="price-old">
                        So với giá cũ 767,009đ <i class="icon icon-info"></i>
                        <div class="info-detail">
                            Giá sản phẩm <b>rẻ nhất</b> của đơn vị khác
                            được Hulo Toys nghiên cứu trên <b>mọi nền tảng</b>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        <div class="item-product">
            <a href="">
                <div class="box-thumb">
                    <div class="thumb-product">
                        <img src="/assets/images/product.jpg" alt="">
                    </div>
                </div>
                <div class="box-info">
                    <h3 class="name-product">Đồ Chơi Lắp Ráp Tàu Vũ Trụ Lele Brother, Xếp Hình Cho Bé Từ 6 Tuổi</h3>
                    <div class="flex-price">
                        <div class="price-sale">689,098đ</div>
                        <div class="review">4.8<i class="icon icon-star"></i><span class="total-review">(322)</span></div>
                    </div>
                    <div class="price-old">
                        So với giá cũ 767,009đ <i class="icon icon-info"></i>
                        <div class="info-detail">
                            Giá sản phẩm <b>rẻ nhất</b> của đơn vị khác
                            được Hulo Toys nghiên cứu trên <b>mọi nền tảng</b>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    </div>`,
        GridProductItem: `<div class="item-product">
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
                                    <nw style="display:none;">So với giá cũ {price} <i class="icon icon-info"></i></nw>
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
        Images: `
                              <a  class="swiper-slide" href="{src}" data-lg-id="3e1fbec2-9c35-461a-b9cc-79fd1d885438">
                                <img src="{src}" width="500" height="300">
                            </a>

                            `,
        Videos: `
                            <a class="swiper-slide" data-video='{"source": [{"src":"{src}", "type":"video/mp4"}],"attributes": {"preload": false, "controls": false}}'
                               data-poster="/assets/images/product.jpg">
                                <i class="icon-video"></i>
                                  <video>
                                      <source src="{src}" type="video/mp4">
                                      Your browser does not support the video tag.
                                    </video>
                            </a>


                            `,
        ThumbnailImages: `<div class="swiper-slide">
                            <img src="{src}" alt="" />
                            </div > `,
        ThumbnailVideos: `<div class="swiper-slide">
                                <video>
                                      <source src="{src}" type="video/mp4">
                                      Your browser does not support the video tag.
                                    </video>
                            </div >`,
     
        Star: `<i class="icon icon-star"></i>`,
        Half_Star: `<i class="icon half-star"></i>`,
        Empty_Star: `<i class="icon empty-star"></i>`,
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
                                        <input class="quantity" min="1" name="quantity" value="1" type="number">
                                        <button onclick="this.parentNode.querySelector('input[type=number]').stepUp()" class="plus"></button>
                                    </div>

                                    <span class="soluong">{stock} sản phẩm có sẵn</span>
                                </td>
                            </tr>`
    },
    Cart: {
        Product: `<div class="product" data-cart-id="{id}" data-product-id="{product_id}" data-amount="{amount}">
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
                                    <input class="quantity" min="1" name="quantity" value="{quanity}" type="number">
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
        Empty: `<section class="cart-empty" style="margin-top:20px;margin-bottom:100px;">
    <div class="container">
        <div class="breadcrumb">
            <ul>
                <li><a href="/">Trang chủ</a></li>
                <li class="active"><a href="javascript:;">Giỏ hàng / Thanh toán</a></li>
            </ul>
        </div>
        <div class="box-empty">
            <img src="/assets/images/empty.png" alt="" />
            <h3 class="title">Giỏ hàng trống</h3>
            <p>Không có sản phẩm nào trong giỏ hàng của bạn</p>
            <a href="/" class="btn btn-base">Tiếp tục mua sắm</a>
        </div>
    </div>
</section>`
    },
    OrderHistory: {
        Item: ` <div class="box-order-detail" data-id="{order_id}">
                            <div class="head-box">
                                <span class="code">Mã đơn hàng: <b>{order_no}</b></span>
                                <span class="status">Tình trạng: <span class="high">{status}</span></span>
                                <span class="code">Ngày đặt hàng: <b>{create_date}</b></span>
                                <a href="/order/detail/{order_id}" class="btn-seemore">Xem chi tiết</a>
                            </div>
                            <div class="list-product-order">
                               {product_detail}
                            </div>
                            <div class="bottom-box">
                                <div class="action">
                                    <a href="javascript:;" class="btn btn-base btn-confirm-received {confirm_display}" style="">Đã nhận được hàng</a>
                                    <a href="javascript:;" class="btn btn-line btn-cancel-order {confirm_cancel}" >Hủy đơn hàng</a>
                                </div>
                                <div class="total-price">Tổng tiền: <span class="number-price">{total_amount}</span> </div>
                            </div>
                        </div>`,
        ItemProduct: ` <div class="item">
                                    <div class="img">
                                        <img src="{src}" alt="">
                                    </div>
                                    <div class="info">
                                        <h3 class="name-product">
                                          {name}
                                        </h3>
                                        <div class="cat">{attributes}</div>
                                        <div class="flex-quantity">
                                            <span>Giá: {price} &nbsp; &nbsp; &nbsp;</span>
                                            <span>Số lượng:{quanity}</span>
                                        </div>
                                        <p class="price amount">{amount}</p>
                                    </div>
                                </div>`
    },
    Address: {
        GridItem: ` <div class="item address-item {active}" data-id="{id}">
                            <span class="defauld" style="{default-address-style}">Đặt làm mặc định</span>
                            <h3 class="name">{name}</h3>
                            <p class="add">
                               {address}
                            </p>
                            <p class="tel">Điện thoại: {tel}</p>
                            <a href="javascript:;" class="btn btn-update btn-update-address">Cập nhật</a>
                        </div>`
    },

    OrderDetailRaiting: {
        ReviewImage: `<div class="item review-img">
                                <img src="{src}" alt="">
                                <div class="del"></div>
                            </div>`,
        ReviewVideo: `<div class="item review-video">
                                  <video  width="64" height="64">
                                      <source src="{src}" type="video/mp4">
                                      Your browser does not support the video tag.
                                    </video>
                                <div class="del"></div>
                            </div>`,
        Item: ` <div class="item review-item" data-product-id="{product_id}">
                    <div class="box-product">
                        <div class="img">
                            <img src="{img}" alt="" />
                        </div>
                        <div class="info">
                            <h3 class="name-product">
                                {name}
                            </h3>
                            <div class="cat">{variation_detail}</div>
                        </div>
                    </div>
                    <div class="star" data-value="5">
                        <span>Chất lượng sản phẩm</span>
                        <span class="rate five">
                            <i class="star-number" data-class="one">★</i>
                            <i class="star-number" data-class="two">★</i>
                            <i class="star-number" data-class="three">★</i>
                            <i class="star-number" data-class="four">★</i>
                            <i class="star-number" data-class="five">★</i> 
                            <nw class="star-label">Tuyệt vời</nw>
                        </span>
                    </div>
                    <textarea rows="4" class="form-control"
                              placeholder="Hãy chia sẽ điều bạn thích về sản phẩm với những người mua khác nhé."></textarea>
                   
                    <div class="upload-file">
                        <div class="uploadIMG ">
                            <input type="file" class="upload image_input" data-type="images" multiple />
                            <span>Thêm hình ảnh</span>
                        </div>
                        <div class="uploadVIDEO ">
                            <input type="file" class="upload image_input" data-type="videos" />
                            <span>Thêm video</span>
                        </div>
                    </div>
                     <p class="error" style="display:none; color:red;"></p>
                    <div class="wrap-img-upload" style="display:none;">
                        <div class="uploadIMG " >
                            <input type="file" class="upload image_input" data-type="images" multiple/>
                            <span><nw class="count">0</nw>/5</span>
                        </div>
                        <div class="uploadVIDEO ">
                            <input type="file" class="upload image_input" data-type="videos" />
                            <span><nw class="count">0</nw>/1</span>
                        </div>
                    </div>
                </div>`,


    }

}