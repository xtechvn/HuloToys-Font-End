using HuloToys_Front_End.Controllers.Client.Business;
using HuloToys_Front_End.Models.Client;
using HuloToys_Front_End.Models.Products;
using Microsoft.AspNetCore.Mvc;

namespace HuloToys_Front_End.Controllers.Product
{

    public class OrderController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly ProductServices _productServices;

        public OrderController(IConfiguration configuration) {

            _configuration= configuration;
            _productServices = new ProductServices(configuration);

        }
       
        public async Task<ActionResult> Payment()
        {
            return View();

        }
        
    }
}
