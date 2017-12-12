using System;
using System.Web.Mvc;
using System.Web.Routing;

namespace MvcCurrencyConverter.Site
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }

        protected void Application_Error(object sender, EventArgs e)
        {
            var error = Server.GetLastError();
            //todo: Log4Net
        }
    }
}
