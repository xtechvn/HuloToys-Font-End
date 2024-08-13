$(document).ready(function() {
    _newdetail.Initialization()

})
var _newdetail = {
    Initialization: function () {
        _newdetail.getNewsMostViewedArticle(1, 10, 1);
        _newdetail.NewsCategory();

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
}