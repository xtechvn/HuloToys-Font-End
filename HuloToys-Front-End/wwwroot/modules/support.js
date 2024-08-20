

var _support =
{
    GetBodyArticle: function (id, urlname) {
        var SelectedElement = $("#Selected-" + id);
        $(".Option-load").removeClass('active');
        SelectedElement.addClass('active');
        $.ajax({
            url: "/Support/GetListByCategoryID",
            type: 'post',
            data: { id: id, idType: 28 },
            success: function (data) {
                window.history.pushState('string', '', "/chinh-sach/" + global_service.convertVietnameseToUnsign(urlname))
                $(".content-policy").html('');
                if (data.length > 0) {
                    $(".content-policy").append(`<h2 style="margin-bottom:20px">${urlname}</h2>`);
                    data.forEach(item => {

                        $(".content-policy").append(`
                    <div class="item">
                    <h3 class="title-faq" onclick="_support.DisplayHiddenContent('${item.id}')">${item.title}</h3>
                    <div class="answer content${item.id}" style="margin-left:20px;margin-bottom:20px">
                        ${item.body}
                    </div>
                </div>`);
                    });
                }
                else {
                    $(".content-policy").append(`
                    <h3 style="color:#3B56B4">Chưa có nội dung !</h3>`)
                }
            },

        });
    },
    DisplayHiddenContent: function (id) {
        let contentpolicy = $('.content' + id)
        if (!contentpolicy.hasClass('Hide-ContentPolicy')) {
            contentpolicy.addClass('Hide-ContentPolicy');
        }
        else {
            contentpolicy.removeClass('Hide-ContentPolicy');
        }

    },
    GetBodyQuestion: function (id) {
        $.ajax({
            url: "/Support/GetBodyArticle",
            type: 'post',
            data: { id: id, idType: 28 },
            success: function (data) {
                window.history.pushState('string', '', "/questions/" + global_service.convertVietnameseToUnsign(data.title))
                if (data != null) {
                    $('.result-search').html('');
                    $(".content-policy").html('');
                    $(".left-content").html('');
                    $(".left-content").append(`
                    <ul class="list-faq" style="min-width:250px">

                        <li class="active">
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
                        $('.result-search').html(`<h2>Không tìm thấy kết quả tìm kiếm</h2>`);
                    }
                },

            });
        }
    },
    GotoSearchBox: function () {
        localStorage.setItem("focus", "aaa");
        window.location.href = '/cham-soc-khach-hang';
    },

    FocusOnSearch: function ()
    {
        if (localStorage.getItem("focus"))
        {
            $("#search-input").focus();
            localStorage.removeItem("focus");
        }
    },

    CreateFeedback: function ()
    {
        let comment = $('#comment-text').val();
        if (!comment)
        {
            document.getElementById("CommentSucces").style.display = "block";
            document.getElementById("CommentSucces").textContent = "Vui lòng nhập nội dung góp ý !";
            setTimeout(() => {
                document.getElementById("CommentSucces").style.display = 'none';
            }, 1000);
        }
        else if (global_service.CheckLogin()) {
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
    if (ID != "") {
        _support.GetBodyArticle(ID, URL);
    }
    else
    {
        var IdDefault = $('#IDdefaultOption').text();
        var UrlDefault = $('#NamedefaultOption').text();
        _support.GetBodyArticle(IdDefault, UrlDefault)
    }
    localStorage.setItem('ChosenIdPolicy', "");

    _support.FocusOnSearch();

    $("#search-input").on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            e.preventDefault();
            _support.SearchQuestion();
        }
    });
})
