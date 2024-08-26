﻿using HuloToys_Front_End.Utilities.Lib;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using HuloToys_Front_End.Utilities.Contants;
using HuloToys_Front_End.Models.Cart;
using Models.MongoDb;
using Models.APIRequest;
using HuloToys_Front_End.Models.Products;
using HuloToys_Front_End.Models.Orders;

namespace HuloToys_Front_End.Controllers.Client.Business
{
    public class OrderServices :APIService
    {
        private readonly IConfiguration _configuration;
        public OrderServices(IConfiguration configuration) :base(configuration) {
            _configuration = configuration;
        }


        public async Task<OrdersGeneralResponseModel> GetDetail(OrdersGeneralRequestModel request)
        {
            try
            {

                var result = await POST(_configuration["API:order_detail"], request);
                var jsonData = JObject.Parse(result);
                var status = int.Parse(jsonData["status"].ToString());

                if (status == (int)ResponseType.SUCCESS)
                {
                    return JsonConvert.DeserializeObject<OrdersGeneralResponseModel>(jsonData["data"].ToString());
                }
            }
            catch
            {
            }
            return null;

        }
        public async Task<OrderConfirmResponseModel> Confirm(CartConfirmRequestModel request)
        {
            try
            {
                var result = await POST(_configuration["API:order_confirm"], request);
                var jsonData = JObject.Parse(result);
                var status = int.Parse(jsonData["status"].ToString());
                if (status == (int)ResponseType.SUCCESS)
                {
                    return JsonConvert.DeserializeObject<OrderConfirmResponseModel>(jsonData["data"].ToString());

                }

            }
            catch
            {
            }
            return null;

        } 
        public async Task<string> QRCode(OrderGeneralRequestModel request)
        {
            try
            {
                var result = await POST(_configuration["API:qr_code"], request);
                var jsonData = JObject.Parse(result);
                var status = int.Parse(jsonData["status"].ToString());
                if (status == (int)ResponseType.SUCCESS)
                {
                    return jsonData["data"].ToString();

                }

            }
            catch
            {
            }
            return null;

        }
    }
}