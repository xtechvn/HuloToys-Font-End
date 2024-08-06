﻿using HuloToys_Front_End.Controllers.Client.Business;
using HuloToys_Front_End.Controllers.News.Business;
using HuloToys_Front_End.Models.News;
using HuloToys_Front_End.Utilities.Contants;
using HuloToys_Service.Utilities.Lib;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

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
            try
            {
                var data = await _newServices.GetNewsCategory();
                return PartialView(data);

            }
            catch(Exception ex)
            {
                LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "NewsCategory-NewsController:" + ex.ToString());

                return PartialView();
            }

            
        } 
        public async Task<IActionResult> GetFindArticleByTitle(FindArticleModel requestObj)
        {
            try
            {
                var data = await _newServices.FindArticleByTitle(requestObj);
                return PartialView(data);

            }
            catch(Exception ex)
            {
                LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "FindArticleByTitle-NewsController:" + ex.ToString());

                return PartialView();
            }

            
        }
        public async Task<IActionResult> NewsByTag(GetListByCategoryIdRequest requestObj)
        {
            try
            {
                ViewBag.skip = requestObj.skip;
                var data = await _newServices.getListArticleByCategoryIdOrderByDate(requestObj);

                return PartialView(data);
            }
            catch(Exception ex) {
                LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "NewsByTag-NewsController:" + ex.ToString());
            }
            return PartialView();
        }
        public async Task<IActionResult> NewsPinned(GetListByCategoryIdRequest requestObj)
        {
            try
            {
                var data = await _newServices.getListArticleByCategoryIdOrderByDatePinned(requestObj);
                if (data != null)
                {
                    return PartialView(data[0]);
                }
            }
            catch (Exception ex) {
                LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "NewsPinned-NewsController:" + ex.ToString());
            }
           
            return PartialView();
        }
        public async Task<IActionResult> NewsMostViewedArticle(GetListByCategoryIdRequest requestObj)
        {
            try
            {
                var data = await _newServices.GetMostViewedArticles();
                return PartialView(data);
            }
            catch (Exception ex) {
                LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "NewsMostViewedArticle-NewsController:" + ex.ToString());

                return PartialView();
            }
        
        }
        public async Task<IActionResult> NewsDetails(string slug, string id)
        {
            try
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
            catch (Exception ex) {
                LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "GetNewsByDate-NewsController:" + ex.ToString());

                return View();
            }
           
        }
        public async Task<IActionResult> GetNewsByDate()
        {
            try
            {
                var requestObj = new GetListByCategoryIdRequest();
                requestObj.category_id = 10;
                requestObj.skip = 1;
                requestObj.take = 1;
                var data = await _newServices.getListArticleByCategoryIdOrderByDatePinned(requestObj);
                return Ok(new
                {
                    status = (int)ResponseType.SUCCESS,
                    data = data != null? data[0]: null,
                });
            }
            catch (Exception ex) {
                LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "GetNewsByDate-NewsController:" + ex.ToString());
            }
            return Ok(new
            {
                status = (int)ResponseType.ERROR,
                data = new List<ArticleResponse>(),
            });

        }
    }
}
