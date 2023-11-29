using System.Collections.Generic;
using System.Web.Http;
using TECHLABS_DTO;
using TECLABS_APPLOGIC;


namespace TECHLABS_API.Controllers
{
    public class TestController : ApiController
    {
        [HttpPost]
        public string RegisterTest(Test t)
        {
            AdminTests adminTests = new AdminTests();
            return adminTests.RegisterTest(t);
        }

        [HttpPut]
        public string UpdateTest(Test t)
        {
            AdminTests adminTests = new AdminTests();
            return adminTests.UpdateTest(t);
        }

        [HttpGet]
        public List<Test> GetTestsForAdmin(string user)
        {
            AdminTests adminTests = new AdminTests();
            return adminTests.GetTestsForAdmin(user);
        }

        [HttpDelete]
        public string DeleteTest(Test t)
        {
            AdminTests adminTests = new AdminTests();
            return adminTests.DeleteTest(t);
        }
    }
}