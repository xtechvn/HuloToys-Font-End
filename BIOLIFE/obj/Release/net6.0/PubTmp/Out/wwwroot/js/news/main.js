$(document).ready(function () {

    var category_id = parseInt($(".category_id").data("categoryid"));

    if (category_id <= 0) { 
        // Bind theo chuyên mục
        news.bin_news_top(category_id, "top_story");
        news.bin_news_left(category_id, "top_left");
    } else {
        // Bin theo tin mới nhất của các chuyên mục
        news.bin_news_top(category_id, "category_top");
        news.bin_news_left(category_id, "category_left");
    }    
})

var news = {
    bin_news_top: function (category_id, position_name) {
        
        $.ajax({
            dataType: 'html',
            type: 'POST',
            url: '/news/loadTopStoryComponent',
            data: { category_id: category_id, position_name: position_name },
            success: function (data) {
                $('.list-news-top').html(data);
            },
            error: function (xhr, status, error) {
                console.log("Error: " + error); // Thay đổi từ 'failure' sang 'error'
            }
        });

    },   
    bin_news_left: function (category_id, position_name) {
          
        $.ajax({
            dataType: 'html',
            type: 'POST',
            url: '/news/loadTopStoryComponent',
            data: { category_id: category_id, position_name: position_name },
            success: function (data) {
                
                $('.list-news-top-left').html(data);
            },
            error: function (xhr, status, error) {
                console.log("Error: " + error); // Thay đổi từ 'failure' sang 'error'
            }
        });

    }
}