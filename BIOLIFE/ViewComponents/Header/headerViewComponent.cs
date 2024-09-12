using BIOLIFE.Controllers.Home.Service;
using BIOLIFE.Service.Redis;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace BIOLIFE.ViewComponents.Header
{
    public class headerViewComponent: ViewComponent
    {
        private readonly IConfiguration configuration;
        private readonly RedisConn redisService;
        public headerViewComponent(IConfiguration _Configuration, RedisConn _redisService)
        {
            configuration = _Configuration;
            redisService = _redisService;
        }

        /// <summary>
        /// load các menu của web
        /// menu_parent_id: id của menu cha
        /// </summary>
        /// <returns></returns>
        public async Task<IViewComponentResult?> InvokeAsync()
        {
            try
            {
                var obj_menu = new MenuService(configuration, redisService);
                var obj_lst_menu = await obj_menu.getListMenu(Convert.ToInt32(configuration["menu:biolife_parent_id"]));
                return obj_lst_menu != null ? View(obj_lst_menu) : Content("");                
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
