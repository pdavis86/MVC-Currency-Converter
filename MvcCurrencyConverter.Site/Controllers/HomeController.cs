using System.Web.Mvc;

namespace MvcCurrencyConverter.Site.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult GetGbpToEur()
        {
            var gbpToEur = Core.Factories.RepoFactory.CurrencyRepository.GetGbpToEurRate();
            return new JsonResult()
            {
                Data = gbpToEur
            };
        }


    }
}