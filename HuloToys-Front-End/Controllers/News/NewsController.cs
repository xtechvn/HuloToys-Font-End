using HuloToys_Front_End.Controllers.Client.Business;
using HuloToys_Front_End.Controllers.News.Business;
using HuloToys_Front_End.Models.News;
using HuloToys_Front_End.Utilities.Contants;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HuloToys_Front_End.Controllers.News
{
    public class NewsController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly NewServices _newServices;
        public NewsController(IConfiguration configuration)
        {
            _configuration = configuration;
            _newServices = new NewServices(configuration);
        }

        public IActionResult Index()
        {
            return View();
        }
        public async Task<IActionResult> NewsCategory(GetListByCategoryIdRequest requestObj)
        {
            var data = await _newServices.GetNewsCategory();
            return PartialView(data);
        }
        public async Task<IActionResult> NewsByTag(GetListByCategoryIdRequest requestObj)
        {
            ViewBag.skip = requestObj.skip;
            var data = await _newServices.getListArticleByCategoryIdOrderByDate(requestObj);
            
            return PartialView(data);
        }
        public async Task<IActionResult> NewsPinned(GetListByCategoryIdRequest requestObj)
        {
           
            var data = await _newServices.getListArticleByCategoryIdOrderByDatePinned(requestObj);
            if (data != null)
            {
                return PartialView(data[0]);
            }
            else
            {
                return PartialView();

            }
        }
        public async Task<IActionResult> NewsMostViewedArticle(GetListByCategoryIdRequest requestObj)
        {
           
            var data = await _newServices.GetMostViewedArticles();
            return PartialView(data);
        }
        public async Task<IActionResult> NewsDetails(string id)
        {
            GetNewDetailRequest request = new GetNewDetailRequest();
            request.article_id = long.Parse(id);
            var details = await _newServices.GetNewsDetail(request);
            var mostViewedArticles = await _newServices.GetMostViewedArticles();

            GetNewDetailObjectResponse response = new GetNewDetailObjectResponse();
            response.Details = details;
            response.MostViewedArticles = mostViewedArticles;
            return View(response);
        }
        public async Task<IActionResult> GetNewsByDate(int Type)
        {
            var requestObj = new GetListByCategoryIdRequest();
            requestObj.category_id = 10;
            requestObj.skip = 1;
            requestObj.take = 1;
            var data = await _newServices.getListArticleByCategoryIdOrderByDatePinned(requestObj);
            data=data.Where(s=>s.position== Type).ToList();
            return Ok(new
            {
                status = (int)ResponseType.SUCCESS,
                data = data[0],
            });
        }
    }
}
