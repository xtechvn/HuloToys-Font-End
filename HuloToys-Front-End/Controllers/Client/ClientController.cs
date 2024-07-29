using HuloToys_Front_End.Controllers.Client.Business;
using HuloToys_Front_End.Models.Client;
using Microsoft.AspNetCore.Mvc;

namespace HuloToys_Front_End.Controllers.Client
{
    public class ClientController : Controller
    {
        private readonly IConfiguration _configuration;
        public ClientController(IConfiguration configuration) {

            _configuration= configuration;
        }
       
       
    }
}
