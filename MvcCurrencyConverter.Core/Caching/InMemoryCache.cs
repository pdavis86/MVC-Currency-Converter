using System;
using System.Runtime.Caching;

// https://stackoverflow.com/questions/343899/how-to-cache-data-in-a-mvc-application

namespace MvcCurrencyConverter.Core.Caching
{
    public class InMemoryCache : ICacheService
    {
        public T GetOrSet<T>(string cacheKey, DateTimeOffset expiration, Func<T> getItemCallback) where T : class
        {
            T item = MemoryCache.Default.Get(cacheKey) as T;
            if (item == null)
            {
                item = getItemCallback();
                MemoryCache.Default.Add(cacheKey, item, expiration);
            }
            return item;
        }
    }
}
