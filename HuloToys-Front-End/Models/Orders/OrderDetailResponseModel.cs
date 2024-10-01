using Models.MongoDb;

namespace HuloToys_Service.Models.Orders
{
    public class OrderDetailResponseModel
    {
        public OrderDetailMongoDbModel data_order { get; set; }
        public OrderESDetailModel data { get; set; }

    }
}
