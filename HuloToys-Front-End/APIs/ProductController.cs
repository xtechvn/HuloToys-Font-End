using Entities.ViewModels;
using HuloToys_Front_End.Controllers.Client.Business;
using HuloToys_Front_End.Models.Client;
using HuloToys_Front_End.Models.Products;
using HuloToys_Front_End.Utilities.Lib;
using LIB.Models.APIRequest;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace HuloToys_Front_End.Controllers.API
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly ProductServices _productServices;
        public ProductController(IConfiguration configuration) {

            _configuration= configuration;
            _productServices = new ProductServices(configuration);
        }
        [HttpPost]
        [Route("detail")]
        public async Task<IActionResult> Detail(ProductDetailRequestModel request)
        {
            var result = await _productServices.GetProductDetail(request);
           
            return new JsonResult(new
            {
                is_success = result != null,
                data = result
            });
        }
        [HttpPost]
        [Route("list")]
        public async Task<IActionResult> GetList(ProductListRequestModel request)
        {
            var result = await _productServices.GetProductList(request);
            if (result != null && result.obj_lst_product_result != null&& result.obj_lst_product_result.Count>0) {
                return new JsonResult(new
                {
                    is_success = true,
                    data = result.obj_lst_product_result
                });
            }
            else
            {
                return new JsonResult(new
                {
                    is_success = false
                });
            }
           
        }
    }
}
