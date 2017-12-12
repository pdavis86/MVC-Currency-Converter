namespace MvcCurrencyConverter.Core.CurrencyConversion.Models
{
    public class FixerResponse
    {
        public string @base { get; set; }
        public string date { get; set; }
        public FixerRates rates { get; set; }
    }
}
