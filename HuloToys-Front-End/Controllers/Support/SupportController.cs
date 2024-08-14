using HuloToys_Front_End.Controllers.News.Business;
using HuloToys_Front_End.Controllers.Support.Business;
using HuloToys_Front_End.Models.Comments;
using HuloToys_Front_End.Models.News;
using HuloToys_Service.Utilities.Lib;
using Microsoft.AspNetCore.Mvc;

namespace HuloToys_Front_End.Controllers.Support
{
    public class SupportController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly SupportServices _supportServices;
        public SupportController(IConfiguration configuration)
        {
            _configuration = configuration;
            _supportServices = new SupportServices(configuration);
        }
        public async Task<IActionResult> Index()
        {
            var ListCommonQuestions = await _supportServices.GetListCommonQuestions();
            var ListPolicy = await _supportServices.GetListPolicy();
            ViewBag.Questions = ListCommonQuestions;
            ViewBag.Policy = ListPolicy;
            return View();
        }

        public async Task<IActionResult> feedback()
        {
            return View();
        }

        public async Task<IActionResult> CreateFeedback(CommentCreateRequest obj) 
        {
            await _supportServices.Comments(obj);
            return Ok();
        }

        public async Task<IActionResult> GetListPolicy()
        {
            try
            {
               List<ArticleFeModel> data = null; 
               data = await _supportServices.GetListPolicy();
               return Ok(data);

            }
            catch (Exception ex)
            {
                LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "GetListPolicy-SupportController:" + ex.ToString());

                return BadRequest();
            }
        }

        public async Task<IActionResult> GetPolicyById(int id)
        {
            try
            {
                var data = await _supportServices.GetPolicyById(id);
                return Ok(data);

            }
            catch (Exception ex)
            {
                LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "GetListPolicy-SupportController:" + ex.ToString());

                return BadRequest();
            }
        }

        public async Task<IActionResult> GetQuestionById(int id)
        {
            try
            {
                var data = await _supportServices.GetQuestionById(id);
                return Ok(data);

            }
            catch (Exception ex)
            {
                LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "GetListPolicy-SupportController:" + ex.ToString());

                return BadRequest();
            }
        }

        public async Task<IActionResult> GetListQuestionsByTitle(string title)
        {
            try
            {
                var data = await _supportServices.GetQuestionsByTitle(title);
                return Ok(data);

            }
            catch (Exception ex)
            {
                LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "GetListPolicy-SupportController:" + ex.ToString());

                return BadRequest();
            }
        }

        public async Task<IActionResult> GetListCommonQuestions()
        {
            try
            {
                var data = await _supportServices.GetListCommonQuestions();
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
