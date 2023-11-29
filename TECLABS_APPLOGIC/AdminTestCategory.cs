using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TECHLABS_DATA_ACESS.CRUD;
using TECHLABS_DTO;

namespace TECLABS_APPLOGIC
{
    public class AdminTestCategory
    {
        public List<TestCategory> ReturnAllTestCategories()
        {
            TestCategoryCrudFactory tcCrudFactory = new TestCategoryCrudFactory();
            return tcCrudFactory.RetrieveAll<TestCategory>();
        }
    }
}
