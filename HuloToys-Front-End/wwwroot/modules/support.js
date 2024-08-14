﻿

var _support =
{
    GetBodyArticle: function (id) {
        $.ajax({
            url: "/Support/GetPolicyById",
            type: 'post',
            data: { id: id },
            success: function (data) {
                $(".content").html('');
                $(".content").append(`<h1 class="title" id="title_policy" >${data.title}</h1>`)
                $(".content").append(`<div>${data.lead}</h1>`)
                $(".content").append(`<div style="margin-top:10px">${data.body}</h1>`)
            },

        });
    },

    LoadPolicy: function () {
        $.ajax({
            url: "/Support/GetListPolicy",
            type: 'post',
            data: null,
            success: function (data) {
                $(".policy-footer").html(``);
                data.forEach(item => {
                    let html = `<li><a onclick="_support.GetBodyArticle('${item.id}')">${item.title}</a></li>`;
                    $(".policy-footer").append(html);
                });

            },
        });
    },

    GetBodyQuestion: function (id) {
        $.ajax({
            url: "/Support/GetQuestionById",
            type: 'post',
            data: { id: id },
            success: function (data) {
                $('.result-search').html('');
                $(".content").html('');
                $(".left-content").html('');
                $(".left-content").append(`
                <ul class="list-faq">

                        <li>
                            <a >${data.title}</a>
                        </li>

                </ul>`);
                $(".content").append(`<h1 class="title" id="title_policy" >${data.title}</h1>`)
                $(".content").append(`<div>${data.lead}</h1>`)
                $(".content").append(`<div style="margin-top:10px">${data.body}</h1>`)
            },

        });
    },
    SearchQuestion: function () {
        var title = $('#search-input').val();
        $('.content').html('');
        $('.left-content').html('');
        if (title == '') {
            $('.result-search').html(`<h2>không tìm thấy kết quả tìm kiếm</h2>`);
        }
        else {
            $.ajax({
                url: "/Support/GetListQuestionsByTitle",
                type: 'post',
                data: { title: title },
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
                            let html = `<p onclick="_support.GetBodyQuestion('${item.id}')">${item.title}</p>`;
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
                alert("OK")
            },

        });

    }
}

$(document).ready(function () {
    _support.LoadPolicy();
})