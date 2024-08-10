using HuloToys_Front_End.Controllers.Client.Business;
using HuloToys_Front_End.Models.Client;
using HuloToys_Front_End.Utilities.Lib;
using LIB.Models.APIRequest;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace HuloToys_Front_End.Controllers.Client
{
    public class ClientController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly ClientServices _clientServices; public ClientController(IConfiguration configuration) {

            _clientServices = new ClientServices(configuration);
        }
        [HttpGet]
        [Route("token")]
        public async Task<IActionResult> Token()
        {
            var result = await _clientServices.GetToken();
            return new JsonResult(new
            {
                data = result
            });
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(ClientLoginRequestModel request)
        {
            var result = await _clientServices.Login(request);
            if (result != null)
            {
                result.ip = HttpContext.Connection.RemoteIpAddress == null ? "Unknown" : HttpContext.Connection.RemoteIpAddress.ToString();
                result.time_expire = DateTime.Now.AddDays(30);
                result.validate_token = EncodeHelpers.Encode(JsonConvert.SerializeObject(result), _configuration["API:SecretKey"]);
            }
            return new JsonResult(new
            {
                is_success = result != null,
                data = result
            });
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(ClientRegisterRequestModel request)
        {
            var result = await _clientServices.Register(request);

            return new JsonResult(new
            {
                is_success = result != null,
                data = result
            });
        }
    }
}
