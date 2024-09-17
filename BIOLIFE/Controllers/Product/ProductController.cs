using BIOLIFE.Controllers.News.Service;
using BIOLIFE.Models;
using BIOLIFE.Service.Redis;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace BIOLIFE.Controllers.Product
{
    public class ProductController : Controller
    {
        private readonly IConfiguration configuration;
        private readonly RedisConn redisService;
        public ProductController(IConfiguration _configuration, RedisConn _redisService)
        {
            configuration = _configuration;
            redisService = _redisService;
        }
        /// <summary>
        ///Sản phẩm nổi bật

        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public IActionResult loadProductTopComponent(long group_product_id)
        {
            try
            {
                // var article_sv = new NewsService(configuration, redisService);
                // var article = await article_sv.getArticleDetailById(article_id);

                return ViewComponent("ProductList");
            }
            catch (Exception ex)
            {
                // Ghi log lỗi nếu cần
                //_logger.LogError(ex, "Error loading header component");
                return StatusCode(500); // Trả về lỗi 500 nếu có lỗi
            }
        }
        [HttpGet("san-pham/{title}-{product_code}.html")]
        public async Task<ActionResult> getProductDetail(string title, string product_code)
        {
            try
            {
                //var article_sv = new NewsService(configuration, redisService);
                //var article = await article_sv.getArticleDetailById(article_id);
                return View("~/Views/Product/Detail.cshtml");
            }
            catch (Exception ex)
            {
                return StatusCode(500); // Trả về lỗi 500 nếu có lỗi                
            }
        }

        [HttpGet("nganh-hang/{group_product_name}")]
        public async Task<ActionResult> getListGroupProduct(string group_product_name)
        {
            try
            {
                //var article_sv = new NewsService(configuration, redisService);
                //var article = await article_sv.getArticleDetailById(article_id);
                return View("~/Views/Product/GroupProductList.cshtml");
            }
            catch (Exception ex)
            {
                return StatusCode(500); // Trả về lỗi 500 nếu có lỗi                
            }
        }


    }
}
