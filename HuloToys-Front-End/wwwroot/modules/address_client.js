$(document).ready(function () {
    if ($('#address-book').length > 0) {
        address_client.Initialization()

    }
})
var address_client = {
    Initialization: function () {
        $('#address-receivername').html('')
        $('#address-phone').html('')
        $('#address').html('(Chưa chọn địa chỉ giao hàng)')
        sessionStorage.removeItem(STORAGE_NAME.AddressClient)

        if (!$('#address-book').hasClass('overlay')) {
            $('.menu-left-user .list-tab-menu .client-address').addClass('active')
            $('.menu-left-user .list-tab-menu .client-address').closest('.sub-menu').addClass('active')

        } else {
            $('#address-book .btn-confirm-address').show()

        }
        address_client.Detail()
        address_client.RenderProvinces()
        address_client.DynamicBind()
        $('#update-address .err').hide()
    },
    DynamicBind: function () {
        $("body").on('click', "#address-book .btn-update-address", function () {
            var element = $(this)
            var id = element.closest('.address-item').attr('data-id')
            address_client.CreateOrUpdateAddress(id)
        });
        $("body").on('click', "#address-book .list-add .item .defauld", function () {
            var element = $(this)
            $('#address-book .item').removeClass('active')
            $('#address-book .defauld').show()
            element.closest('.item').addClass('active')
            element.hide()
        });
        $("body").on('click', "#address-book .btn-add-address", function () {
            var element = $(this)
            address_client.CreateOrUpdateAddress('')

        });
        $("body").on('click', ".update-address-order", function () {
            if ($('#address-book').hasClass('overlay')) {
                $('#address-book').addClass('overlay-active')
            }

        });

        $("body").on('click', "#update-address .btn-save", function () {
            address_client.Confirm()
        });
        $("body").on('click', "#address-book .list-add .item", function () {
            var element = $(this)
            $('#address-book .list-add .item').removeClass('active')
            element.addClass('active')
        });
        $("body").on('select2:select', "#update-address .province select", function () {
            address_client.RenderDistrict()

        });
        $("body").on('select2:select', "#update-address .district select", function () {
            address_client.RenderWards()

        });
        $("body").on('click', "#update-address .btn-close", function () {
            if ($('#address-book').hasClass('overlay')) {
                $('#address-book').addClass('overlay-active')
            }

        });

    },
    DynamicConfirmAddress: function (callback) {
        $("body").on('click', "#update-address .btn-save", function () {
            var element = $(this)
            var selected_item = address_client.GetUpdatedAddress()

            callback(selected_item)

        });
        $("body").on('click', "#address-book .list-add .item", function () {
            var element = $(this)
            var id = element.attr('data-id')
            var item = address_client.GetSelectedAddress(id)
            callback(item)
        });
       
    },
    Detail: function (selected_id = undefined) {
        var usr = global_service.CheckLogin()
        if (usr == undefined || usr.token == undefined) {
            return
        }
       
        var request = {
            "token": usr.token
        }
        $.when(
            global_service.POST(API_URL.AddressList, request)
        ).done(function (result) {
            var html = ''

            if (result.is_success) {
                sessionStorage.setItem(STORAGE_NAME.AddressClient, JSON.stringify(result.data.list))
                if (selected_id != undefined) {
                    $(result.data.list).each(function (index, item) {
                        html += HTML_CONSTANTS.Address.GridItem
                            .replaceAll('{active}', (selected_id == item.id) ? 'active' : '')
                            .replaceAll('{id}', item.id)
                            .replaceAll('{default-address-style}', item.isactive == true ? 'display:none;' : '')
                            .replaceAll('{name}', item.receivername)
                            .replaceAll('{address}', address_client.RenderDetailAddress(item))
                            .replaceAll('{tel}', item.phone.trim())
                    });
                }
                else {
                    $(result.data.list).each(function (index, item) {
                        html += HTML_CONSTANTS.Address.GridItem
                            .replaceAll('{active}', item.isactive == true ? 'active' : '')
                            .replaceAll('{id}', item.id)
                            .replaceAll('{default-address-style}', item.isactive == true ? 'display:none;' : '')
                            .replaceAll('{name}', item.receivername)
                            .replaceAll('{address}', address_client.RenderDetailAddress(item))
                            .replaceAll('{tel}', item.phone==null?'': item.phone.trim())
                    });
                }
            }
            $('#address-book .list-add').html(html)
            $('#address-book .box-address').removeClass('placeholder')
            $('#address-book').removeClass('placeholder')
            $('.content-left-user').removeClass('placeholder')
        }).fail(function (jqXHR, textStatus) {
            $('#address-book .list-add').html('')
            $('#address-book .box-address').removeClass('placeholder')
            $('#address-book').removeClass('placeholder')
            $('.content-left-user').removeClass('placeholder')
        })

    },
    RenderDetailAddress: function (data) {
        var address_select = ''
        if (data.ward_detail != null && data.ward_detail != undefined && data.ward_detail.id != undefined) {
            address_select += data.ward_detail.name
        }
        if (data.district_detail != null && data.district_detail != undefined && data.district_detail.id != undefined) {
            if (address_select.trim() != '') address_select += ', '
            address_select += data.district_detail.name
        }
        if (data.province_detail != null && data.province_detail != undefined && data.province_detail.id != undefined) {
            if (address_select.trim() != '') address_select += ', '
            address_select += data.province_detail.name
        }

        return data.address + '<br /> ' + address_select
    },
    CreateOrUpdateAddress: function (id) {
        var overlay_box = false
        if ($('#address-book').hasClass('overlay')) {
            overlay_box=true
        }
        if (overlay_box) {
            $('#address-book').removeClass('overlay-active')
        }

        var usr = global_service.CheckLogin()
        if (usr == undefined || usr.token == undefined) {
            return
        }
        $('#update-address').attr('data-id', id)
        if (id != undefined && id.trim() != '') {
           

            var request = {
                "token": usr.token,
                "id": id
            }
            $.when(
                global_service.POST(API_URL.AddressDetail, request)
            ).done(function (result) {
                if (result.is_success) {
                    $('#update-address .err').hide()
                    var item = result.data
                    $('#update-address').addClass('overlay-active')
                    $('#update-address .user input').val(item.receivername)
                    $('#update-address .tel input').val(item.phone)
                   
                    $('#update-address .address input').val(item.address)
                    address_client.RenderProvinces(item.provinceid)
                    address_client.RenderDistrict(item.provinceid,item.districtid)
                    address_client.RenderWards(item.districtid,item.wardid)
                    //$('#update-address .province select').val(item.provinceid).trigger('change')
                    //$('#update-address .district select').val(item.districtid).trigger('change')
                    //$('#update-address .wards select').val(item.wardid).trigger('change')
                }
            })
        } else {
            $('#update-address').addClass('overlay-active')
            $('#update-address .title-popup').html('Thêm địa chỉ giao hàng mới')
            $('#update-address .btn-save').html('Thêm')
        }
    },
    RenderProvinces: function (selected_value = undefined) {
        var request = {
            "id": '-1'
        }
        $('#update-address .province select').html('')
        $.when(
            global_service.POST(API_URL.AddressProvince, request)
        ).done(function (result) {
            var html=''
            if (result.is_success) {
                $(result.data).each(function (index, item) {

                    html += HTML_CONSTANTS.Global.SelectOption
                        .replaceAll('{value}', item.provinceId)
                        .replaceAll('{name}', item.name)

                });
            }
            $('#update-address .province select').html(html)
            //try {
            //    $('#update-address .province select').select2("destroy");

            //} catch {

            //}
            global_service.Select2WithFixedOptionAndSearch($('#update-address .province select'))
            $('#update-address .province select').val(null).trigger('change')
            if (selected_value != undefined) {
                $('#update-address .province select').val(selected_value).trigger('change')

            }
        })
        global_service.Select2WithFixedOptionAndSearch($('#update-address .district select'))
        global_service.Select2WithFixedOptionAndSearch($('#update-address .wards select'))
        $('#update-address .district select').prop('disabled', true);
        $('#update-address .wards select').prop('disabled', true);
        $('#update-address .district').addClass('select2-disabled-background');
        $('#update-address .wards').addClass('select2-disabled-background')

    },
    RenderDistrict: function (selected_provinced = undefined, selected_value = undefined) {
        var request = {
            "id": $('#update-address .province select').find(':selected').val()
        }
        if (selected_provinced != undefined) {
            request = {
                "id": selected_provinced
            }
        }
        $('#update-address .district select').html('')
        $.when(
            global_service.POST(API_URL.AddressDistrict, request)
        ).done(function (result) {
            var html = ''
            if (result.is_success) {
                $(result.data).each(function (index, item) {

                    html += HTML_CONSTANTS.Global.SelectOption
                        .replaceAll('{value}', item.districtId)
                        .replaceAll('{name}', item.name)

                });
            }
            $('#update-address .district select').html(html)
            //try {
            //    $('#update-address .district select').select2("destroy");

            //} catch {

            //}
            global_service.Select2WithFixedOptionAndSearch($('#update-address .district select'))
            $('#update-address .district select').val(null).trigger('change')
            if (selected_value != undefined) {
                $('#update-address .district select').val(selected_value).trigger('change')

            }

        })
        $('#update-address .wards select').prop('disabled', true);
        $('#update-address .wards').addClass('select2-disabled-background')

        $('#update-address .district select').prop('disabled', false);
        $('#update-address .district').removeClass('select2-disabled-background');

    },
    RenderWards: function (selected_district = undefined, selected_value = undefined) {
        var request = {
            "id": $('#update-address .district select').find(':selected').val()
        }
        if (selected_district != undefined) {
            request = {
                "id": selected_district
            }
        }
        $('#update-address .wards select').html('')
        $.when(
            global_service.POST(API_URL.AddressWard, request)
        ).done(function (result) {
            var html = ''
            if (result.is_success) {
                $(result.data).each(function (index, item) {

                    html += HTML_CONSTANTS.Global.SelectOption
                        .replaceAll('{value}', item.wardId)
                        .replaceAll('{name}', item.name)

                });
            }
            $('#update-address .wards select').html(html)
            try {
                $('#update-address .wards select').select2("destroy");

            } catch {

            }
            global_service.Select2WithFixedOptionAndSearch($('#update-address .wards select'))
            $('#update-address .wards select').val(null).trigger('change')
            if (selected_value != undefined) {
                $('#update-address .wards select').val(selected_value).trigger('change')

            }

        })

        $('#update-address .wards select').prop('disabled', false);
        $('#update-address .wards').removeClass('select2-disabled-background');

    },
    Confirm: function () {
        var usr = global_service.CheckLogin()
        if (usr == undefined || usr.token == undefined) {
            return
        }
        var request = {
            "Id": $('#update-address').attr('data-id'),
            "token": usr.token,
            "ReceiverName": $('#update-address .user input').val(),
            "Phone": $('#update-address .tel input').val(),
            "ProvinceId": $('#update-address .province select').find(':selected').val(),
            "DistrictId": $('#update-address .district select').find(':selected').val(),
            "WardId": $('#update-address .wards select').find(':selected').val(),
            "Address": $('#update-address .address input').val(),
            "Status": 0,
            "IsActive": 0
        }
        var updated_item = address_client.GetUpdatedAddress()
        var list = sessionStorage.getItem(STORAGE_NAME.AddressClient)
        if (list) {
            var data = JSON.parse(list)
            if (data && data[0]) {
                var index = data.findIndex(obj => obj.id == updated_item.id);
                if (index >= 0) {
                    data[index] = updated_item
                }
                sessionStorage.setItem(STORAGE_NAME.AddressClient, data)
            }
        }
        $.when(
            global_service.POST(API_URL.UpdateAddress, request)
        ).done(function (result) {
            if (result.is_success) {
                $('#update-address').removeClass('overlay-active')

                //var overlay_box = false
                //if ($('#address-book').hasClass('overlay')) {
                //    overlay_box = true
                //}
                //if (overlay_box) {
                //    $('#address-book').addClass('overlay-active')
                //}
                setTimeout(() => {
                    address_client.Detail($('#update-address').attr('data-id'))
                }, 1000);

            }
        })
    },
    GetSelectedAddress: function (id) {
        var list= sessionStorage.getItem(STORAGE_NAME.AddressClient)
        if (list) {
            var data = JSON.parse(list)
            var selected = data.filter(obj => {
                return obj.id == id
            })
            return selected[0]
        }

    },
    GetUpdatedAddress: function () {
        var usr = global_service.CheckLogin()
        var request = {
            "id": $('#update-address').attr('data-id'),
            "token": usr.token,
            "receivername": $('#update-address .user input').val(),
            "phone": $('#update-address .tel input').val(),
            "provinceid": $('#update-address .province select').find(':selected').val(),
            "districtid": $('#update-address .district select').find(':selected').val(),
            "wardid": $('#update-address .wards select').find(':selected').val(),
            "address": $('#update-address .address input').val(),
            "status": 0,
            "isactive": 0,
            province_detail: {
                "id": $('#update-address .province select').find(':selected').val(),
                "provinceId": $('#update-address .province select').find(':selected').val(),

                name: $('#update-address .province select').find(':selected').text()
            },
            district_detail: {
                "id": $('#update-address .district select').find(':selected').val(),
                "districtId": $('#update-address .district select').find(':selected').val(),
                name: $('#update-address .district select').find(':selected').text()
            },
            ward_detail: {
                "id": $('#update-address .wards select').find(':selected').val(),
                "wardId": $('#update-address .wards select').find(':selected').val(),

                name: $('#update-address .wards select').find(':selected').text()
            },
        }
        return request
    }
}