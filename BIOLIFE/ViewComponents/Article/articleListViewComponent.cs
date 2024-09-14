using BIOLIFE.Controllers.Home.Service;
using BIOLIFE.Controllers.News.Service;
using BIOLIFE.Service.Redis;
using BIOLIFE.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace BIOLIFE.ViewComponents.Article
{
    public class articleListViewComponent : ViewComponent
    {
        private readonly IConfiguration configuration;
        private readonly RedisConn redisService;
        public articleListViewComponent(IConfiguration _Configuration, RedisConn _redisService)
        {
            configuration = _Configuration;
            redisService = _redisService;
        }

        /// <summary>       
        /// </summary>
        /// <returns>Load cac bai viet theo chuyen muc</returns>
        public async Task<IViewComponentResult?> InvokeAsync(int category_id,int top)
        {
            try
            {
                var obj_cate = new NewsService(configuration, redisService);                

                var _obj_article_list = await obj_cate.getArticleByCategoryId(category_id, top);               

                return _obj_article_list != null ? View(_obj_article_list) : Content("");
            }
            catch (Exception ex)
            {
                string error_msg = Assembly.GetExecutingAssembly().GetName().Name + "->" + MethodBase.GetCurrentMethod().Name + "=>" + ex.Message;
                Utilities.LogHelper.InsertLogTelegramByUrl(configuration["log_telegram:token"], configuration["log_telegram:group_id"], error_msg);
                return Content("");
            }
        }
    }
}
