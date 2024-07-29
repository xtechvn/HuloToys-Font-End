$(document).ready(function () {
    global_service.Initialization()
})
var global_service = {
    Initialization: function () {
        $("body").on('click', ".client-login", function (event) {
            var element = $(this)
            event.preventDefault()
            var box_id = element.attr('data-id')
            $('.client-login-popup').removeClass('overlay-active')
            $('' + box_id).addClass('overlay-active')
        });
        $("body").on('click', ".overlay .close", function (event) {
            var element = $(this)
            event.preventDefault()
            element.closest('.overlay').removeClass('overlay-active')
        });
    },
    CheckLogin: function () {
        var str = localStorage.getItem(STORAGE_NAME.Login)
        if (str != undefined && str.trim() != '') {
            return JSON.parse(str)
        }
        str = sessionStorage.getItem(STORAGE_NAME.Login)
        if (str != undefined && str.trim() != '') {
            return JSON.parse(str)
        }
        return undefined
    },
    POST: function (url, data) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: url,
                dataType: 'json',
                type: 'post',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(data),
                processData: false,
                success: function (data) {
                    resolve(data);
                },
                error: function (err) {
                    reject(err);
                }
            });
        });
    },


    GET: function (url) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: url,
                dataType: 'json',
                type: 'get',
                contentType: 'application/json',
                processData: false,
                success: function (data) {
                    resolve(data);
                },
                error: function (err) {
                    reject(err);
                }
            });
        });
    },
  
}