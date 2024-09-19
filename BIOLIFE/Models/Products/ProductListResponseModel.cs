using BIOLIFE.Models.Products;

namespace BIOLIFE.Models.Products
{
    public class ProductListResponseModel
    {
        public List<ProductMongoDbModel> items { get; set; }
        public long count { get; set; }
    }
}
