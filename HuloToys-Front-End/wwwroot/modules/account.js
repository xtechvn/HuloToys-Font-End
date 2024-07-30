$(document).ready(function () {
    account.Initialization()
  
})

var account = {
    Initialization: function () {
        account.RenderHTML()
        account.DynamicBind()
       
    },
    RenderHTML: function () {
        $('.err').hide()
        var usr = global_service.CheckLogin()
        if (usr) {
            $('#client-account-name').html(usr.name)
            $('#client-account-name').closest('a').attr('href','/account')
        }
        $('#dangky .email input').addClass('no-requirement')
    },
    DynamicBind: function () {
        $("body").on('focusout', "#dangnhap input, #dangky input", function () {
            var element = $(this)
            if (element.hasClass('no-requirement') && (element.val() == undefined || element.val().trim() == '')) {
                element.closest('.form-group').find('.err').show()
            }

        });
        $("body").on('focusin', "#dangnhap input, #dangky input", function () {
            var element = $(this)
            element.closest('.form-group').find('.err').hide()
            element.closest('.form-group').find('.err').html(NOTIFICATION_MESSAGE.EmptyField)
        });
        $("body").on('click', "#btn-client-login", function () {
            account.Login()
        });
        $("body").on('click', "#btn-client-register", function () {
            account.Register()
        });
        $("body").on('click', ".ghinho", function () {
            var element = $(this)
            if (element.find('input').is(':checked')) {
                element.find('input').prop('checked', false);
            } else {
                element.find('input').prop('checked', true);
            }
        });

    },
    Login: function () {
        var element = $('#btn-client-login')
        if (account.ValidateLogin()) {
            $(':input[type="submit"]').prop('disabled', true);
            element.html('Vui lòng chờ ....')
            var request = {
                "user_name": $('#dangnhap .user input').val(),
                "password": $('#dangnhap .password input').val(),
                "remember_me": $('#dangnhap .checkbox').is(":checked")
            }
            $.when(
                global_service.POST(API_URL.Login, request)
            ).done(function (res) {
                if (res.is_success) {
                    if ($('#dangnhap .checkbox').is(":checked")) {
                        localStorage.setItem(STORAGE_NAME.Login, JSON.stringify(res.data))
                    } else {
                        sessionStorage.setItem(STORAGE_NAME.Login, JSON.stringify(res.data))
                    }
                    window.location.reload()
                }
                else {
                    $(':input[type="submit"]').prop('disabled', false);

                    $('#dangnhap .user input').closest('.form-group').find('.err').show()
                    $('#dangnhap .user input').closest('.form-group').find('.err').html(NOTIFICATION_MESSAGE.LoginIncorrect)
                    element.html('Đăng nhập')

                }

            })
        }
    },
    Register: function () {
        var element = $('#btn-client-register')
        if (account.ValidateRegister()) {
            element.html('Vui lòng chờ ....')
            $(':input[type="submit"]').prop('disabled', true);

            var request = {
                "user_name": $('#dangky .user input').val(),
                "email": $('#dangky .email input').val(),
                "phone": $('#dangky .tel input').val(),
                "password": $('#dangky .register-password input').val(),
                "confirm_password": $('#dangky .confirm-password input').val(),
                "is_receive_email": $('#dangky .checkbox').is(":checked")
            }
            $.when(
                global_service.POST(API_URL.Register, request)
            ).done(function (res) {
                if (res.is_success) {
                    $('.client-login-popup').removeClass('overlay-active')
                    $('#success').addClass('overlay-active')
                }
                else {
                    $(':input[type="submit"]').prop('disabled', false);
                    $('#dangky .user input').closest('.form-group').find('.err').show()
                    $('#dangky .user input').closest('.form-group').find('.err').html(NOTIFICATION_MESSAGE.RegisterIncorrect)
                    element.html('Đăng ký')

                }

            })
        }
    },
    ValidateLogin: function () {
        var success = true
        var element = $('#dangnhap .user input') 
        if (element.val() == undefined || element.val().trim() == '') {
            element.closest('.form-group').find('.err').show()
            success = false

        }
        //if (!success) return success
        element = $('#dangnhap .password input')
        if (element.val() == undefined || element.val().trim() == '') {
            element.closest('.form-group').find('.err').show()
            success = false

        }
        //if (!success) return success

        return success
    },
    ValidateRegister: function () {
        var password_length = 6

        var success = true
        var element = $('#dangky .user input') 
        if (element.val() == undefined || element.val().trim() == '') {
            element.closest('.form-group').find('.err').show()
            success = false

        }
        //if (!success) return success
        element = $('#dangky .email input') 
        if (element.val() == undefined || element.val().trim() == '') {
            element.closest('.form-group').find('.err').show()
            success = false

        }
        else if (element.val() != undefined && element.val().trim() != '') {
            var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
            if (!pattern.test(element.val())) {
                element.closest('.form-group').find('.err').html(NOTIFICATION_MESSAGE.EmailInCorrect)
                element.closest('.form-group').find('.err').show()
                success = false
            }
        }
        //if (!success) return success

        element = $('#dangky .tel input') 
        if (element.val() == undefined || element.val().trim() == '') {
            element.closest('.form-group').find('.err').show()
            success = false

        }
        else if (element.val() != undefined && element.val().trim() != '') {
            var pattern = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
            if (!pattern.test(element.val())) {
                element.closest('.form-group').find('.err').html(NOTIFICATION_MESSAGE.PhoneNotCorrect)
                element.closest('.form-group').find('.err').show()
                success = false
            }
        }
        //if (!success) return success

        element = $('#dangky .register-password input')
        if (element.val() == undefined || element.val().trim() == '') {
            element.closest('.form-group').find('.err').show()
            success = false
        }
        else if (element.val().length < password_length) {
            element.closest('.form-group').find('.err').html(NOTIFICATION_MESSAGE.PasswordTooShort.replace('{count}', password_length))
            element.closest('.form-group').find('.err').show()
            success = false
        }
        //if (!success) return success

        element = $('#dangky .confirm-password input')
        if (element.val() == undefined || element.val().trim() == '') {
            element.closest('.form-group').find('.err').show()
            success = false
        }
        else if (element.val() != $('#dangky .password input').val()) {
            element.closest('.form-group').find('.err').html(NOTIFICATION_MESSAGE.PasswordConfirmNotEqual)
            element.closest('.form-group').find('.err').show()
            success = false
        }
        //if (!success) return success
        return success
    }
}
