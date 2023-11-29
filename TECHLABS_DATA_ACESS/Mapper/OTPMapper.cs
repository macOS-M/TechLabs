using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TECHLABS_DATA_ACESS.DAO;
using TECHLABS_DTO;

namespace TECHLABS_DATA_ACESS.Mapper
{
    public class OTPMapper : ICrudStatements, IObjectMapper
    {

        #region CRUD Methods
        public SqlOperation DeleteStatement(BaseEntity entityDTO)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetCreateStatement(BaseEntity entityDTO)
        {
            var operation = new SqlOperation()
            {
                ProcedureName = "SP_CreateOTP"
            };

            var otp = (OTP)entityDTO;
           
            operation.AddIntegerParam("OTP", otp.otp);
            operation.AddDateTimeParam("CREATION", otp.otpCreation);
            operation.AddDateTimeParam("EXPIRATION", otp.otpExpiration);
            operation.AddIntegerParam("USED", otp.otpUsed);
            

            return operation;


        }

        public SqlOperation GetRetrieveAllStatement()
        {
            throw new NotImplementedException();
        }
      

        public SqlOperation GetRetrieveByIdStatement(int id)
        {
            var operation = new SqlOperation()
            {
                ProcedureName = "SP_RetrieveOTPById"
            };

            operation.AddIntegerParam("OTP", id);

            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entityDTO)
        {
            throw new NotImplementedException();
        }
        #endregion

        #region Object Mapper Methods
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var oneTimePassword = new OTP {

                Id = int.Parse(row["OTP_ID"].ToString()),
                otp = int.Parse(row["OTP"].ToString()),
                otpCreation = DateTime.Parse(row["CREATION"].ToString()),
                otpExpiration = DateTime.Parse(row["EXPIRATION"].ToString()),
                otpUsed = int.Parse(row["USED"].ToString())

            };

            return oneTimePassword;
            
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var oneTimePassword = BuildObject(row);
                lstResults.Add(oneTimePassword);
            }

            return lstResults;
        }

        #endregion


    }


}

