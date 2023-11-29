using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TECHLABS_DATA_ACESS.DAO;
using TECHLABS_DTO;

namespace TECHLABS_DATA_ACESS.Mapper
{
    public class TestCategoryMapper : ICrudStatements, IObjectMapper
    {

        public SqlOperation GetRetrieveAllStatement()
        {
            var operation = new SqlOperation()
            {
                ProcedureName = "SP_getCategory"
            };

            return operation;
        }

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var testCategory = new TestCategory()
            {
                Id = int.Parse(row["CATEGORY_ID"].ToString()),
                Category = row["CATEGORY_NAME"].ToString()
            };
            return testCategory;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var testCategory = BuildObject(row);
                lstResults.Add(testCategory);
            }
            return lstResults;
        }

        public SqlOperation DeleteStatement(BaseEntity entityDTO)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetCreateStatement(BaseEntity entityDTO)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetrieveByIdStatement(int id)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetUpdateStatement(BaseEntity entityDTO)
        {
            throw new NotImplementedException();
        }
    }
}
