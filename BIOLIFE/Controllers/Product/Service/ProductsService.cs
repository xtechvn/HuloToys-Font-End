using BIOLIFE.Contants;
using BIOLIFE.Models;
using BIOLIFE.Models.Products;
using BIOLIFE.Service.Redis;
using BIOLIFE.Utilities;
using HuloToys_Front_End.Utilities.Lib;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace BIOLIFE.Controllers.Product.Service
{
    public class ProductsService : APIService
    {
        private readonly IConfiguration configuration;
        private readonly RedisConn redisService;
        public ProductsService(IConfiguration _configuration, RedisConn _redisService) : base(_configuration)
        {
            configuration = _configuration;
            redisService = _redisService;
        }

        /// <summary>
        /// Load danh sách menu, category, ngành hàng
        /// </summary>
        /// <param name="parent_id"></param>
        /// <returns>
        public async Task<ProductListResponseModel?> getProductListByGroupProductId(int group_product_id, int page_index, int page_size)
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
                    string data = JsonParent[0]["data"].ToString();
                    int total = Convert.ToInt32(JsonParent[0]["total"]);
                    var model = new ProductListResponseModel
                    {
                        items = JsonConvert.DeserializeObject<List<ProductMongoDbModel>>(data),
                        count = total,
                        page_index = page_index,
                        page_size = page_size
                    };
                    return model;
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
        public async Task<ProductDetailResponseModel> GetProductDetail(ProductDetailRequestModel request)
        {
            try
            {
                string response_api = string.Empty;
                var connect_api_us = new ConnectApi(configuration, redisService);
                var input_request = new Dictionary<string, string>
                {
                    {"product_id",request.id }
                };

                response_api = await connect_api_us.CreateHttpRequest(configuration["API:get_product_detail"].ToString(), input_request);

                // Nhan ket qua tra ve                            
                var JsonParent = JArray.Parse("[" + response_api + "]");
                int status = Convert.ToInt32(JsonParent[0]["status"]);

                if (status == ((int)ResponseType.SUCCESS))
                {
                    var product = JsonConvert.DeserializeObject<ProductDetailResponseModel>(JsonParent[0]["data"].ToString());
                    return product;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                Utilities.LogHelper.InsertLogTelegramByUrl(configuration["telegram_log_error_fe:Token"], configuration["telegram_log_error_fe:GroupId"], "GetProductDetail " + ex.Message);
                return null;
            }
        }
        public async Task<ProductListResponseModel> GetProductList(ProductListRequestModel request)
        {
            try
            {
                var result = await POST(configuration["API:get_product_list"], request);
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

        public async Task<List<ProductMongoDbModel>> Search(string keyword)
        {
            try
            {
                string response_api = string.Empty;
                var connect_api_us = new ConnectApi(configuration, redisService);
                var input_request = new Dictionary<string, string>
                {
                    {"keyword",keyword }
                };

                response_api = await connect_api_us.CreateHttpRequest("/api/product/search.json", input_request);

                // Nhan ket qua tra ve                            
                var JsonParent = JArray.Parse("[" + response_api + "]");
                int status = Convert.ToInt32(JsonParent[0]["status"]);

                if (status == ((int)ResponseType.SUCCESS))
                {
                    var product_list = JsonConvert.DeserializeObject<List<ProductMongoDbModel>>(JsonParent[0]["data"].ToString());
                    return product_list;
                }
                else
                {
                    return null;
                }
            }
            catch
            {
                return null;
            }
        }


        public async Task<List<BrandModel>?> GetBrandList()
        {
            try
            {
                var input_request = new Dictionary<string, string>
        {
            {"token", "F08wO1QJPR4nJktCFGMo"}
        };

                var connect_api_us = new ConnectApi(configuration, redisService);
                var response_api = await connect_api_us.CreateHttpRequest("/api/Product/brand.json", input_request);

                var JsonResponse = JObject.Parse(response_api);
                int status = Convert.ToInt32(JsonResponse["status"]);

                if (status == 0)
                {
                    var data = JsonResponse["data"].ToString();
                    return JsonConvert.DeserializeObject<List<BrandModel>>(data);
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                Utilities.LogHelper.InsertLogTelegramByUrl(configuration["telegram_log_error_fe:Token"], configuration["telegram_log_error_fe:GroupId"], "GetBrandList " + ex.Message);
                return null;
            }
        }

        public async Task<ProductListResponseModel?> GetProductsByBrand(string brand_id, int group_product_id, int page_index, int page_size)
        {
            try
            {
                var connect_api_us = new ConnectApi(configuration, redisService);

                var input_request = new Dictionary<string, object>
        {
            {"brand_id", brand_id},
            {"group_product_id", group_product_id},
            {"page_index", page_index},
            {"page_size", page_size}
        };

                var result = await connect_api_us.CreateHttpRequest(configuration["API:product_by_brand"], input_request);

                if (string.IsNullOrEmpty(result))
                {
                    throw new Exception("API response is null or empty");
                }

                var JsonParent = JArray.Parse("[" + result + "]");

                if (JsonParent.Count == 0)
                {
                    throw new Exception("API response does not contain any elements");
                }

                int status = Convert.ToInt32(JsonParent[0]["status"]);

                if (status == ((int)ResponseType.SUCCESS))
                {
                    var data = JsonParent[0]["data"];
                    var items = data["items"].ToString();
                    int total = Convert.ToInt32(data["total"]);

                    var model = new ProductListResponseModel
                    {
                        items = JsonConvert.DeserializeObject<List<ProductMongoDbModel>>(items),
                        count = total,
                        page_index = page_index,
                        page_size = page_size
                    };

                    return model;
                }
                else
                {
                    throw new Exception($"API response status is not success. Status: {status}");
                }
            }
            catch (Exception ex)
            {
                Utilities.LogHelper.InsertLogTelegramByUrl(configuration["telegram_log_error_fe:Token"], configuration["telegram_log_error_fe:GroupId"], "GetProductsByBrand " + ex.Message + " | StackTrace: " + ex.StackTrace);
                return null;
            }
        }

        public async Task<ProductListResponseModel?> GetProductsByPriceRange(double amount_min, double amount_max, int group_product_id, int page_index, int page_size)
        {
            try
            {
                var connect_api_us = new ConnectApi(configuration, redisService);

                var input_request = new Dictionary<string, object>
        {
            {"amount_min", amount_min},
            {"amount_max", amount_max},
            {"group_product_id", group_product_id},
            {"page_index", page_index},
            {"page_size", page_size}
        };

                var response_api = await connect_api_us.CreateHttpRequest("/api/product/product-by-pricerange.json", input_request);

                if (string.IsNullOrEmpty(response_api))
                {
                    throw new Exception("API response is null or empty");
                }

                var JsonParent = JArray.Parse("[" + response_api + "]");

                if (JsonParent.Count == 0)
                {
                    throw new Exception("API response does not contain any elements");
                }

                int status = Convert.ToInt32(JsonParent[0]["status"]);

                if (status == ((int)ResponseType.SUCCESS))
                {
                    var data = JsonParent[0]["data"];
                    var items = data["items"].ToString();
                    int total = Convert.ToInt32(data["total"]);

                    var model = new ProductListResponseModel
                    {
                        items = JsonConvert.DeserializeObject<List<ProductMongoDbModel>>(items),
                        count = total,
                        page_index = page_index,
                        page_size = page_size
                    };

                    return model;
                }
                else
                {
                    throw new Exception($"API response status is not success. Status: {status}");
                }
            }
            catch (Exception ex)
            {
                Utilities.LogHelper.InsertLogTelegramByUrl(configuration["telegram_log_error_fe:Token"], configuration["telegram_log_error_fe:GroupId"], "GetProductsByPriceRange " + ex.Message + " | StackTrace: " + ex.StackTrace);
                return null;
            }
        }

    }
}
