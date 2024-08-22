var _feedback =
{
    CreateFeedback: function () {
        let comment = $('#comment-text').val();
        if (!comment) {
            document.getElementById("CommentSucces").style.display = "block";
            document.getElementById("CommentSucces").textContent = "Vui lòng nhập nội dung góp ý !";
            setTimeout(() => {
                document.getElementById("CommentSucces").style.display = 'none';
            }, 1000);
        }
        else if (global_service.CheckLogin()) {
            let Id = global_service.CheckLogin().account_client_id;
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
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                },

            });
        }
        else {
            $('.client-login').click();
            return;
        }
    },
    CreateEmailPromotion: function () {
        let email_input = $('#Email-text').val();
        var obj =
        {
            "AccountClientId": '',
            "Content": '',
            "Email": email_input
        }
        if (!email_input) {}
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