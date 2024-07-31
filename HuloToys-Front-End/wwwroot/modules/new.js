$(document).ready(function () {
    _new.Initialization()

})
var _new = {
    Initialization: function () {
        _new.getNewsCategory();
        _new.getNewsByTag(1, 10, 1);
        _new.getNewsMostViewedArticle(1, 10, 1);
        _new.getNewsBySale(1, 10, 1);


    },
 
    NewsCategory: function () {
        var requestObj = {
           
        };
        $.ajax({
            url: "New/GetNewsByTag",
            type: 'post',
            data: { requestObj: requestObj },
            success: function (data) {
                $("#news-category").html(data);
            },
           
        });
    },
    getNewsByTag: function (page, size, category_id) {
        var requestObj = {
            page: page,
            size: size,
            category_id: category_id
        };
        $.ajax({
            url: "New/GetNewsByTag",           
            type: 'post',
            data: { requestObj: requestObj },
            success: function (data) {
               
                $("#section-article-paginate").html(data);
            },
           
        });
    },

    getNewsMostViewedArticle: function (page, size, category_id) {
        var requestObj = {
            page: page,
            size: size,
            category_id: category_id
        };
        $.ajax({
            url: "New/NewsMostViewedArticle",
            type: 'post',
            data: { requestObj: requestObj },
            success: function (data) {

                $("#Most_Viewed_Article").html(data);
            },

        });
    },
    getNewsBySale: function (page, size, category_id) {
        var requestObj = {
            page: page,
            size: size,
            category_id: category_id
        };
        $.ajax({
            url: "New/NewsMostViewedArticle",
            type: 'post',
            data: { requestObj: requestObj },
            success: function (data) {
                $("#list_new_Sale").html(data);
            },

        });
    },
}