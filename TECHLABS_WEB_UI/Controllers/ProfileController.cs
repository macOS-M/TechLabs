using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TECHLABS_WEB_UI.Controllers
{
    public class ProfileController : Controller
    {
        public ActionResult ExamProfile()
        {
            return View();
        }

        public ActionResult LabProfile()
        {
            return View();
        }
    }
}