using System;

namespace MvcCurrencyConverter.Core.Caching
{
    public interface ICacheService
    {
        T GetOrSet<T>(string cacheKey, DateTimeOffset expiration, Func<T> getItemCallback) where T : class;
    }
}
