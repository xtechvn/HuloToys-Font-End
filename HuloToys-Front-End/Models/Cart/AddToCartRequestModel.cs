﻿using HuloToys_Front_End.Models.Products;

namespace HuloToys_Front_End.Models.Cart
{
    public class AddToCartRequestModel
    {
        public string product_id { get; set; }
        public long account_client_id { get; set; }
        public int quanity { get; set; }
    }

}