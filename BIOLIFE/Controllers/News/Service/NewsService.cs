using BIOLIFE.Contants;
using BIOLIFE.Models;
using BIOLIFE.Service.Redis;
using BIOLIFE.Utilities;
using BIOLIFE.ViewModels;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Reflection;

namespace BIOLIFE.Controllers.News.Service
{
    public class NewsService
    {
        private readonly IConfiguration configuration;
        private readonly RedisConn redisService;
        public NewsService(IConfiguration _configuration, RedisConn _redisService)
        {
            configuration = _configuration;
            redisService = _redisService;
        }

        public async Task<ArticleViewModel?> getArticleByCategoryId(int category_id, int top)
        {
            try
            {
                var connect_api_us = new ConnectApi(configuration, redisService);
                var input_request = new Dictionary<string, string>
                {
                    {"category_id",category_id.ToString() },
                     {"skip","0"},
                     {"take", top.ToString()}
                };
                var response_api = await connect_api_us.CreateHttpRequest("/api/news/get-list-by-categoryid.json", input_request);

                // Nhan ket qua tra ve                            
                var JsonParent = JArray.Parse("[" + response_api + "]");
                int status = Convert.ToInt32(JsonParent[0]["status"]);

                if (status == ((int)ResponseType.SUCCESS))
                {
                    var _category_detail = JsonConvert.DeserializeObject<CategoryModel>(JsonParent[0]["category_detail"].ToString());
                    var _list_article = JsonConvert.DeserializeObject<List<CategoryArticleModel>>(JsonParent[0]["data"].ToString());

                    var model = new ArticleViewModel
                    {
                        obj_article_list = _list_article,
                        category_detail = _category_detail
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
                string error_msg = Assembly.GetExecutingAssembly().GetName().Name + "->" + MethodBase.GetCurrentMethod().Name + "=>" + ex.Message;
                Utilities.LogHelper.InsertLogTelegramByUrl(configuration["log_telegram:token"], configuration["log_telegram:group_id"], error_msg);
                return null;
            }
        }

    }
}
