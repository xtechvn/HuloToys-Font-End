using BIOLIFE.Controllers.News.Service;
using BIOLIFE.Models;
using BIOLIFE.Service.Redis;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace BIOLIFE.Controllers.News
{
    public class NewsController : Controller
    {
        private readonly IConfiguration configuration;
        private readonly RedisConn redisService;
        public NewsController(IConfiguration _configuration, RedisConn _redisService)
        {
            configuration = _configuration;
            redisService = _redisService;
        }
        // Layout trang chủ news dùng chung với trang Category cấp 2
        [Route("tin-tuc")]        
        [HttpGet]
        public async Task<IActionResult> Index(string path, string category_path_child = "", int category_id = 39)
        {
            ViewBag.category_id = category_id;
            return View();
        }

        [Route("tin-tuc/{category_path_child}/{category_id}")]
        [HttpGet]
        public async Task<IActionResult> Category(string path, string category_path_child, int category_id)
        {
            ViewBag.category_id = category_id;
            // Chung view với trang chủ news
            return View("~/Views/News/Index.cshtml");
        }

        [Route("{title}-{article_id}.html")]
        [HttpGet]
        public async Task<IActionResult> ArticleDetail(string title, long article_id)
        {
            var article_sv = new NewsService(configuration, redisService);
            var article = await article_sv.getArticleDetailById(article_id);
            return View("~/Views/News/ArticleDetail.cshtml", article);
        }

        

        /// <summary>
        /// Lấy ra các bài viết mới nhất của các chuyên mục
        /// </summary>
        /// <param name="category_id">-1 là quét all các bài viết của các mục, >0 lấy theo chuyên mục</param>
        /// <param name="position_name">Vị trí cần bind data</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> loadTopStoryComponent(int category_id, string position_name)
        {
            try
            {
                var model = new CategoryConfigModel
                {
                    category_id = category_id,
                    skip = Convert.ToInt32(configuration["blognews:" + position_name + ":skip"]),
                    top = Convert.ToInt32(configuration["blognews:" + position_name + ":top"]),
                    view_name = configuration["blognews:" + position_name + ":view_name"].ToString(),
                    position_name = position_name
                };
                return ViewComponent("ArticleList", model);
            }
            catch (Exception ex)
            {
                // Ghi log lỗi nếu cần
                //_logger.LogError(ex, "Error loading header component");
                return StatusCode(500); // Trả về lỗi 500 nếu có lỗi
            }
        }

    }
}
