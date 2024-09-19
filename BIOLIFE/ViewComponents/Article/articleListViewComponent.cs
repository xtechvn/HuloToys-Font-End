using BIOLIFE.Controllers.News.Service;
using BIOLIFE.Models;
using BIOLIFE.Service.Redis;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System.Reflection;

namespace BIOLIFE.ViewComponents.Article
{
    public class ArticleListViewComponent : ViewComponent
    {
        private readonly IConfiguration configuration;
        private readonly RedisConn redisService;
        private readonly IMemoryCache _cache; // Inject IMemoryCache
        public ArticleListViewComponent(IConfiguration _Configuration, RedisConn _redisService, IMemoryCache cache)
        {
            configuration = _Configuration;
            redisService = _redisService;
            _cache = cache;
        }

        /// <summary>       
        /// type_view = 0 : box footer trang chủ | 1: box news
        /// zone_info: là 1 chuỗi json dựa vào đây để hiển thị tin theo cấu hình
        /// </summary>
        /// <returns>Load cac bai viet theo chuyen muc</returns>
        public async Task<IViewComponentResult?> InvokeAsync(CategoryConfigModel _zone_info) //(int category_id,int top,int type_view)
        {
            try
            {                
                var cacheKey = _zone_info.position_name + _zone_info.category_id; // Đặt khóa cho cache trên từng view
                if (!_cache.TryGetValue(cacheKey, out var cached_view)) // Kiểm tra xem có trong cache không
                {
                    var obj_cate = new NewsService(configuration, redisService);                   

                    switch (_zone_info.position_name)
                    {
                        case "top_story": // tin nổi bật
                        case "top_left": // tin nổi bật bên trái
                            cached_view = await obj_cate.getTopStory(_zone_info.top, _zone_info.skip);
                            break;
                        default:
                            // Tin theo chuyên mục
                            cached_view = await obj_cate.getArticleByCategoryId(_zone_info.category_id, _zone_info.top, _zone_info.skip);
                            break;
                    }
                    if (cached_view != null)
                    {
                        // Lưu vào cache với thời gian hết hạn dc set. 
                        _cache.Set(cacheKey, cached_view, TimeSpan.FromSeconds(20));
                    }
                }
                return cached_view != null ? View(_zone_info.view_name, cached_view) : Content("");                

            }
            catch (Exception ex)
            {
                string error_msg = Assembly.GetExecutingAssembly().GetName().Name + "->" + MethodBase.GetCurrentMethod().Name + "=>" + ex.Message;
                Utilities.LogHelper.InsertLogTelegramByUrl(configuration["log_telegram:token"], configuration["log_telegram:group_id"], error_msg);
                return Content("");
            }
        }
    }
}
