﻿using BIOLIFE.Controllers.Home.Service;
using BIOLIFE.Service.Redis;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using System.Reflection;

namespace BIOLIFE.ViewComponents.Header
{
    public class HeaderViewComponent : ViewComponent // Chỉnh sửa tên class
    {
        private readonly IConfiguration _configuration;
        private readonly RedisConn _redisService;
        private readonly IMemoryCache _cache; // Inject IMemoryCache
        public HeaderViewComponent(IConfiguration configuration, RedisConn redisService, IMemoryCache cache)
        {
            _configuration = configuration;
            _redisService = redisService;
            _cache = cache;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var cacheKey = "headerMenu"; // Đặt khóa cho cache
            if (!_cache.TryGetValue(cacheKey, out var cachedMenu)) // Kiểm tra xem có trong cache không
            {
                // Nếu không có trong cache, gọi dịch vụ
                var objMenu = new MenuService(_configuration, _redisService);
                cachedMenu = await objMenu.getListMenu(Convert.ToInt32(_configuration["menu:biolife_parent_id"]));
                if (cachedMenu != null)
                {
                    // Lưu vào cache với thời gian hết hạn 60 giây
                    _cache.Set(cacheKey, cachedMenu, TimeSpan.FromSeconds(60));
                }
            }

            return View(cachedMenu);
        }
    }
}
