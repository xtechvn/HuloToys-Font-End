using BIOLIFE.Models;

namespace BIOLIFE.ViewModels
{
    public class ArticleViewModel
    {
        public CategoryModel category_detail { get; set; }
        public List<CategoryArticleModel> obj_article_list { get; set; }
    }
}
