using HuloToys_Front_End.Controllers.Client.Business;
using HuloToys_Front_End.Models.Cart;
using Microsoft.AspNetCore.Mvc;
using Models.APIRequest;
using Models.MongoDb;

namespace HuloToys_Front_End.Controllers.Product
{

    public class OrderController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly OrderServices _orderServices;

        public OrderController(IConfiguration configuration) {

            _configuration= configuration;
            _orderServices = new OrderServices(configuration);

        }
        public async Task<ActionResult> Index()
        {
            return View();

        }
        public async Task<ActionResult> Payment(string id)
        {
            ViewBag.Id = id;
            return View();

        }
        public async Task<IActionResult> Listing(OrderHistoryRequestModel request)
        {
            var result = await _orderServices.Listing(request);

            return Ok(new
            {
                is_success = result != null,
                data = result
            });
        }
        public async Task<IActionResult> detail(OrdersGeneralRequestModel request)
        {
            var result = await _orderServices.GetDetail(request);

            return Ok(new
            {
                is_success = result != null,
                data = result
            });
        }
        public async Task<IActionResult> Confirm(CartConfirmRequestModel request)
        {
            var result = await _orderServices.Confirm(request);

            return Ok(new
            {
                is_success = result != null,
                data = result
            });
        }
        public async Task<IActionResult> QRCode(OrderGeneralRequestModel request)
        {
            var result = await _orderServices.QRCode(request);

            return Ok(new
            {
                is_success = result != null,
                data = result
            });
        }
    }
}
