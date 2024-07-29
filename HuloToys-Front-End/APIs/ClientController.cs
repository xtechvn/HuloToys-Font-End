using HuloToys_Front_End.Controllers.Client.Business;
using HuloToys_Front_End.Models.Client;
using LIB.Models.APIRequest;
using Microsoft.AspNetCore.Mvc;

namespace HuloToys_Front_End.Controllers.API
{
    [ApiController]
    [Route("[controller]")]
    public class ClientController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly ClientServices _clientServices;
        public ClientController(IConfiguration configuration) {

            _configuration= configuration;
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
