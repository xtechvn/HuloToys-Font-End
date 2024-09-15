using BIOLIFE.ViewComponents.Header;
using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;

namespace BIOLIFE.Controllers.Home
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IServiceProvider _serviceProvider;

        public HomeController(ILogger<HomeController> logger, IServiceProvider serviceProvider)
        {
            _logger = logger;
            _serviceProvider = serviceProvider;
        }

        public IActionResult Index()
        {
            return View();
        }
        [Route("san-pham")]
        [HttpGet]
        public async Task<IActionResult> Product()
        {
            return View();
        }

        [Route("lien-he")]
        [HttpGet]
        public async Task<IActionResult> Contact()
        {
            return View();
        }

        [Route("gioi-thieu")]
        [HttpGet]
        public async Task<IActionResult> Intro()
        {
            return View();
        }

        [HttpPost]
        public IActionResult loadHeaderComponent()
        {
            try
            {
                // Gọi ViewComponent trực tiếp và trả về kết quả
                return ViewComponent("Header");
            }
            catch (Exception ex)
            {
                // Ghi log lỗi nếu cần
                _logger.LogError(ex, "Error loading header component");
                return StatusCode(500); // Trả về lỗi 500 nếu có lỗi
            }
        }
        [HttpPost]
        public IActionResult loadFooterComponent()
        {
            try
            {
                // Gọi ViewComponent trực tiếp và trả về kết quả
                return ViewComponent("Footer");
            }
            catch (Exception ex)
            {
                // Ghi log lỗi nếu cần
                _logger.LogError(ex, "Error loading header component");
                return StatusCode(500); // Trả về lỗi 500 nếu có lỗi
            }
        }
        [HttpPost]
        public IActionResult loadGroupProductComponent()
        {
            try
            {
                // Gọi ViewComponent trực tiếp và trả về kết quả
                return ViewComponent("GroupProduct");
            }
            catch (Exception ex)
            {
                // Ghi log lỗi nếu cần
                _logger.LogError(ex, "Error loading GroupProduct");
                return StatusCode(500); // Trả về lỗi 500 nếu có lỗi
            }
        }
    }
}