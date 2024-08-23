$(document).ready(function () {
    var Comment_Saved = sessionStorage.getItem("Saved_Input");
    if (Comment_Saved != null && Comment_Saved != '')
    {
        _feedback.CreateFeedback();
    }
});


var _feedback =
{
    CreateFeedback: function () {
        let comment = sessionStorage.getItem("Saved_Input");
        if (!comment) {
            document.getElementById("CommentSucces").style.display = "block";
            document.getElementById("CommentSucces").textContent = "Vui lòng nhập nội dung góp ý !";
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
                    sessionStorage.setItem("Saved_Input", '');
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                },
                error: function (xhr, status, error) {
                    location.reload();
                }
            });
        }
        else {
            $('.client-login').click();
            return;
        }
    },
    SaveText: function ()
    {
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
        if (email_input == null || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email_input))
        {
        }
        else
        {
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