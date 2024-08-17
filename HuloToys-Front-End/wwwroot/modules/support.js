

var _support =
{
    GetBodyArticle: function (id,urlname) {
        var SelectedElement = $("#Selected-" + id);
        $(".Option-load").removeClass('active');
        SelectedElement.addClass('active');
        $.ajax({
            url: "/Support/GetListByCategoryID",
            type: 'post',
            data: { id: id },
            success: function (data) {
                window.history.pushState('string', '', "/chinh-sach/" + global_service.convertVietnameseToUnsign(urlname))
                $(".content-policy").html('');
                if (data.length > 0) {
                    data.forEach(item => {
                        
                        $(".content-policy").append(`
                    <li>
                    <h2>${urlname}</h2>
                    <h3 style="margin-bottom:10px;margin-top:15px;color:#3B56B4"><i class="fa fa-arrow-right" aria-hidden="true"></i>${item.title}</h3>
                    <div id="lead_policy">${item.lead}</div>
                    <div style="margin-top:10px" id="body_policy">${item.body}</div>
                    </li>`);
                    });
                }
                else
                {
                    $(".content-policy").append(`
                    <li>
                    <h3 style="color:#3B56B4">Chưa có nội dung !</h3>
                    </li>`)
                }
            },

        });
    },

    GetBodyQuestion: function (id) {
        $.ajax({
            url: "/Support/GetBodyArticle",
            type: 'post',
            data: { id: id },
            success: function (data) {
                /*window.history.pushState('string','', "/questions/" + global_service.convertVietnameseToUnsign(data.title))*/
                if (data != null)
                {
                    $('.result-search').html('');
                    $(".content-policy").html('');
                    $(".left-content").html('');
                    $(".left-content").append(`
                    <ul class="list-faq" style="min-width:250px">

                        <li>
                            <a >${data.title}</a>
                        </li>

                    </ul>`);
                    $(".content-policy").append(`<h2 id="title_policy" >${data.title}</h2>`)
                    $(".content-policy").append(`<div style="margin-top:10px">${data.lead}</h1>`)
                    $(".content-policy").append(`<div style="margin-top:10px">${data.body}</h1>`)
                }
            },

        });
    },
    SearchQuestion: function () {
        var title = $('#search-input').val();
        $('.content-policy').html('');
        $('.left-content').html('');
        if (title == '') {
            $('.result-search').html(`<h2>không tìm thấy kết quả tìm kiếm</h2>`);
        }
        else {
            $.ajax({
                url: "/Support/GetListQuestionsByTitle",
                type: 'post',
                data: { title: title, id: 28 },
                success: function (data) {
                    $('.result-search').html('');
                    let count = 0;
                    //dem ban ghi
                    data.forEach(item => {
                        count++;
                    });
                    if (count > 0) {
                        let notif = `<h2>có "${count} kết quả" tìm kiếm</h2>`;
                        $('.result-search').html(notif);

                        data.forEach(item => {
                            let html = `<p style="margin-top:15px" class="Option-load" onclick="_support.GetBodyQuestion('${item.id}')">${item.title}</p>`;
                            $('.result-search').append(html);
                        });
                    }
                    else {
                        $('.result-search').html(`<h2>không tìm thấy kết quả tìm kiếm</h2>`);
                    }
                },

            });
        }
    },

    CreateFeedback: function ()
    {
        let comment = $('#comment-text').val();
        
        if (global_service.CheckLogin()) {
            let Id = global_service.CheckLogin().account_client_id;
            document.getElementById("CommentSucces").style.display = "block";
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
                },

            });
        }
        else
        {
            document.getElementById("CommentSucces").style.display = "block";
            document.getElementById("CommentSucces").textContent = "Vui lòng đăng nhập trước khi góp ý !";
            setTimeout(() => {
                document.getElementById("CommentSucces").style.display = 'none';
            }, 1000);
            return;
        }
    }
}

$(document).ready(function () {
    var ID = localStorage.getItem('ChosenIdPolicy');
    var URL = localStorage.getItem('ChosenUrlPolicy'); 
    if (ID != "")
    {
        _support.GetBodyArticle(ID,URL);
    }
    localStorage.setItem('ChosenIdPolicy', "");
})
