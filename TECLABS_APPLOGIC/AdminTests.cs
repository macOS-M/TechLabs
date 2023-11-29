using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TECHLABS_DATA_ACESS.CRUD;
using TECHLABS_DTO;

namespace TECLABS_APPLOGIC
{
    public class AdminTests
    {
        public string RegisterTest(Test test)
        {
            TestCrudFactory testCrud = new TestCrudFactory();
            testCrud.Create(test);

            return "Success";
        }

        public string DeleteTest(Test test)
        {
            TestCrudFactory testCrud = new TestCrudFactory();
            testCrud.Delete(test);

            return "Success";
        }

        public string UpdateTest(Test test)
        {
            TestCrudFactory testCrud = new TestCrudFactory();
            testCrud.Update(test);

            return "Success";
        }

        public List<Test>GetTestsForAdmin(string user)
        {
            TestCrudFactory testCrud = new TestCrudFactory();
            return testCrud.RetrieveByAdminUser<Test>(user);
        }

    }
}
