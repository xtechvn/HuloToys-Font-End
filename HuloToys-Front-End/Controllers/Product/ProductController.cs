using HuloToys_Front_End.Controllers.Client.Business;
using HuloToys_Front_End.Models.Client;
using HuloToys_Front_End.Models.Products;
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
        public async Task<ActionResult> Detail(string product_code, string title)
        {
            try
            {
               
                var result = await _productServices.GetProductDetail(new Models.Products.ProductDetailRequestModel()
                {
                    id= product_code
                });
                if(result!=null && result._id !=null)
                {
                    ViewBag.Product=result;
                    return View();
                }
            }
            catch {}
            return Redirect("/Error");

        }
        public async Task<IActionResult> Detail(ProductDetailRequestModel request)
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

    }
}
