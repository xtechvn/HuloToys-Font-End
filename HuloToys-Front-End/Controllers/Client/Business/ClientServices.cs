﻿using HuloToys_Front_End.Utilities.Lib;
using HuloToys_Service.Models;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Net.Http;
using Microsoft.AspNetCore.Identity;
using System.Reflection;
using HuloToys_Front_End.Models.Client;
using HuloToys_Front_End.Utilities.Contants;
using LIB.Models.APIRequest;

namespace HuloToys_Front_End.Controllers.Client.Business
{
    public class ClientServices :APIService
    {
        private readonly IConfiguration _configuration;
        public ClientServices(IConfiguration configuration) :base(configuration) {
            _configuration = configuration;
        }
        public async Task<ClientLoginResponseModel> Login(ClientLoginRequestModel request)
        {
            try
            {
                request.password=EncodeHelpers.MD5Hash(request.password);
                var result = await POST(_configuration["API:Login"], request);
                var jsonData = JObject.Parse(result);
                var status = int.Parse(jsonData["status"].ToString());

                if (status == (int)ResponseType.SUCCESS)
                {
                    return JsonConvert.DeserializeObject<ClientLoginResponseModel>(jsonData["data"].ToString());
                }
            }
            catch
            {
            }
            return null;

        }
        public async Task<string> Register(ClientRegisterRequestModel request)
        {
            try
            {
                request.password = EncodeHelpers.MD5Hash(request.password);
                request.confirm_password = EncodeHelpers.MD5Hash(request.confirm_password);
                var result = await POST(_configuration["API:Register"], request);
                var jsonData = JObject.Parse(result);
                var status = int.Parse(jsonData["status"].ToString());

                if (status == (int)ResponseType.SUCCESS)
                {
                    return "Success";
                }
            }
            catch
            {
            }
            return null;

        }
    }
}