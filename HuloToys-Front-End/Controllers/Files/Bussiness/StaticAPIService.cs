using HuloToys_Front_End.Models.Files;
using HuloToys_Front_End.Utilities.Lib;
using Newtonsoft.Json;
using System.Text;

namespace HuloToys_Front_End.Controllers.Files.Bussiness
{
    public class StaticAPIService
    {
        private string API_IMAGE = "https://static-image.adavigo.com/images/upload";
        private string API_VIDEO = "https://static-image.adavigo.com/Video/upload-video";
        private string STATIC_URL = "https://static-image.adavigo.com";
        private string KEY = "wVALy5t0tXEgId5yMDNg06OwqpElC9I0sxTtri4JAlXluGipo6kKhv2LoeGQnfnyQlC07veTxb7zVqDVKwLXzS7Ngjh1V3SxWz69";
        public StaticAPIService(IConfiguration configuration)
        {
            KEY = configuration["API:UploadImageKey"];
            API_IMAGE = configuration["API:UploadImage"];
            API_VIDEO = configuration["API:UploadVideo"];
            STATIC_URL = configuration["API:StaticURL"];
        }
        public async Task<string> UploadImageBase64(ImageBase64 modelImage)
        {
            try
            {
                var j_param = new Dictionary<string, string> {
                    { "data_file", modelImage.ImageData },
                    { "extend", modelImage.ImageExtension }};
                string tokenData = EncodeHelpers.Encode(JsonConvert.SerializeObject(j_param), KEY);
                using (HttpClient httpClient = new HttpClient())
                {
                    var contentObj = new { token = tokenData };
                    var content = new StringContent(JsonConvert.SerializeObject(contentObj), Encoding.UTF8, "application/json");
                    var result = await httpClient.PostAsync(API_IMAGE, content);
                    dynamic resultContent = Newtonsoft.Json.Linq.JObject.Parse(result.Content.ReadAsStringAsync().Result);
                    if (resultContent.status == 0)
                    {
                        return resultContent.url_path;
                    }
                    else
                    {

                    }
                }
            }
            catch (Exception ex)
            {

            }
            return null;
        }
        public async Task<string> UploadVideoBase64(ImageBase64 modelVideo)
        {
            try
            {
                var j_param = new Dictionary<string, string> {
                    { "data_file", modelVideo.ImageData },
                    { "extend", modelVideo.ImageExtension }};
                string tokenData = EncodeHelpers.Encode(JsonConvert.SerializeObject(j_param), KEY);
                using (HttpClient httpClient = new HttpClient())
                {
                    var contentObj = new { token = tokenData };
                    var content = new StringContent(JsonConvert.SerializeObject(contentObj), Encoding.UTF8, "application/json");
                    var result = await httpClient.PostAsync(API_VIDEO, content);
                    dynamic resultContent = Newtonsoft.Json.Linq.JObject.Parse(result.Content.ReadAsStringAsync().Result);
                    if (resultContent.status == "success")
                    {
                        return resultContent.url_path;
                    }
                    else
                    {

                    }
                }
            }
            catch (Exception ex)
            {

            }
            return null;
        }
        public ImageBase64 GetImageSrcBase64Object(string imgSrc)
        {
            try
            {
                if (!string.IsNullOrEmpty(imgSrc) && imgSrc.StartsWith("data:image"))
                {
                    var ImageBase64 = new ImageBase64();
                    var base64Data = imgSrc.Split(',')[0];
                    ImageBase64.ImageData = imgSrc.Split(',')[1];
                    ImageBase64.ImageExtension = base64Data.Split(';')[0].Split('/')[1];
                    return ImageBase64;
                }
            }
            catch (FormatException)
            {

            }
            return null;
        }
        public ImageBase64 GetVideoSrcBase64Object(string imgSrc)
        {
            try
            {
                if (!string.IsNullOrEmpty(imgSrc) && imgSrc.StartsWith("data:video"))
                {
                    var ImageBase64 = new ImageBase64();
                    var base64Data = imgSrc.Split(',')[0];
                    ImageBase64.ImageData = imgSrc.Split(',')[1];
                    ImageBase64.ImageExtension = base64Data.Split(';')[0].Split('/')[1];
                    return ImageBase64;
                }
            }
            catch (FormatException)
            {

            }
            return null;
        }
    }
}
