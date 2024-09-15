using Microsoft.AspNetCore.Mvc.Rendering;

namespace BIOLIFE.Utilities
{
    public static class StaticLinkHelper
    {
       
        public static string GetStaticUrlNews(this IHtmlHelper htmlHelper, string Title, long article_id)
        {
            Title = CommonHelper.RemoveUnicode(CommonHelper.CheckMaxLength(Title.Trim(), 100));
            Title = CommonHelper.RemoveSpecialCharacters(CommonHelper.CheckMaxLength(Title.Trim(), 100));
            Title = Title.Replace(" ", "-").ToLower();
            return ("/" + Title + "-" + article_id + ".html");
        }
        public static string GetStaticUrlCategory(this IHtmlHelper htmlHelper, string name, long cate_id)
        {
            name = CommonHelper.RemoveUnicode(CommonHelper.CheckMaxLength(name.Trim(), 100));
            name = CommonHelper.RemoveSpecialCharacters(CommonHelper.CheckMaxLength(name.Trim(), 100));
            name = name.Replace(" ", "-").ToLower();
            return ("/" + name + "/" + cate_id );
        }
    }
}
