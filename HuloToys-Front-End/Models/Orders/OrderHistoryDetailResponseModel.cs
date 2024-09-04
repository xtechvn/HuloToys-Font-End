using Models.MongoDb;

namespace HuloToys_Service.Models.Orders
{
    public class OrderHistoryDetailResponseModel
    {
        public OrderDetailMongoDbModel data_order { get; set; }
        public OrderESModel data { get; set; }
    }
}
