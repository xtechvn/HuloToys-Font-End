using Entities.ViewModels;
using Entities.ViewModels.Products;

namespace HuloToys_Front_End.Models.Products
{
    public class ProductDetailResponseModel: ProductMongoDbModel
    {
        public float star { get; set; }
        public int product_sold_count { get; set; }
        public int reviews_count { get; set; }

    }
}
