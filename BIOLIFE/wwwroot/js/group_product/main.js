$(document).ready(function () {
    
    group_product.bind_list();
})

var group_product = {
    bind_list: function () {
      
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