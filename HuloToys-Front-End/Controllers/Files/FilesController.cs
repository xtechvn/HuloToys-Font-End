using HuloToys_Front_End.Controllers.Files.Bussiness;
using HuloToys_Front_End.Utilities.Lib;
using Microsoft.AspNetCore.Mvc;

namespace HuloToys_Front_End.Controllers.Files
{
    public class FilesController : Controller
    {
        private StaticAPIService _staticAPIService;
        private readonly IConfiguration _configuration;

        public FilesController(IConfiguration configuration)
        {
            _staticAPIService = new StaticAPIService(configuration);

        }
        public async Task<IActionResult> SummitImages(string data_image)
        {
            try
            {
                if (
                    data_image == null || data_image.Trim() == ""
                    )
                {
                    return Ok(new
                    {
                        is_success = false,

                    });
                }
                var data_img = _staticAPIService.GetImageSrcBase64Object(data_image);
                if (data_img != null)
                {
                    var url = await _staticAPIService.UploadImageBase64(data_img);
                    return Ok(new
                    {
                        is_success = true,
                        data = url
                    });
                }

            }
            catch (Exception ex)
            {

            }
            return Ok(new
            {
                is_success = false,
            });
        }
        public async Task<IActionResult> SummitVideo(string data_video)
        {
            try
            {
                if (
                    data_video == null || data_video.Trim() == ""
                    )
                {
                    return Ok(new
                    {
                        is_success = false,

                    });
                }
                var data_img = _staticAPIService.GetVideoSrcBase64Object(data_video);
                if (data_img != null)
                {
                    var url = await _staticAPIService.UploadVideoBase64(data_img);
                    return Ok(new
                    {
                        is_success = true,
                        data = url
                    });
                }

            }
            catch (Exception ex)
            {

            }
            return Ok(new
            {
                is_success = false,
                msg = "Thêm mới / Cập nhật sản phẩm thất bại, vui lòng liên hệ bộ phận IT",
            });
        }
    }
}
