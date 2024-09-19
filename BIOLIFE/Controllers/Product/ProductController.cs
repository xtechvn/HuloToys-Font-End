using BIOLIFE.Controllers.News.Service;
using BIOLIFE.Controllers.Product.Service;
using BIOLIFE.Models;
using BIOLIFE.Service.Redis;
using BIOLIFE.Models.Products;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Telegram.Bot.Requests.Abstractions;
using Microsoft.Extensions.Caching.Memory;

namespace BIOLIFE.Controllers.Product
{
    public class ProductController : Controller
    {
        private readonly IConfiguration configuration;
        private readonly RedisConn redisService;
        private readonly ProductsService productsService;
        private readonly IMemoryCache _cache; // Inject IMemoryCache

        public ProductController(IConfiguration _configuration, RedisConn _redisService, IMemoryCache cache)
        {
            configuration = _configuration;
            redisService = _redisService;
            productsService=new ProductsService(_configuration, redisService);
            _cache = cache;

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
        public async Task<IActionResult> ProductDetail(ProductDetailRequestModel request)
        {
            var result = await productsService.GetProductDetail(request);
            // Nếu không có trong cache, gọi dịch vụ
            var cacheKey = "product_detail_" + request.id; // Đặt khóa cho cache
            if (!_cache.TryGetValue(cacheKey, out var cached_view)) // Kiểm tra xem có trong cache không
            {
                cached_view = await productsService.GetProductDetail(request);
                if (cached_view != null)
                {
                    // Lưu vào cache với thời gian hết hạn 
                    _cache.Set(cacheKey, cached_view, TimeSpan.FromSeconds(60));
                }
            }

            return View(cached_view);
        }
        public async Task<IActionResult> GetProductDetail(ProductDetailRequestModel request)
        {
            // Nếu không có trong cache, gọi dịch vụ
            var cacheKey = "product_detail_" + request.id; // Đặt khóa cho cache
            if (!_cache.TryGetValue(cacheKey, out var cached_view)) // Kiểm tra xem có trong cache không
            {
                cached_view = await productsService.GetProductDetail(request);
                if (cached_view != null)
                {
                    // Lưu vào cache với thời gian hết hạn 
                    _cache.Set(cacheKey, cached_view, TimeSpan.FromSeconds(60));
                }
            }

            return Ok(new
            {
                is_success = cached_view != null,
                data = cached_view
            });
        }
    }
}
