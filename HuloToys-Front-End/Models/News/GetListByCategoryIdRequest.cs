namespace HuloToys_Front_End.Models.News
{
    public class GetListByCategoryIdRequest : BasePaginate
    {
        public int category_id { get; set; }
    }
}
