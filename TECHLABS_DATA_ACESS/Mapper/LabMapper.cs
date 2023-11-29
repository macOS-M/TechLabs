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
    public class LabMapper : ICrudStatements, IObjectMapper
    {
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var lab = new Laboratory()
            {
                Id = int.Parse(row["LAB_ID"].ToString()),
                Name = row["NAME"].ToString(),
                Mail = row["MAIL"].ToString(),
                CommercialName = row["COMMERCIAL_NAME"].ToString(),
                Capacity = tryParseint(row["DAILY_CAPACITY"].ToString()),
                OpenTime = DateTime.Parse(row["OPEN_TIME"].ToString()),
                CloseTime = DateTime.Parse(row["CLOSE_TIME"].ToString()),
                SocialName = row["SOCIAL_NAME"].ToString(),
                WebAddress = row["WEB_SITE"].ToString(),
                Status = row["STATU__ID"].ToString(),
                Phone = row["PHONE"].ToString()
            };
            return lab;
      //      l.[LAB_ID]
      //,[NAME]
      //,[MAIL]
      //,[COMMERCIAL_NAME]
      //,[DAILY_CAPACITY]
      //,[OPEN_TIME]
      //,[CLOSE_TIME]
      //,[SOCIAL_NAME]
      //,[WEB_SITE]
      //,[STATU__ID]
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
        private int tryParseint(string value)
        {
            int valueint = 0;
            if (int.TryParse(value, out valueint))
            {
                return valueint;
            }
            else { return 0; }

        }

        public SqlOperation DeleteStatement(BaseEntity entityDTO)
        {
            var operation = new SqlOperation()
            {
                ProcedureName = "SP_DeleteLab"
            };

            var lab = (Laboratory)entityDTO;
            operation.AddIntegerParam("LAB_ID", lab.Id);


            return operation;
        }

        public SqlOperation GetCreateStatement(BaseEntity entityDTO)
        {
            var operation = new SqlOperation()
            {
                ProcedureName = "SP_AddLab"
            };

            var lab = (Laboratory)entityDTO;
            operation.AddVarcharParam("NAME", lab.Name);
            operation.AddVarcharParam("MAIL", lab.Mail);
            operation.AddVarcharParam("COMMERCIAL_NAME", lab.CommercialName);
            operation.AddIntegerParam("DAILY_CAPACITY", lab.Capacity);
            operation.AddDateTimeParam("OPEN_TIME", lab.OpenTime);
            operation.AddDateTimeParam("CLOSE_TIME", lab.CloseTime);
            operation.AddVarcharParam("SOCIAL_NAME", lab.SocialName);
            operation.AddVarcharParam("WEB_SITE", lab.WebAddress);
            operation.AddVarcharParam("PHOTOS", lab.Photos);
            operation.AddVarcharParam("CREATED_BY", lab.CreatedBy);
            operation.AddVarcharParam("PHONE", lab.Phone);

            return operation;

     //       @NAME
		   //,@MAIL
     //      ,@COMMERCIAL_NAME
     //      ,@DAILY_CAPACITY
     //      ,@OPEN_TIME
     //      ,@CLOSE_TIME
     //      ,@SOCIAL_NAME
     //      ,@WEB_SITE
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            throw new NotImplementedException();
        }


        public SqlOperation GetRetrieveByIdStatement(int id)
        {
            throw new NotImplementedException();
        }
        public SqlOperation GetRetrieveByTestAdmin(string user)
        {
            var operation = new SqlOperation()
            {
                ProcedureName = "SP_GetLabsForTestAdmin"
            };

            operation.AddVarcharParam("user", user);


            return operation;
        }

        public SqlOperation GetRetrieveByAdmin(string user)
        {
            var operation = new SqlOperation()
            {
                ProcedureName = "SP_GetLabsForAdminUser"
            };

            operation.AddVarcharParam("user", user);


            return operation;
        }



        public SqlOperation GetUpdateStatement(BaseEntity entityDTO)
        {
            var operation = new SqlOperation()
            {
                ProcedureName = "SP_UpdateLab"
            };

            var lab = (Laboratory)entityDTO;
            operation.AddIntegerParam("LAB_ID", lab.Id);
            operation.AddVarcharParam("NAME", lab.Name);
            operation.AddVarcharParam("MAIL", lab.Mail);
            operation.AddVarcharParam("COMMERCIAL_NAME", lab.CommercialName);
            operation.AddIntegerParam("DAILY_CAPACITY", lab.Capacity);
            operation.AddDateTimeParam("OPEN_TIME", lab.OpenTime);
            operation.AddDateTimeParam("CLOSE_TIME", lab.CloseTime);
            operation.AddVarcharParam("SOCIAL_NAME", lab.SocialName);
            operation.AddVarcharParam("WEB_SITE", lab.WebAddress);
            operation.AddVarcharParam("PHONE", lab.Phone);

            return operation;
        }
    }
}
