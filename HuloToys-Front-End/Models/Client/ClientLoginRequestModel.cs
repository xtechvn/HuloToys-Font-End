﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HuloToys_Front_End.Models.Client
{
    public class ClientLoginRequestModel
    {
        public string user_name { get; set; }

        public string password { get; set; }
        public bool remember_me { get; set; }
    }
}
