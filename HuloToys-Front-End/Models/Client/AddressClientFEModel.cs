﻿using HuloToys_Service.Models.Location;
using System;
using System.Collections.Generic;

namespace HuloToys_Service.Models.Client
{
    public partial class AddressClientFEModel : AddressClientESModel
    {
      public Province province_detail { get; set; }
      public District district_detail { get; set; }
      public Ward ward_detail { get; set; }

    }


}
