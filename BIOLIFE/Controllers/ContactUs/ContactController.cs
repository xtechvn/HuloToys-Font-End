using Microsoft.AspNetCore.Mvc;

namespace BIOLIFE.Controllers.ContactUs
{
    public class ContactController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
