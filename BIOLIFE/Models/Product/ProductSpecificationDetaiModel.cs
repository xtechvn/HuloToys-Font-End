using System;

namespace BIOLIFE.Models.Product
{
    public class ProductSpecificationDetaiModel
    {
        public string _id { get; set; }
      
        public int attribute_id { get; set; }
        public int value_type { get; set; }
        public string value { get; set; }
    }
}
