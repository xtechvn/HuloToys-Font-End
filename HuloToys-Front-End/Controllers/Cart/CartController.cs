using HuloToys_Front_End.Controllers.Client.Business;
using HuloToys_Front_End.Models.Cart;
using HuloToys_Front_End.Models.Client;
using Microsoft.AspNetCore.Mvc;
using Models.APIRequest;

namespace HuloToys_Front_End.Controllers.Product
{

    public class CartController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly CartServices _cartServices;

        public CartController(IConfiguration configuration) {

            _configuration= configuration;
            _cartServices = new CartServices(configuration);

        }
        public async Task<ActionResult> Index()
        {
            return View();

        }
        public async Task<IActionResult> CartCount(CartGeneralRequestModel request)
        {
            var result = await _cartServices.GetCartCount(request);

            return Ok(new
            {
                is_success = result != null,
                data = result
            });
        }
        public async Task<IActionResult> AddToCart(AddToCartRequestModel request)
        {
            var result = await _cartServices.AddToCart(request);

            return Ok(new
            {
                is_success = result != null,
                data = result
            });
        }
        public async Task<IActionResult> GetList(CartGeneralRequestModel request)
        {
            var result = await _cartServices.GetList(request);

            return Ok(new
            {
                is_success = result != null,
                data = result
            });
        }  
        public async Task<IActionResult> Delete(CartDeleteRequestModel request)
        {
            var result = await _cartServices.Delete(request);

            return Ok(new
            {
                is_success = result >-1,
                data = result
            });
        }
       
    }
}
