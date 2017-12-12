using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MvcCurrencyConverter.Core.Factories
{
    public class RepoFactory
    {
        public static CurrencyConversion.ICurrencyRepository CurrencyRepository
        {
            get { return new CurrencyConversion.CurrencyRepository(); }
        }
    }
}
