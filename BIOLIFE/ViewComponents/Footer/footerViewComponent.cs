using BIOLIFE.Controllers.Home.Service;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace BIOLIFE.ViewComponents.Footer
{
    public class footerViewComponent : ViewComponent
    {
        private readonly IConfiguration configuration;
        public footerViewComponent(IConfiguration _Configuration)
        {
            configuration = _Configuration;
        }

        /// <summary>
        /// load các menu của web
        /// menu_parent_id: id của menu cha
        /// </summary>
        /// <returns></returns>
        public async Task<IViewComponentResult?> InvokeAsync()
        {
            return View();
            //try
            //{
            //    //var obj_menu = new MenuService(configuration);

            //    //var obj_lst_cate = await obj_menu.getArticleByCategoryId(Convert.ToInt32(configuration["menu:help_parent_id"]));
            //    //return obj_lst_cate != null ? View(obj_lst_cate) : Content("");
            //    return View();
            //}
            //catch (Exception)
            //{                
            //    return Content(""); 
            //}
        }
    }
}
