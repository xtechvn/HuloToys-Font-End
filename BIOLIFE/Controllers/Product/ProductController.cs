using BIOLIFE.Controllers.News.Service;
using BIOLIFE.Controllers.Product.Service;
using BIOLIFE.Models;
using BIOLIFE.Service.Redis;
using HuloToys_Front_End.Models.Products;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Telegram.Bot.Requests.Abstractions;

namespace BIOLIFE.Controllers.Product
{
    public class ProductController : Controller
    {
        private readonly IConfiguration configuration;
        private readonly RedisConn redisService;
        private readonly ProductsService productsService;
        public ProductController(IConfiguration _configuration, RedisConn _redisService)
        {
            configuration = _configuration;
            redisService = _redisService;
            productsService=new ProductsService(_configuration, redisService);
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
        public async Task<ActionResult> Detail(string title, string product_code)
        {
            ViewBag.ProductCode = product_code;
            return View();

        }

        [HttpGet("nganh-hang/{group_product_name}/{group_product_id}")]
        public async Task<ActionResult> getListGroupProduct(string group_product_name, int group_product_id)
        {
            try
            {                
                ViewBag.group_product_parent_id = group_product_id;
                return View("~/Views/Product/GroupProductList.cshtml");
            }
            catch (Exception ex)
            {
                return StatusCode(500); // Trả về lỗi 500 nếu có lỗi                
            }
        }
        public async Task<IActionResult> ProductDetail(ProductDetailRequestModel request)
        {
            var result = await productsService.GetProductDetail(request);

            return Ok(new
            {
                is_success = result != null,
                data = result
            });
        }
    }
}
