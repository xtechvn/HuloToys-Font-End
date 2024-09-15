﻿using BIOLIFE.Contants;
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
        /// <summary>
        /// Chi tiết bài viết
        /// </summary>
        /// <param name="article_id"></param>
        /// <returns></returns>
        public async Task<ArticleDetailModel?> getArticleDetailById(long article_id)
        {
            try
            {
                string response_api = string.Empty;
                var connect_api_us = new ConnectApi(configuration, redisService);
                var input_request = new Dictionary<string, long>
                {
                    {"article_id",article_id }                     
                };

                response_api = await connect_api_us.CreateHttpRequest("/api/news/get-article-detail.json", input_request);

                // Nhan ket qua tra ve                            
                var JsonParent = JArray.Parse("[" + response_api + "]");
                int status = Convert.ToInt32(JsonParent[0]["status"]);

                if (status == ((int)ResponseType.SUCCESS))
                {                    
                    var article = JsonConvert.DeserializeObject<ArticleDetailModel>(JsonParent[0]["data"].ToString());                  
                    return article;
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
        public async Task<ArticleViewModel?> getArticleByCategoryId(int category_id, int top, int skip)
        {
            try
            {
                string response_api = string.Empty;
                var connect_api_us = new ConnectApi(configuration, redisService);
                var input_request = new Dictionary<string, string>
                {
                    {"category_id",category_id.ToString() },
                     {"skip",skip.ToString() },
                     {"take", top.ToString()}
                };

                response_api = await connect_api_us.CreateHttpRequest("/api/news/get-list-by-categoryid.json", input_request);

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
        /// <summary>
        /// Lấy ra các tin mới nhất trang chủ dc set top của tất cả các chuyên mục
        /// </summary>
        /// <param name="category_id"></param>
        /// <param name="top"></param>
        /// <param name="skip"></param>
        /// <returns></returns>
        public async Task<ArticleViewModel?> getTopStory(int top, int skip)
        {
            try
            {
                string response_api = string.Empty;
                var connect_api_us = new ConnectApi(configuration, redisService);
                var input_request = new Dictionary<string, string>
                {
                     {"skip",skip.ToString() },
                     {"take", top.ToString()}
                };


                // Lấy các tin được đăng gần nhất
                response_api = await connect_api_us.CreateHttpRequest("/api/news/get-top-story.json", input_request);

                // Nhan ket qua tra ve                            
                var JsonParent = JArray.Parse("[" + response_api + "]");
                int status = Convert.ToInt32(JsonParent[0]["status"]);

                if (status == ((int)ResponseType.SUCCESS))
                {                    
                    var _list_article = JsonConvert.DeserializeObject<List<CategoryArticleModel>>(JsonParent[0]["data"].ToString());

                    var model = new ArticleViewModel
                    {
                        obj_article_list = _list_article                        
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