$(document).ready(function () {
    
    header.bind_menu();

})
$(document.body).on('click', '.menu_group_product', function (e) {

    var group_product_id = $(this).data('groupproduct');
    var view_name = "~/Views/Shared/Components/Product/ProductListViewComponent.cshtml";
    var skip = 0;
    var take = total_product;
    var div_location_render_data = ".component-product-list";
    var location_type = "HOME";
    history.pushState(null, null, "/product?group_id=" + group_product_id); // Thay đổi đường dẫn mà không tải lại trang

    group_product.render_product_list(group_product_id, div_location_render_data, view_name, skip, take, location_type);
});
var header = {
    bind_menu: function () {
      
        $.ajax({
            dataType: 'html', // Nếu bạn trả về HTML
            type: 'POST', // Hoặc 'POST' nếu controller là POST
            url: '/home/loadHeaderComponent',
            success: function (data) {
               
                $('#header-container').html(data);
            },
            error: function (xhr, status, error) {
                console.log("Error: " + error); // Thay đổi từ 'failure' sang 'error'
            }
        });

    }
}