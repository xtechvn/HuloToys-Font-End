var STORAGE_NAME = {
    Login:'account'
}
var API_URL = {
    Login:'/Client/Login',
    Register:'/Client/Register',
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
var HTML_CONSTANTS = {
    GoogleAccountNotRegistered : '<span class="err err-gg-account" style=" width: 100%; text-align: -webkit-center; ">Tài khoản Google chưa được đăng ký, vui lòng điền đầy đủ thông tin và nhấn tạo tài khoản</span>'
}