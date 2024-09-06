using HuloToys_Front_End.Utilities.Lib;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using HuloToys_Front_End.Utilities.Contants;
using HuloToys_Service.Models.Client;
using HuloToys_Service.Models.Address;

namespace HuloToys_Front_End.Controllers.Client.Business
{
    public class AddressClientServices : APIService
    {
        private readonly IConfiguration _configuration;
        public AddressClientServices(IConfiguration configuration) :base(configuration) {
            _configuration = configuration;
        }
      
        public async Task<ClientAddressListResponseModel> Listing(ClientAddressGeneralRequestModel request)
        {
            try
            {
                var result = await POST(_configuration["API:address_client_list"], request);
                var jsonData = JObject.Parse(result);
                var status = int.Parse(jsonData["status"].ToString());

                if (status == (int)ResponseType.SUCCESS)
                {
                    return JsonConvert.DeserializeObject<ClientAddressListResponseModel>(jsonData["data"].ToString());
                }
            }
            catch
            {
            }
            return null;

        }
        public async Task<AddressClientESModel> Detail(ClientAddressDetailRequestModel request)
        {
            try
            {
                var result = await POST(_configuration["API:address_client_detail"], request);
                var jsonData = JObject.Parse(result);
                var status = int.Parse(jsonData["status"].ToString());

                if (status == (int)ResponseType.SUCCESS)
                {
                    return JsonConvert.DeserializeObject<AddressClientESModel>(jsonData["data"].ToString());
                }
            }
            catch
            {
            }
            return null;

        }
        public async Task<bool> CreateOrUpdate(AddressUpdateRequestModel request)
        {
            try
            {
                var url = _configuration["API:address_create"];
                if (request.Id > 0)
                {
                    url = _configuration["API:address_update"];
                }
                var result = await POST(url, request);
                var jsonData = JObject.Parse(result);
                var status = int.Parse(jsonData["status"].ToString());

                if (status == (int)ResponseType.SUCCESS)
                {
                    return true;
                }
            }
            catch
            {
            }
            return false;

        }
        public async Task<AddressClientFEModel> DefaultAddress(ClientAddressGeneralRequestModel request)
        {
            try
            {
                var result = await POST(_configuration["API:address_client_default"], request);
                var jsonData = JObject.Parse(result);
                var status = int.Parse(jsonData["status"].ToString());

                if (status == (int)ResponseType.SUCCESS)
                {
                    return JsonConvert.DeserializeObject<AddressClientFEModel>(jsonData["data"].ToString());
                }
            }
            catch
            {
            }
            return null;

        }
    }
}
