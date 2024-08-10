using HuloToys_Front_End.Models.Client;
using HuloToys_Front_End.Utilities.Contants;
using HuloToys_Service.Models;
using HuloToys_Service.Utilities.Lib;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text;

namespace HuloToys_Front_End.Utilities.Lib
{
    public class APIService
    {
        private readonly IConfiguration _configuration;
        private HttpClient _HttpClient;
        private const string CONST_TOKEN_PARAM = "token";
        private readonly string _ApiSecretKey;
        private string USER_NAME="test";
        private string PASSWORD="password";
        private string API_GET_TOKEN="/api/auth/login";
        private string TOKEN="";

        public APIService(IConfiguration configuration)
        {
            _configuration = configuration;
            _HttpClient = new HttpClient(new HttpClientHandler
            {
                ServerCertificateCustomValidationCallback = (message, certificate2, arg3, arg4) => true
            })
            {
                BaseAddress = new Uri(configuration["API:Domain"])
            };
            _ApiSecretKey = configuration["API:SecretKey"];
            API_GET_TOKEN = configuration["API:GetToken"];
            USER_NAME = configuration["API:username"];
            PASSWORD = configuration["API:password"];
        }

        public async Task<string> POST(string endpoint, object request)
        {
            try
            {
                if(TOKEN==null || TOKEN.Trim()=="" ) TOKEN = await GetToken();
                string token = EncodeHelpers.Encode(JsonConvert.SerializeObject(request), _ApiSecretKey);
                var request_message = new HttpRequestMessage(HttpMethod.Post, endpoint);
                request_message.Headers.Add("Authorization", "Bearer " + TOKEN);
                var content = new StringContent("{\"token\":\""+token+"\"}", Encoding.UTF8, "application/json");
                request_message.Content = content;
                var response = await _HttpClient.SendAsync(request_message);
                return await response.Content.ReadAsStringAsync();
            }
            catch
            {
                return null;
            }
        }
        public async Task<string> GetToken()
        {
            try
            {
                var request = new UserLoginModel()
                {
                    Username = USER_NAME,
                    Password= PASSWORD
                };
                var request_message = new HttpRequestMessage(HttpMethod.Post, API_GET_TOKEN);
                var content = new StringContent(JsonConvert.SerializeObject(request), null, "application/json");
                request_message.Content = content;
                var response = await _HttpClient.SendAsync(request_message);
                response.EnsureSuccessStatusCode();
                if (response.IsSuccessStatusCode)
                {
                    var json = JObject.Parse(await response.Content.ReadAsStringAsync());
                    var status = int.Parse(json["status"].ToString());
                    if (status != (int)ResponseType.SUCCESS)
                    {
                        LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "GetToken - APIService:" + json["msg"].ToString());  
                    }
                    else
                    {
                        return json["token"].ToString();
                    }

                }
            }
            catch(Exception ex)
            {
                LogHelper.InsertLogTelegramByUrl(_configuration["BotSetting:bot_token"], _configuration["BotSetting:bot_group_id"], "GetToken - APIService:" + ex.ToString());

            }
            return null;

        }


    }
}
