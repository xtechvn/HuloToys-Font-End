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
using HuloToys_Front_End.Models.Products;
using Entities.ViewModels;
using Entities.ViewModels.Products;

namespace HuloToys_Front_End.Controllers.Client.Business
{
    public class ProductServices :APIService
    {
        private readonly IConfiguration _configuration;
        public ProductServices(IConfiguration configuration) :base(configuration) {
            _configuration = configuration;
        }
        public async Task<ProductDetailResponseModel> GetProductDetail(ProductDetailRequestModel request)
        {
            try
            {

                var result = await POST(_configuration["API:get_product_detail"], request);
                var jsonData = JObject.Parse(result);
                var status = int.Parse(jsonData["status"].ToString());

                if (status == (int)ResponseType.SUCCESS)
                {
                    return JsonConvert.DeserializeObject<ProductDetailResponseModel>(jsonData["data"].ToString());
                }
            }
            catch
            {
            }
            return null;

        }
        public async Task<ProductListResponseModel> GetProductList(ProductListRequestModel request)
        {
            try
            {
                var result = await POST(_configuration["API:get_product_list"], request);
                var jsonData = JObject.Parse(result);
                var status = int.Parse(jsonData["status"].ToString());

                if (status == (int)ResponseType.SUCCESS)
                {
                    return JsonConvert.DeserializeObject<ProductListResponseModel>(jsonData["data"].ToString());
                }
            }
            catch
            {
            }
            return null;

        }
        public async Task<string> AddToCart(ProductAddToCartRequestModel request)
        {
            try
            {
                var result = await POST(_configuration["API:add_to_cart"], request);
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
        public async Task<int> GetCartCount(ProductCartCountRequestModel request)
        {
            try
            {
                var result = await POST(_configuration["API:cart_count"], request);
                var jsonData = JObject.Parse(result);
                var status = int.Parse(jsonData["status"].ToString());

                if (status == (int)ResponseType.SUCCESS)
                {
                    return Convert.ToInt32(jsonData["data"].ToString());
                }
            }
            catch
            {
            }
            return 0;

        }
    }
}
