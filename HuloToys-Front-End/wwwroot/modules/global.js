﻿$(document).ready(function () {
    global_service.Initialization();
    global_service.LoadPolicy();
    global_service.LoadAbouHulotoys();
    global_service.LoadCustomerSupport();
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
    LoadPolicy: function () {
        $.ajax({
            url: "/Support/GetListPolicy",
            type: 'post',
            data: null,
            success: function (data) {
                data.forEach(item => {
                    let html = `<li><a class="li-Cursor" onclick="global_service.PolicyNaviga('/chinh-sach/','${item.id}','${item.name}')">${item.name}</a></li>`;
                    $(".policy-footer").append(html);
                });
            },
        });
    },
    LoadAbouHulotoys: function () {
        $.ajax({
            url: "/Support/GetListAboutHulotoys",
            type: 'post',
            data: null,
            success: function (data) {
                data.forEach(item => {
                    let html = `<li><a class="li-Cursor" onclick="global_service.Naviga('/tin-tuc/','${item.id}','${item.title}-${item.id}')">${item.title}</a></li>`;
                    $(".AboutHulotoy-footer").append(html);
                });
            },
        });
    },
    LoadCustomerSupport: function () {
        $.ajax({
            url: "/Support/GetListCustomerSupport",
            type: 'post',
            data: null,
            success: function (data) {
                console.log(data)
                data.forEach(item => {
                    let html = `<li><a class="li-Cursor" onclick="global_service.Naviga('/tin-tuc/','${item.id}','${item.title}-${item.id}')">${item.title}</a></li>`;
                    $(".CustomerSupport-footer").prepend(html);
                });
            },
        });
    },
    PolicyNaviga: function (url,id,title)
    {
        window.location.href = url + this.convertVietnameseToUnsign(title);
        localStorage.setItem('ChosenIdPolicy', id);
        localStorage.setItem('ChosenUrlPolicy', title);
    },
    Naviga: function (url, id, title) {
        window.location.href = url + this.convertVietnameseToUnsign(title);
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
                type: 'post',
                url: url,
                data: { request: data },
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
    DecodeGSIToken: function (token) {
        let base64Url = token.split('.')[1]
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload)
    },
    Comma: function (number) { //function to add commas to textboxes
        number = ('' + number).replace(/[^0-9.,]+/g, '');
        number += '';
        number = number.replaceAll(',', '');
        x = number.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1))
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        return x1 + x2;
    },
    RemoveUnicode: function ( text) {
        var arr1 =  [
            "á", "à", "ả", "ã", "ạ", "â", "ấ", "ầ", "ẩ", "ẫ", "ậ", "ă", "ắ", "ằ", "ẳ", "ẵ", "ặ",
            "đ",
            "é", "è", "ẻ", "ẽ", "ẹ", "ê", "ế", "ề", "ể", "ễ", "ệ",
            "í", "ì", "ỉ", "ĩ", "ị",
            "ó", "ò", "ỏ", "õ", "ọ", "ô", "ố", "ồ", "ổ", "ỗ", "ộ", "ơ", "ớ", "ờ", "ở", "ỡ", "ợ",
            "ú", "ù", "ủ", "ũ", "ụ", "ư", "ứ", "ừ", "ử", "ữ", "ự",
            "ý", "ỳ", "ỷ", "ỹ", "ỵ"];
        var arr2 =  [
            "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a",
            "d",
            "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e",
            "i", "i", "i", "i", "i",
            "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o",
            "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "u",
            "y", "y", "y", "y", "y"];
        for (var i = 0; i < arr1.length; i++) {
            text = text.replaceAll(arr1[i], arr2[i]);
            text = text.replaceAll(arr1[i].toUpperCase(), arr2[i].toUpperCase());
        }
        return text;
    },
    convertVietnameseToUnsign: function (str)
    {
       // Bảng chuyển đổi các ký tự có dấu thành không dấu
       const from = "àáạảãâầấậẩẫăắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơớờợởỡùúụủũưừứựửữỳýỵỷỹđ";
       const to = "aaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd";
       const fromArray = from.split('');
       const toArray = to.split('');

       str = str.toLowerCase();

       for (let i = 0; i < fromArray.length; i++)
       {
       str = str.replace(new RegExp(fromArray[i], 'g'), toArray[i]);
       }

       str = str.replace(/\s+/g, '-'); // Thay thế nhiều khoảng trắng thành 1 -
       return str.trim();
    }

}