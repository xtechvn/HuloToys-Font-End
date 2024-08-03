using HuloToys_Front_End.Models.Client;
using HuloToys_Front_End.Utilities.Contants;
using HuloToys_Front_End.Utilities.Lib;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using HuloToys_Front_End.Models.News;
using System.Net.Http;
using static System.Runtime.InteropServices.JavaScript.JSType;
using HuloToys_Service.Utilities.Lib;

namespace HuloToys_Front_End.Controllers.News.Business
{
    public class NewServices : APIService
    {
        private readonly IConfiguration _configuration;
        public NewServices(IConfiguration configuration) : base(configuration)
        {
            _configuration = configuration;
        }
        public async Task<List<GetCategoryResponse>> GetNewsCategory()
        {
            try
            {
                var obj =new Dictionary<string, object>
                {
                    { "category_id","10" }
                };
                var result = await POST(_configuration["API:get_category"], obj);
                var jsonData = JObject.Parse(result);
                var status = int.Parse(jsonData["status"].ToString());

                if (status == (int)ResponseType.SUCCESS)
                {
                  
                    var data = JsonConvert.DeserializeObject<List<GetCategoryResponse>>(jsonData["categories"].ToString());

                    return data;
                }
                else
                {
                    var msg = int.Parse(jsonData["msg"].ToString());
                    LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "GetNewsCategory-NewServices:" + msg.ToString());

                }

            }
            catch (Exception ex)
            {
                LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "GetNewsCategory-NewServices:"+ ex.ToString());
            }
            return null;
        }
        public async Task<List<ArticleResponse>> getListArticleByCategoryIdOrderByDate(GetListByCategoryIdRequest requestObj)
        {
            try
            {
              
                var result = await POST(_configuration["API:get_list_by_categoryid_order"], requestObj);
                var jsonData = JObject.Parse(result);
                var status = int.Parse(jsonData["status"].ToString());

                if (status == (int)ResponseType.SUCCESS)
                {
                    var data= JsonConvert.DeserializeObject<List<ArticleResponse>>(jsonData["data_list"].ToString());

                    return data;
                }
                else
                {
                    var msg = int.Parse(jsonData["msg"].ToString());
                    LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "getListArticleByCategoryIdOrderByDate-NewServices:" + msg.ToString());

                }
            }
            catch(Exception ex)
            {
                LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "getListArticleByCategoryIdOrderByDate-NewServices:" + ex.ToString());
            }
            return null;

        }
        public async Task<List<ArticleResponse>> getListArticleByCategoryIdOrderByDatePinned(GetListByCategoryIdRequest requestObj)
        {
            try
            {

                var result = await POST(_configuration["API:get_list_by_categoryid_order"], requestObj);
                var jsonData = JObject.Parse(result);
                var status = int.Parse(jsonData["status"].ToString());

                if (status == (int)ResponseType.SUCCESS)
                {
                    var data= JsonConvert.DeserializeObject<List<ArticleResponse>>(jsonData["pinned"].ToString());
                    if (data.Count > 0)
                    {
                        var total_item = int.Parse(jsonData["total_item"].ToString());
                        var total_page = int.Parse(jsonData["total_page"].ToString());
                        data[0].total_item = total_item;
                        data[0].total_page = total_page;
                    }
                    return data;
                }
                else
                {
                    var msg = int.Parse(jsonData["msg"].ToString());
                    LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "getListArticleByCategoryIdOrderByDatePinned-NewServices:" + msg.ToString());

                }
            }
            catch(Exception ex)
            {
                LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "getListArticleByCategoryIdOrderByDatePinned-NewServices:" + ex.ToString());
            }
            return null;

        }
        public async Task<GetNewDetailResponse> GetNewsDetail(GetNewDetailRequest requestObj)
        {
            try
            {
                var result = await POST(_configuration["API:get_new_detail"], requestObj);
                var jsonData = JObject.Parse(result);
                var status = int.Parse(jsonData["status"].ToString());

                if (status == (int)ResponseType.SUCCESS)
                {
                    return JsonConvert.DeserializeObject<GetNewDetailResponse>(jsonData["data"].ToString());
                }
                else
                {
                    var msg = int.Parse(jsonData["msg"].ToString());
                    LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "GetNewsDetail-NewServices:" + msg.ToString());

                }
            }
            catch (Exception ex)
            {
                LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "GetNewsDetail-NewServices:" + ex.ToString());
            }
            return null;
        }
        public async Task<List<ArticleResponse>> GetMostViewedArticles()
        {
            try
            {
                var obj = new Dictionary<string, object>
                {
                    { "category_id","10" }
                };
                var result = await POST(_configuration["API:get_most_viewed_article"], obj);
                var jsonData = JObject.Parse(result);
                var status = int.Parse(jsonData["status"].ToString());

                if (status == (int)ResponseType.SUCCESS)
                {
                    return JsonConvert.DeserializeObject<List<ArticleResponse>>(jsonData["data"].ToString());
                }
                else
                {
                    var msg = int.Parse(jsonData["msg"].ToString());
                    LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "GetMostViewedArticles-NewServices:" + msg.ToString());

                }
            }
            catch (Exception ex)
            {
                LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "GetMostViewedArticles-NewServices:" + ex.ToString());
            }
            return null;
        }
        public async Task<List<ArticleRelationModel>> FindArticleByTitle(FindArticleModel requestObj)
        {
            try
            {
                var result = await POST(_configuration["API:find_article"], requestObj);
                var jsonData = JObject.Parse(result);
                var status = int.Parse(jsonData["status"].ToString());

                if (status == (int)ResponseType.SUCCESS)
                {
                    return JsonConvert.DeserializeObject<List<ArticleRelationModel>>(jsonData["data_list"].ToString());
                }
                else
                {
                    var msg = int.Parse(jsonData["msg"].ToString());
                    LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "GetNewsDetail-NewServices:" + msg.ToString());

                }
            }
            catch (Exception ex)
            {
                LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "GetNewsDetail-NewServices:" + ex.ToString());
            }
            return null;
        }
    }
}
