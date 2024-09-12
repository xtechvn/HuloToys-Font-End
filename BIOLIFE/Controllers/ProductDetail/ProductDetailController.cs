using Microsoft.AspNetCore.Mvc;

namespace BIOLIFE.Controllers.ProductDetail
{
    public class ProductDetailController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
