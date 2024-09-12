using Microsoft.AspNetCore.Mvc;

namespace BIOLIFE.Controllers.ProductList
{
    public class ProductListController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
