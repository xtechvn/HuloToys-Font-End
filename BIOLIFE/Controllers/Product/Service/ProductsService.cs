using BIOLIFE.Contants;
using BIOLIFE.Models;
using BIOLIFE.Service.Redis;
using BIOLIFE.Utilities;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace BIOLIFE.Controllers.Product.Service
{  
    public class ProductsService
    {
        private readonly IConfiguration configuration;
        private readonly RedisConn redisService;
        public ProductsService(IConfiguration _configuration, RedisConn _redisService)
        {
            configuration = _configuration;
            redisService = _redisService;
        }

        /// <summary>
        /// Load danh sách menu, category, ngành hàng
        /// </summary>
        /// <param name="parent_id"></param>
        /// <returns>
        public async Task<List<ProductModel>?> getProductListByGroupProductId(int group_product_id, int page_index, int page_size)
        {
            try
            {
                var connect_api_us = new ConnectApi(configuration, redisService);
                var input_request = new Dictionary<string, int>
                {
                    {"group_id",group_product_id },
                    {"page_index",page_index},
                    {"page_size",page_size}
                };
                var response_api = await connect_api_us.CreateHttpRequest("/api/product/get-list.json", input_request);

                // Nhan ket qua tra ve                            
                var JsonParent = JArray.Parse("[" + response_api + "]");
                int status = Convert.ToInt32(JsonParent[0]["status"]);

                if (status == ((int)ResponseType.SUCCESS))
                {
                    string data = JsonParent[0]["data"]["items"].ToString();
                    return JsonConvert.DeserializeObject<List<ProductModel>>(data);
                }
                else
                {
                    return null;
                }

            }
            catch (Exception ex)
            {
                Utilities.LogHelper.InsertLogTelegramByUrl(configuration["telegram_log_error_fe:Token"], configuration["telegram_log_error_fe:GroupId"], "getListMenuHelp " + ex.Message);
                return null;
            }
        }
    }
}
