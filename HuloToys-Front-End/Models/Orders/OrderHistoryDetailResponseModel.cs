using Models.MongoDb;

namespace HuloToys_Front_End.Models.Orders
{
    public class OrderHistoryDetailResponseModel
    {
        public OrderDetailMongoDbModel data_order { get; set; }
        public OrderESModel data { get; set; }
        public bool has_raiting { get; set; }

    }
}
