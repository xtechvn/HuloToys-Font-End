using BIOLIFE.Controllers.Home.Service;
using BIOLIFE.Service.Redis;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace BIOLIFE.ViewComponents.GroupProduct
{
    public class GroupProductViewComponent : ViewComponent
    {
        private readonly IConfiguration configuration;
        private readonly RedisConn _redisService;
        private readonly IMemoryCache _cache; // Inject IMemoryCache
        public GroupProductViewComponent(IConfiguration _Configuration, RedisConn redisService, IMemoryCache cache)
        {
            configuration = _Configuration;
            _redisService = redisService;
            _cache = cache;
        }

        /// <summary>
        // nhom san pham vị trí giữa trang
        /// </summary>
        /// <returns></returns>
        public async Task<IViewComponentResult?> InvokeAsync()
        {
            try
            {
                // Nếu không có trong cache, gọi dịch vụ
                var cacheKey = "group_product"; // Đặt khóa cho cache
                if (!_cache.TryGetValue(cacheKey, out var cached_view)) // Kiểm tra xem có trong cache không
                {
                    var objMenu = new MenuService(configuration, _redisService);
                    cached_view = await objMenu.getListMenu(Convert.ToInt32(configuration["menu:group_product_parent_id"]));
                    if (cached_view != null)
                    {
                        // Lưu vào cache với thời gian hết hạn 60 giây
                        _cache.Set(cacheKey, cached_view, TimeSpan.FromSeconds(60));
                    }
                }
                return View(cached_view);
            }
            catch (Exception)
            {
                return Content("");
            }
        }
    }
}
