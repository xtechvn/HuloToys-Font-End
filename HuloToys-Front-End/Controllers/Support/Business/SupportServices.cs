using HuloToys_Front_End.Models.Comments;
using HuloToys_Front_End.Models.News;
using HuloToys_Front_End.Utilities.Contants;
using HuloToys_Front_End.Utilities.Lib;
using HuloToys_Service.Utilities.Lib;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Utilities.Contants;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace HuloToys_Front_End.Controllers.Support.Business
{
    public class SupportServices : APIService
    {
        private readonly IConfiguration _configuration;
        public SupportServices(IConfiguration configuration) : base(configuration)
        {
            _configuration = configuration;
        }


        public async Task<List<ArticleFeModel>> GetListByCategoryID(int id_Cate)
        {
            try
            {
                var obj = new Dictionary<string, object>
                {
                    { "category_id",id_Cate }
                };
                var result = await POST("api/news/get-list-by-categoryid.json", obj);
                var jsonData = JObject.Parse(result);
                var status = int.Parse(jsonData["status"].ToString());

                if (status == (int)ResponseType.SUCCESS)
                {

                    var data = JsonConvert.DeserializeObject<List<ArticleFeModel>>(jsonData["data_list"].ToString());

                    return data;
                }
                else
                {
                    var msg = int.Parse(jsonData["msg"].ToString());
                    LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "GetListPolicy-SupportServices:" + msg.ToString());

                }

            }
            catch (Exception ex)
            {
                LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "GetListPolicy-SupportServices:" + ex.ToString());
            }
            return null;
        }

        public async Task<PushQueueCreateRequest> Comments(PushQueueCreateRequest obj)
        {
            try
            {
                obj.Type_Queue = QueueType.ADD_COMMENT;
                var result = await POST("/api/push-queue", obj);
                var jsonData = JObject.Parse(result);
                var status = int.Parse(jsonData["status"].ToString());
            }
            catch (Exception ex)
            {
                LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "InsertComment-SupportServices:" + ex.ToString());
            }
            return null;
        }

        public async Task<PushQueueCreateRequest> EmailPromotion(PushQueueCreateRequest obj)
        {
            try
            {
                obj.Type_Queue = QueueType.ADD_RECEIVER_INFO_EMAIL;
                var result = await POST("/api/push-queue", obj);
                var jsonData = JObject.Parse(result);
                var status = int.Parse(jsonData["status"].ToString());
            }
            catch (Exception ex)
            {
                LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "InsertComment-SupportServices:" + ex.ToString());
            }
            return null;
        }

        public async Task<ArticleFeModel> GetPolicyById(int id)
        {
            try
            {
                var obj = new Dictionary<string, object>
                {
                    { "category_id",SupportConfig.PolicyType }
                };
                var result = await POST("api/news/get-list-by-categoryid.json", obj);
                var jsonData = JObject.Parse(result);
                var status = int.Parse(jsonData["status"].ToString());

                if (status == (int)ResponseType.SUCCESS)
                {

                    var data = JsonConvert.DeserializeObject<List<ArticleFeModel>>(jsonData["data_list"].ToString());
                    ArticleFeModel objById = data.Where(x => x.id == id).FirstOrDefault();
                    return objById;
                }
                else
                {
                    var msg = int.Parse(jsonData["msg"].ToString());
                    LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "GetListPolicy-SupportServices:" + msg.ToString());

                }

            }
            catch (Exception ex)
            {
                LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "GetListPolicy-SupportServices:" + ex.ToString());
            }
            return null;
        }


        
        public async Task<List<ArticleFeModel>> GetArticlesByTitle(string title,int id)
        {
            try
            {
                var obj = new Dictionary<string, object>
                {
                    { "category_id",id }
                };
                var result = await POST("api/news/get-list-by-categoryid.json", obj);
                var jsonData = JObject.Parse(result);
                var status = int.Parse(jsonData["status"].ToString());

                if (status == (int)ResponseType.SUCCESS)
                {

                    var data = JsonConvert.DeserializeObject<List<ArticleFeModel>>(jsonData["data_list"].ToString());
                    List<ArticleFeModel> Lst = data.Where(x => x.title.ToLower().Contains(title.ToLower())).ToList();
                    return Lst;
                }
                else
                {
                    var msg = int.Parse(jsonData["msg"].ToString());
                    LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "GetListPolicy-SupportServices:" + msg.ToString());

                }

            }
            catch (Exception ex)
            {
                LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "GetListPolicy-SupportServices:" + ex.ToString());
            }
            return null;
        }
    } 
}
