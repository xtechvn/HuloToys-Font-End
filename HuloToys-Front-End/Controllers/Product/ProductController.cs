using HuloToys_Front_End.Controllers.Client.Business;
using HuloToys_Front_End.Models.Client;
using HuloToys_Front_End.Models.Products;
using HuloToys_Front_End.Models.Raiting;
using HuloToys_Front_End.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace HuloToys_Front_End.Controllers.Product
{

    public class ProductController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly ProductServices _productServices;

        public ProductController(IConfiguration configuration) {

            _configuration= configuration;
            _productServices = new ProductServices(configuration);

        }
        public ActionResult Detail(string product_code, string title)
        {
            ViewBag.ProductCode = product_code;
            return View();

        }
        public async Task<IActionResult> ProductDetail(ProductDetailRequestModel request)
        {
            var result = await _productServices.GetProductDetail(request);

            return Ok(new
            {
                is_success = result != null,
                data = result
            });
        }
       
        public async Task<IActionResult> GetList(ProductListRequestModel request)
        {
            var result = await _productServices.GetProductList(request);
            if (result != null && result.items != null && result.items.Count > 0)
            {
                return Ok(new
                {
                    is_success = true,
                    data = result.items,
                    count=result.count
                });
            }
            else
            {
                return Ok(new
                {
                    is_success = false
                });
            }

        }
        public async Task<IActionResult> Search(ProductGlobalSearchRequestModel request)
        {
            var result = await _productServices.Search(request);

            return Ok(new
            {
                is_success = result != null,
                data = result
            });
        }
        public async Task<IActionResult> RaitingPaging(PagingFeViewModel request)
        {

            return View("~/Views/Shared/Components/Paging/Default.cshtml", request);
        }
        public async Task<IActionResult> RaitingCount(ProductRaitingRequestModel request)
        {
            var result = await _productServices.RaitingCount(request);

            return Ok(new
            {
                is_success = result != null,
                data = result
            });
        }
        public async Task<IActionResult> ReviewComment(ProductRaitingRequestModel request)
        {
            var result = await _productServices.Raiting(request);
            return View(result);

        }

    }
}
