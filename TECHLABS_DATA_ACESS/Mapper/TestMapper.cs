using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using TECHLABS_DATA_ACESS.DAO;
using TECHLABS_DTO;

namespace TECHLABS_DATA_ACESS.Mapper
{
    public class TestMapper : ICrudStatements, IObjectMapper
    {
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var test = new Test()
            {
                Id = int.Parse(row["TEST_ID"].ToString()),
                Name = row["NAME"].ToString(),
                Description = row["DESCRIPTION"].ToString(),
                SampleReq = row["SAMPLE_REQUIRED"].ToString(),
                Instructions = row["INSTRUCTIONS"].ToString(),
                Method = row["METHODOLOGY"].ToString(),
                Reference = row["REFERENCE"].ToString(),
                Cost = int.Parse(row["COST"].ToString()),
                Category = int.Parse(row["CATEGORY_ID"].ToString()),
                Lab = int.Parse(row["LAB_ID"].ToString()),
                
            };
            return test;
                //TEST_ID
                //NAME
                //DESCRIPTION
                //SAMPLE_REQUIRED
                //INSTRUCTIONS
                //METHODOLOGY
                //REFERENCE
                //COST
                //LAB_ID
                //CATEGORY_ID
        
                //STATU__ID
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var obj = BuildObject(row);
                lstResults.Add(obj);
            }
            return lstResults;
        }


        public SqlOperation GetCreateStatement(BaseEntity entityDTO)
        {
            var operation = new SqlOperation()
            {
                ProcedureName = "SP_AddTest"
            };

            var test = (Test)entityDTO;
            operation.AddVarcharParam("NAME", test.Name);
            operation.AddVarcharParam("DESCRIPTION", test.Description);
            operation.AddVarcharParam("SAMPLE_REQUIRED", test.SampleReq);
            operation.AddVarcharParam("INSTRUCTIONS", test.Instructions);
            operation.AddVarcharParam("METHODOLOGY", test.Method);
            operation.AddVarcharParam("REFERENCE", test.Reference);
            operation.AddIntegerParam("COST", test.Cost);
            operation.AddIntegerParam("LAB_ID", test.Lab);
            operation.AddIntegerParam("CATEGORY_ID", test.Category);

            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entityDTO)
        {
            var operation = new SqlOperation()
            {
                ProcedureName = "SP_UpdateTest"
            };

            var test = (Test)entityDTO;
            operation.AddIntegerParam("TEST_ID", test.Id);
            operation.AddVarcharParam("NAME", test.Name);
            operation.AddVarcharParam("DESCRIPTION", test.Description);
            operation.AddVarcharParam("SAMPLE_REQUIRED", test.SampleReq);
            operation.AddVarcharParam("INSTRUCTIONS", test.Instructions);
            operation.AddVarcharParam("METHODOLOGY", test.Method);
            operation.AddVarcharParam("REFERENCE", test.Reference);
            operation.AddIntegerParam("COST", test.Cost);
            operation.AddIntegerParam("LAB_ID", test.Lab);
            operation.AddIntegerParam("CATEGORY_ID", test.Category);

            return operation;
        }

        public SqlOperation DeleteStatement(BaseEntity entityDTO)
        {
            var operation = new SqlOperation()
            {
                ProcedureName = "SP_DeleteTest"
            };

            var test = (Test)entityDTO;
            operation.AddIntegerParam("TEST_ID", test.Id);

            return operation;
        }

        public SqlOperation GetRetrieveByAdminUser(string user)
        {
            var operation = new SqlOperation()
            {
                ProcedureName = "SP_GetTestForAdmin"
            };

            operation.AddVarcharParam("USER", user);

            return operation;
        }


        public SqlOperation GetRetrieveByIdStatement(int id)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            throw new NotImplementedException();
        }
    }
}
