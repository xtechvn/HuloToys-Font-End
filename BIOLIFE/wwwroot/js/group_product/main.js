$(document).ready(function () {
    
    group_product.bind_list_group_product();
    group_product.bind_list_product_top();
    group_product.bind_list_menu_product(); // danh mục sản phẩm trang chủ bên trái /Home
    group_product.bind_list_product_bottom_top();


    // Page load render data by group product id
    var view_name = "~/Views/Shared/Components/Product/ProductListViewComponent.cshtml";
    var skip = 0;
    var take = 12;
    var div_location_render_data = ".component-product-list";
    var location_type = "CATEGORY";    
    group_product.render_product_list(-1, div_location_render_data, view_name, skip, take, location_type);
      
})
$(document.body).on('click', '.menu_group_product', function (e) {

    var group_product_id = $(this).data('groupproduct');
    var view_name = "~/Views/Shared/Components/Product/ProductListViewComponent.cshtml";
    var skip = 0;
    var take = 12;
    var div_location_render_data = ".component-product-list";
    var location_type = "HOME";
    group_product.render_product_list(group_product_id, div_location_render_data, view_name, skip, take, location_type);
});


var group_product = {

    render_product_list: function (group_product_id, div_location_render_data, view_name, skip, take, location_type) { //render data sản phẩm theo ngành hàng call ajax
       
        if (location_type == "HOME") {

        } else if (location_type == "CATEGORY") { // Page ngành hàng
            group_product_id = $("#group_product_parent_id").val() == undefined ? -1 : parseInt($("#group_product_parent_id").val()); // load theo chuyen trang        
        }
        $.ajax({
            dataType: 'html',
            type: 'POST',
            url: '/home/loadProductTopComponent',
            data: { group_product_id: group_product_id, _page_index: skip, page_size: take, view_name: view_name },
            success: function (data) {
                $(div_location_render_data).html(data);
            },
            error: function (xhr, status, error) {
                console.log("Error: " + error); // Thay đổi từ 'failure' sang 'error'
            }
        });
    },
    bind_list_product_top: function () { // bind box nhóm sản phẩm nổi bật trang home

        $.ajax({
            dataType: 'html',
            type: 'POST',
            url: '/home/loadProductTopComponent',
            data: { group_product_id: 54, _page_index: 0, page_size: 12, view_name: "~/Views/Shared/Components/Product/BoxProductTopList.cshtml" },
            success: function (data) {
                $('#product-top-list').html(data);                
                const swiperFlash = new Swiper('.section-flashsale .product-slide', {
                    loop: false,
                    pagination: false,
                    navigation: false,
                    spaceBetween: 15,
                    slidesPerView: 1.5,
                    breakpoints: {
                        540: {
                            slidesPerView: 2.5,
                        },
                        768: {
                            slidesPerView: 3.5,
                        },
                        1024: {
                            slidesPerView: 4.5,
                        },
                        1400: {
                            slidesPerView: 5,
                        }
                    }
                });
            },
            error: function (xhr, status, error) {
                console.log("Error: " + error); // Thay đổi từ 'failure' sang 'error'
            }
        });
    },
    bind_list_product_bottom_top: function () { // bind box nhóm sản phẩm nổi bật trang home

        $.ajax({
            dataType: 'html',
            type: 'POST',
            url: '/home/loadProductTopComponent',
            data: { group_product_id: 54, _page_index: 0, page_size: 12, view_name: "~/Views/Shared/Components/Product/BoxProductBottomRight.cshtml" },
            success: function (data) {
                $('#group-product-bottom-left').html(data);
                const swiperFlash = new Swiper('.section-flashsale .product-slide', {
                    loop: false,
                    pagination: false,
                    navigation: false,
                    spaceBetween: 15,
                    slidesPerView: 1.5,
                    breakpoints: {
                        540: {
                            slidesPerView: 2.5,
                        },
                        768: {
                            slidesPerView: 3.5,
                        },
                        1024: {
                            slidesPerView: 4.5,
                        },
                        1400: {
                            slidesPerView: 5,
                        }
                    }
                });
                $('select').each(function () {
                    var $this = $(this), numberOfOptions = $(this).children('option').length;

                    $this.addClass('select-hidden');
                    $this.wrap('<div class="select"></div>');
                    $this.after('<div class="select-styled"></div>');

                    var $styledSelect = $this.next('div.select-styled');
                    $styledSelect.text($this.children('option').eq(0).text());

                    var $list = $('<ul />', {
                        'class': 'select-options'
                    }).insertAfter($styledSelect);

                    for (var i = 0; i < numberOfOptions; i++) {
                        $('<li />', {
                            text: $this.children('option').eq(i).text(),
                            rel: $this.children('option').eq(i).val()
                        }).appendTo($list);
                        if ($this.children('option').eq(i).is(':selected')) {
                            $('li[rel="' + $this.children('option').eq(i).val() + '"]').addClass('is-selected')
                        }
                    }

                    var $listItems = $list.children('li');

                    $styledSelect.click(function (e) {
                        e.stopPropagation();
                        $('div.select-styled.active').not(this).each(function () {
                            $(this).removeClass('active').next('ul.select-options').hide();
                        });
                        $(this).toggleClass('active').next('ul.select-options').toggle();
                    });

                    $listItems.click(function (e) {
                        e.stopPropagation();
                        $styledSelect.text($(this).text()).removeClass('active');
                        $this.val($(this).attr('rel'));
                        $list.find('li.is-selected').removeClass('is-selected');
                        $list.find('li[rel="' + $(this).attr('rel') + '"]').addClass('is-selected');
                        $list.hide();
                    });

                    $(document).click(function () {
                        $styledSelect.removeClass('active');
                        $list.hide();
                    });
                });
            },
            error: function (xhr, status, error) {
                console.log("Error: " + error); // Thay đổi từ 'failure' sang 'error'
            }
        });
    },
    bind_list_group_product: function () { // bind box nhóm menu sản phẩm vị trí top
      
        $.ajax({
            dataType: 'html',
            type: 'POST', 
            url: '/home/loadGroupProductComponent',       
            //data: { group_product_id: 15, _page_index: 0, page_size: 12 },
            success: function (data) {
                $('#group-product-top').html(data);
                const swiperADS = new Swiper('.banner-cat', {
                    loop: false,
                    pagination: false,
                    navigation: false,
                    slidesPerView: 1.5,
                    spaceBetween: 8,
                    breakpoints: {
                        540: {
                            slidesPerView: 1.5,
                        },
                        768: {
                            slidesPerView: 2.5,
                        },
                        992: {
                            slidesPerView: 4,
                        }
                    }
                });
            },
            error: function (xhr, status, error) {
                console.log("Error: " + error); // Thay đổi từ 'failure' sang 'error'
            }
        });

    },
    //location_dom: vị trí cần render data
    //group_product_parent_id:  id của menu cha cho phần danh mục sản phẩm
    bind_list_menu_product: function () { // bind box nhóm danh mục ngành hàng vị trí left 
        
        var group_product_parent_id = $("#group_product_parent_id").val() == undefined ? -1 : parseInt($("#group_product_parent_id").val()); // load theo chuyen trang
        var div_location_render_data = "";
      //  alert($("#group_product_parent_id").val());
        if (group_product_parent_id == -1) {           
            group_product_parent_id = 32;   //Load danh muc trang chu
            div_location_render_data = "#group-product-left";
            swiper_name = ".banner-cat";
        } else {
            // Load động danh mục trang chuyên mục            
            div_location_render_data = "#group-product-left";
            swiper_name = ".banner-cat";
        }
        
        $.ajax({
            dataType: 'html',
            type: 'POST',
            url: '/home/loadGroupProductLeftComponent',            
            data: { group_product_parent_id: group_product_parent_id }, 
            success: function (data) { // render ra các chuyên mục con
                $(div_location_render_data).html(data);
                const swiperADS = new Swiper(swiper_name, {
                    loop: false,
                    pagination: false,
                    navigation: false,
                    slidesPerView: 1.5,
                    spaceBetween: 8,
                    breakpoints: {
                        540: {
                            slidesPerView: 1.5,
                        },
                        768: {
                            slidesPerView: 2.5,
                        },
                        992: {
                            slidesPerView: 4,
                        }
                    }
                });
            },
            error: function (xhr, status, error) {
                console.log("Error: " + error); // Thay đổi từ 'failure' sang 'error'
            }
        });
    }
   
    
}