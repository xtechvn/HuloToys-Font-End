using HuloToys_Service.Models.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.APIRequest
{
    public class CartCheckProductRequestModel
    {
        public long account_client_id { get; set; }

        public List<CartConfirmItemRequestModel> carts { get; set; }
    }
}
