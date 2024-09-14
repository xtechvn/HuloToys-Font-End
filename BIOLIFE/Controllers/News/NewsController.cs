using Microsoft.AspNetCore.Mvc;

namespace BIOLIFE.Controllers.News
{
    public class NewsController : Controller
    {
        [Route("tin-tuc")]
        public IActionResult Index()
        {
            return View();
        }


    }
}
