namespace HuloToys_Front_End.Models.Raiting
{
    public class ProductRaitingRequestModel
    {
        public string id { get; set; }
        public int stars { get; set; }
        public bool has_comment { get; set; }
        public bool has_media { get; set; }
        public int page_index { get; set; }
        public int page_size { get; set; }
    }
    public class ProductRaitingResponseModel
    {
        public List<RatingESResponseModel> comments { get; set; }

        public long star_5_count { get; set; }
        public long star_4_count { get; set; }
        public long star_3_count { get; set; }
        public long star_2_count { get; set; }
        public long star_1_count { get; set; }
        public long has_comment_count { get; set; }
        public long has_media_count { get; set; }

        public int page_index { get; set; }
        public int page_size { get; set; }
        public int max_page { get; set; }
    }
}
