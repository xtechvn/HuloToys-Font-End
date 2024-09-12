using Microsoft.AspNetCore.Mvc;

namespace BIOLIFE.Controllers.News
{
    public class NewsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
