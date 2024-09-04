using HuloToys_Front_End.Utilities.Lib;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using HuloToys_Front_End.Utilities.Contants;
using HuloToys_Front_End.Models.Cart;
using Models.MongoDb;
using Models.APIRequest;
using HuloToys_Front_End.Models.Orders;

namespace HuloToys_Front_End.Controllers.Client.Business
{
    public class CartServices :APIService
    {
        private readonly IConfiguration _configuration;
        public CartServices(IConfiguration configuration) :base(configuration) {
            _configuration = configuration;
        }
       
       
        public async Task<int> AddToCart(AddToCartRequestModel request)
        {
            try
            {
                var result = await POST(_configuration["API:add_to_cart"], request);
                var jsonData = JObject.Parse(result);
                var status = int.Parse(jsonData["status"].ToString());

                if (status == (int)ResponseType.SUCCESS)
                {
                    return Convert.ToInt32(jsonData["data"].ToString());
                }
            }
            catch
            {
            }
            return -1;

        }
        public async Task<int> GetCartCount(CartGeneralRequestModel request)
        {
            try
            {
                var result = await POST(_configuration["API:cart_count"], request);
                var jsonData = JObject.Parse(result);
                var status = int.Parse(jsonData["status"].ToString());

                if (status == (int)ResponseType.SUCCESS)
                {
                    return Convert.ToInt32(jsonData["data"].ToString());
                }
            }
            catch
            {
            }
            return 0;

        }
        public async Task<List<CartItemMongoDbModel>> GetList(CartGeneralRequestModel request)
        {
            try
            {
                var result = await POST(_configuration["API:cart_get_list"], request);
                var jsonData = JObject.Parse(result);
                var status = int.Parse(jsonData["status"].ToString());

                if (status == (int)ResponseType.SUCCESS)
                {
                    return JsonConvert.DeserializeObject<List<CartItemMongoDbModel>>(jsonData["data"].ToString());
                }
            }
            catch
            {
            }
            return null;

        } 
        public async Task<int> Delete(CartDeleteRequestModel request)
        {
            try
            {
                var result = await POST(_configuration["API:cart_delete"], request);
                var jsonData = JObject.Parse(result);
                var status = int.Parse(jsonData["status"].ToString());
                return status;
               
            }
            catch
            {
            }
            return -1;

        } 
        
    }
}
