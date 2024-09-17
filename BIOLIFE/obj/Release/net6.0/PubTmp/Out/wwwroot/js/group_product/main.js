$(document).ready(function () {
    
    product.bind_list_group_product();
    product.bind_list_product_top();
})

var product = {
    bind_list_product_top: function () { // bind box nhóm sản phẩm

        $.ajax({
            dataType: 'html',
            type: 'POST',
            url: '/home/loadProductTopComponent',
            data: { group_product_id: 15, _page_index: 0, page_size: 12 },
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
    bind_list_group_product: function () { // bind box nhóm sản phẩm
      
        $.ajax({
            dataType: 'html',
            type: 'POST', 
            url: '/home/loadGroupProductComponent',            
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

    }
}