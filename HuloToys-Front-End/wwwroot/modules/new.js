$(document).ready(function () {
    _new.Initialization()

})
var _new = {
    Initialization: function () {
        _new.NewsCategory();
        _new.getNewsByTag(1, 10, 1);
        _new.getNewsPinned(1, 10, 1);
        _new.getNewsMostViewedArticle(1, 10, 1);
        _new.getNewsBySale(1, 10, 1);


    },
 
 
    NewsCategory: function () {
        var requestObj = {
           
        };
        $.ajax({
            url: "/News/NewsCategory",
            type: 'post',
            data: { requestObj: requestObj },
            success: function (data) {
                $("#news-category").html(data);
            },
           
        });
    },
    getNewsPinned: function (page, size, category_id) {
        var requestObj = {
            skip: page,
            take: size,
            category_id: category_id
        };
        $.ajax({
            url: "/News/NewsPinned",           
            type: 'post',
            data: { requestObj: requestObj },
            success: function (data) {
               
                $("#article-1").html(data);
            },
           
        });
    },
    getNewsByTag: function (page, size, category_id) {
        var requestObj = {
            skip: page,
            take: size,
            category_id: category_id
        };
        $.ajax({
            url: "/News/NewsByTag",           
            type: 'post',
            data: { requestObj: requestObj },
            success: function (data) {
               
                $("#section-article-paginate").html(data);
            },
           
        });
    },

    getNewsMostViewedArticle: function (page, size, category_id) {
        var requestObj = {
            skip: page,
            take: size,
            category_id: category_id
        };
        $.ajax({
            url: "/News/NewsMostViewedArticle",
            type: 'post',
            data: { requestObj: requestObj },
            success: function (data) {

                $("#Most_Viewed_Article").html(data);
            },

        });
    },
    getNewsBySale: function (page, size, category_id) {
        var requestObj = {
            skip: page,
            take: size,
            category_id: category_id
        };
        $.ajax({
            url: "/News/NewsMostViewedArticle",
            type: 'post',
            data: { requestObj: requestObj },
            success: function (data) {
                $("#list_new_Sale").html(data);
            },

        });
    },
}