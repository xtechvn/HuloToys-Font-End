$(document).ready(function () {
    var Comment_Saved = sessionStorage.getItem("Saved_Input");
    if (Comment_Saved != null && Comment_Saved != '') {
        _feedback.CreateFeedbackAfterLogin();
    }
});


var _feedback =
{
    CreateFeedback: function () {
        sessionStorage.setItem("CreateFeedbackAction", 1);//Dùng để xác nhận hành động tạo feedback khi hành động đăng nhập chen ngang
        let comment = $('#comment-text').val();
        if (!comment) {
            document.getElementById("CommentSucces").style.display = "block";
            document.getElementById("CommentSucces").textContent = "Vui lòng nhập nội dung góp ý !";
            sessionStorage.setItem("CreateFeedbackAction", 0);
            setTimeout(() => {
                document.getElementById("CommentSucces").style.display = 'none';
            }, 1000);
        }
        else if (global_service.CheckLogin()) {
            let Id = global_service.CheckLogin().account_client_id;
            $('.btn-Send').addClass('disabled');
            var obj =
            {
                "AccountClientId": Id,
                "Content": comment
            }
            $.ajax({
                url: "/Support/CreateFeedback",
                type: 'post',
                data: { obj: obj },
                success: function (data) {
                    document.getElementById("CommentSucces").style.display = "block";
                    document.getElementById("CommentSucces").textContent = "Cảm ơn vì đã góp ý!";
                    sessionStorage.setItem("Saved_Input", '');
                    sessionStorage.setItem("CreateFeedbackAction", 0);
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                },
                error: function (xhr, status, error) {
                    sessionStorage.setItem("CreateFeedbackAction", 0);
                    location.reload();
                }
            });
        }
        else {
            $('.client-login').click();
            var LoginForm = $('#dangnhap');
            var RegisterForm = $('#dangky');
            RegisterForm.removeClass('overlay-active');
            LoginForm.addClass('overlay-active');
            return;
        }
    },
    //tạo feedback trong trường hợp đã nhập nội dung sau đăng nhập(với điều kiện là phải nhấn vào nút gửi)
    CreateFeedbackAfterLogin: function () {
        let comment = sessionStorage.getItem("Saved_Input");
        const currentPath = window.location.pathname;
        let Id = global_service.CheckLogin().account_client_id;
        let CreateAction = sessionStorage.getItem("CreateFeedbackAction");
        if (comment && Id && CreateAction == 1 && currentPath.startsWith('/dong-gop-y-kien')) {
            var obj =
            {
                "AccountClientId": Id,
                "Content": comment
            }
            $.ajax({
                url: "/Support/CreateFeedback",
                type: 'post',
                data: { obj: obj },
                success: function (data) {
                    document.getElementById("CommentSucces").style.display = "block";
                    document.getElementById("CommentSucces").textContent = "Cảm ơn vì đã góp ý!";
                    sessionStorage.setItem("Saved_Input", '');
                    sessionStorage.setItem("CreateFeedbackAction", 0);
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                },
                error: function (xhr, status, error) {
                    sessionStorage.setItem("CreateFeedbackAction", 0);
                    location.reload();
                }
            });
        }
    },
    //Lưu trữ content khi sự kiện textchange xảy ra
    SaveText: function () {
        let Comment_input = $('#comment-text').val();
        sessionStorage.setItem("Saved_Input", Comment_input);
    }
    ,
    CreateEmailPromotion: function () {
        let email_input = $('#Email-text').val();
        var obj =
        {
            "AccountClientId": '',
            "Content": '',
            "Email": email_input
        }
        if (email_input == null || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email_input)) {
        }
        else {
            $.ajax({
                url: "/Support/CreateEmailPromotion",
                type: 'post',
                data: { obj: obj },
                success: function (data) {
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                },

            });
        }
    }
}