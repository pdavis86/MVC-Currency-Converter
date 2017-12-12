using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace MvcCurrencyConverter.Tests
{
    [TestClass]
    public class CurrencyRepository
    {
        [TestMethod]
        public void GbpToEuroIsNotZero()
        {
            var gbpToEur = Core.Factories.RepoFactory.CurrencyRepository.GetGbpToEurRate();
            Assert.IsTrue(gbpToEur != 0);
        }
    }
}
