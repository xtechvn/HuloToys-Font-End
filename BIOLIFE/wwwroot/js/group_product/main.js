$(document).ready(function () {
    
    product.bind_list_group_product();
    product.bind_list_product_top();
    product.bind_list_group_product_left();
    product.bind_list_product_bottom_top();
})

var product = {
    bind_list_product_top: function () { // bind box nhóm sản phẩm nổi bật trang home

        $.ajax({
            dataType: 'html',
            type: 'POST',
            url: '/home/loadProductTopComponent',
            data: { group_product_id: 31, _page_index: 0, page_size: 12, view_name: "~/Views/Shared/Components/Product/BoxProductTopList.cshtml" },
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
            data: { group_product_id: 31, _page_index: 0, page_size: 12, view_name: "~/Views/Shared/Components/Product/BoxProductBottomRight.cshtml" },
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
    bind_list_group_product_left: function () { // bind box nhóm danh mục ngành hàng vị trí left 

        $.ajax({
            dataType: 'html',
            type: 'POST',
            url: '/home/loadGroupProductLeftComponent',            
            success: function (data) {
                $('#group-product-left').html(data);
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
}