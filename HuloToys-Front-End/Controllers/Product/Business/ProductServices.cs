using HuloToys_Front_End.Utilities.Lib;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using HuloToys_Front_End.Utilities.Contants;
using HuloToys_Front_End.Models.Products;
using HuloToys_Front_End.Models.Raiting;

namespace HuloToys_Front_End.Controllers.Client.Business
{
    public class ProductServices :APIService
    {
        private readonly IConfiguration _configuration;
        public ProductServices(IConfiguration configuration) :base(configuration) {
            _configuration = configuration;
        }
        public async Task<ProductDetailResponseModel> GetProductDetail(ProductDetailRequestModel request)
        {
            try
            {

                var result = await POST(_configuration["API:get_product_detail"], request);
                var jsonData = JObject.Parse(result);
                var status = int.Parse(jsonData["status"].ToString());

                if (status == (int)ResponseType.SUCCESS)
                {
                    return JsonConvert.DeserializeObject<ProductDetailResponseModel>(jsonData["data"].ToString());
                }
            }
            catch
            {
            }
            return null;

        }
        public async Task<ProductListResponseModel> GetProductList(ProductListRequestModel request)
        {
            try
            {
                var result = await POST(_configuration["API:get_product_list"], request);
                var jsonData = JObject.Parse(result);
                var status = int.Parse(jsonData["status"].ToString());

                if (status == (int)ResponseType.SUCCESS)
                {
                    return JsonConvert.DeserializeObject<ProductListResponseModel>(jsonData["data"].ToString());
                }
            }
            catch
            {
            }
            return null;

        }
        public async Task<ProductListResponseModel> Search(ProductGlobalSearchRequestModel request)
        {
            try
            {
                var result = await POST(_configuration["API:product_search"], request);
                var jsonData = JObject.Parse(result);
                var status = int.Parse(jsonData["status"].ToString());

                if (status == (int)ResponseType.SUCCESS)
                {
                    return JsonConvert.DeserializeObject<ProductListResponseModel>(jsonData["data"].ToString());
                }
            }
            catch
            {
            }
            return null;

        }
        public async Task<ProductRaitingResponseModel> RaitingCount(ProductRaitingRequestModel request)
        {
            try
            {
                var result = await POST(_configuration["API:product_raiting_count"], request);
                var jsonData = JObject.Parse(result);
                var status = int.Parse(jsonData["status"].ToString());

                if (status == (int)ResponseType.SUCCESS)
                {
                    return JsonConvert.DeserializeObject<ProductRaitingResponseModel>(jsonData["data"].ToString());
                }
            }
            catch
            {
            }
            return null;

        }
        public async Task<ProductRaitingResponseModel> Raiting(ProductRaitingRequestModel request)
        {
            try
            {
                var result = await POST(_configuration["API:product_raiting"], request);
                var jsonData = JObject.Parse(result);
                var status = int.Parse(jsonData["status"].ToString());

                if (status == (int)ResponseType.SUCCESS)
                {
                    return JsonConvert.DeserializeObject<ProductRaitingResponseModel>(jsonData["data"].ToString());
                }
            }
            catch
            {
            }
            return null;

        } 
        
    }
}
