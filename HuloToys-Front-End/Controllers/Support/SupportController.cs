using HuloToys_Front_End.Controllers.News.Business;
using HuloToys_Front_End.Controllers.Support.Business;
using HuloToys_Front_End.Models.Comments;
using HuloToys_Front_End.Models.News;
using HuloToys_Front_End.Utilities.Contants;
using HuloToys_Service.Utilities.Lib;
using Microsoft.AspNetCore.Mvc;

namespace HuloToys_Front_End.Controllers.Support
{
    public class SupportController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly SupportServices _supportServices;
        private readonly NewServices _newsService;
        public SupportController(IConfiguration configuration)
        {
            _configuration = configuration;
            _newsService = new NewServices(configuration);
            _supportServices = new SupportServices(configuration);
        }
        public async Task<IActionResult> Index()
        {

            GetListByCategoryIdRequest requestObj = new GetListByCategoryIdRequest() 
            {
                category_id = SupportConfig.MenuType,
            };
            var ListMenuHelpers = await _newsService.GetNewsCategory(requestObj);
            ViewBag.MenuHelpers = ListMenuHelpers;
            return View();
        }

        public async Task<IActionResult> feedback()
        {
            return View();
        }

        public async Task<IActionResult> CreateFeedback(PushQueueCreateRequest obj) 
        {
            await _supportServices.Comments(obj);
            return Ok();
        }

        public async Task<IActionResult> CreateEmailPromotion(PushQueueCreateRequest obj)
        {
            await _supportServices.EmailPromotion(obj);
            return Ok();
        }

        public async Task<IActionResult> GetListPolicy(int idTypePolicy)
        {
            try
            {
               GetListByCategoryIdRequest requestObj = new GetListByCategoryIdRequest()
               {
                  category_id = idTypePolicy,
               };
                List<GetCategoryResponse> data = null; 
               data = await _newsService.GetNewsCategory(requestObj);
               return Ok(data);

            }
            catch (Exception ex)
            {
                LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "GetListPolicy-SupportController:" + ex.ToString());

                return BadRequest();
            }
        }

        public async Task<IActionResult> GetListAboutHulotoys(int idCate)
        {
            try
            {
                List<ArticleFeModel> data = null;
                data = await _supportServices.GetListByCategoryID(idCate);
                return Ok(data);

            }
            catch (Exception ex)
            {
                LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "GetListAboutHulotoys-SupportController:" + ex.ToString());

                return BadRequest();
            }
        }

        public async Task<IActionResult> GetListByCategoryID(int id)
        {
            try
            {
                List<ArticleFeModel> data = null;
                data = await _supportServices.GetListByCategoryID(id);
                return Ok(data);

            }
            catch (Exception ex)
            {
                LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "GetListByCategoryID-SupportController:" + ex.ToString());

                return BadRequest();
            }
        }

        public async Task<IActionResult> GetListCustomerSupport(int idCate)
        {
            try
            {
                List<ArticleFeModel> data = null;
                data = await _supportServices.GetListByCategoryID(idCate);
                return Ok(data);

            }
            catch (Exception ex)
            {
                LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "GetListCustomerSupport-SupportController:" + ex.ToString());

                return BadRequest();
            }
        }

        public async Task<IActionResult> GetListQuestionsByTitle(string title,int id)
        {
            try
            {
                var data = await _supportServices.GetArticlesByTitle(title,id);
                return Ok(data);

            }
            catch (Exception ex)
            {
                LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "GetListQuestion-SupportController:" + ex.ToString());

                return BadRequest();
            }
        }

        public async Task<IActionResult> GetBodyArticle(int id,int idType)
        {
            try
            {
                var data = await _supportServices.GetListByCategoryID(idType);
                var obj = data.FirstOrDefault(x => x.id == id);
                return Ok(obj);

            }
            catch (Exception ex)
            {
                LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "GetBodyArticle-SupportController:" + ex.ToString());

                return BadRequest();
            }
        }


        public async Task<IActionResult> GetListCommonQuestions()
        {
            try
            {
                var data = await _supportServices.GetListByCategoryID(24);
                return Ok(data);

            }
            catch (Exception ex)
            {
                LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "GetListPolicy-SupportController:" + ex.ToString());

                return BadRequest();
            }
        }
    }
}
