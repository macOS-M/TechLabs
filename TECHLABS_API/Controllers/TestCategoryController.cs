using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TECHLABS_DTO;
using TECLABS_APPLOGIC;

namespace TECHLABS_API.Controllers
{
    public class TestCategoryController : ApiController
    {
        [HttpGet]
        public List<TestCategory> ReturnAllTestCategories()
        {
            AdminTestCategory admin = new AdminTestCategory();

            return admin.ReturnAllTestCategories();
        }
    }
}