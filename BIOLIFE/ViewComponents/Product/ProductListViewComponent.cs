using BIOLIFE.Controllers.Home.Service;
using BIOLIFE.Controllers.Product.Service;
using BIOLIFE.Service.Redis;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace BIOLIFE.ViewComponents.Product
{
    public class ProductListViewComponent: ViewComponent
    {
        private readonly IConfiguration configuration;
        private readonly RedisConn _redisService;
        private readonly IMemoryCache _cache; // Inject IMemoryCache
        public ProductListViewComponent(IConfiguration _Configuration, RedisConn redisService, IMemoryCache cache)
        {
            configuration = _Configuration;
            _redisService = redisService;
            _cache = cache;
        }

        /// <summary>
        // load ra data sản phẩm theo nhóm
        /// </summary>
        /// <returns>group_product_id: id của nhóm</returns>
        public async Task<IViewComponentResult?> InvokeAsync(int _group_product_id, int _page_index, int _page_size, string view_name)
        {
            try
            {
                // Nếu không có trong cache, gọi dịch vụ
                var cacheKey = "product_list_" + _group_product_id; // Đặt khóa cho cache
                if (!_cache.TryGetValue(cacheKey, out var cached_view)) // Kiểm tra xem có trong cache không
                {
                    var objMenu = new ProductsService(configuration, _redisService);
                    cached_view = await objMenu.getProductListByGroupProductId(_group_product_id, _page_index, _page_size);
                    if (cached_view != null)
                    {
                        // Lưu vào cache với thời gian hết hạn 
                        _cache.Set(cacheKey, cached_view, TimeSpan.FromSeconds(10));
                    }
                }
                return View(view_name, cached_view);
            }
            catch (Exception)
            {
                return Content("");
            }
        }
    }
}
