using HuloToys_Front_End.Models.Comments;
using HuloToys_Front_End.Models.News;
using HuloToys_Front_End.Utilities.Contants;
using HuloToys_Front_End.Utilities.Lib;
using HuloToys_Service.Utilities.Lib;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
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


        public async Task<List<ArticleFeModel>> GetListPolicy()
        {
            try
            {
                var obj = new Dictionary<string, object>
                {
                    { "category_id","23" }
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

        public async Task<CommentCreateRequest> Comments(CommentCreateRequest obj)
        {
            try
            {
                var result = await POST("/api/insert-comments", obj);
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
                    { "category_id","23" }
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

        public async Task<ArticleFeModel> GetQuestionById(int id)
        {
            try
            {
                var obj = new Dictionary<string, object>
                {
                    { "category_id","24" }
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

        public async Task<List<ArticleFeModel>> GetQuestionsByTitle(string title)
        {
            try
            {
                var obj = new Dictionary<string, object>
                {
                    { "category_id","24" }
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

        public async Task<List<ArticleFeModel>> GetListCommonQuestions ()
        {
            try
            {
                var obj = new Dictionary<string, object>
                {
                    { "category_id","24" }
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
    } 


}
