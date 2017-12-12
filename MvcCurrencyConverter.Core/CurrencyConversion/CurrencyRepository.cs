using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace MvcCurrencyConverter.Core.CurrencyConversion
{
    public class CurrencyRepository : ICurrencyRepository
    {
        Caching.InMemoryCache _cacheProvider;

        public CurrencyRepository()
        {
            _cacheProvider = new Caching.InMemoryCache();
        }

        private async Task<Models.FixerResponse> GetRates(string baseCurrency = null, string symbols = null)
        {
            using (var client = new HttpClient())
            {
                string baseParam = !string.IsNullOrWhiteSpace(baseCurrency) ? "base=" + baseCurrency : null;
                string symbolsParam = !string.IsNullOrWhiteSpace(symbols) ? "symbols=" + symbols : null;
                string uri = "https:" + "//api.fixer.io/latest?" + string.Join("&", new string[] { baseParam, symbolsParam });
                HttpResponseMessage response = await client.GetAsync(uri);
                if (response.IsSuccessStatusCode)
                {
                    return await response.Content.ReadAsAsync<Models.FixerResponse>();
                }
                else
                {
                    throw new Exception("Failed to get Fixer IO data: " + response.StatusCode.ToString() + " - " + response.ReasonPhrase);
                }
            }
        }

        public float GetGbpToEurRate()
        {
            var fixerResponse = _cacheProvider.GetOrSet("GBPtoEUR", DateTime.UtcNow.AddMinutes(10), () =>
            {
                // Task.Result causes a deadlock, Task.Wait() does not
                Models.FixerResponse r = null;
                Task.Run(async () =>
                {
                    r = await GetRates(FixerConstants.GBP, FixerConstants.EUR);
                }).Wait();
                return r;
            });
            return fixerResponse.rates.EUR.Value;
        }


    }
}
