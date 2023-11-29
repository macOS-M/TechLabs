using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TECHLABS_WEB_UI.Controllers
{
    public class CatalogController : Controller
    {
        public ActionResult Catalog()
        {
            return View();
        }

        public ActionResult Results()
        {
            return View();
        }
    }
}