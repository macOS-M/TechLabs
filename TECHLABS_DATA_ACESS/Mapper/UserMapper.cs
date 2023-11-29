using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using TECHLABS_DATA_ACESS.DAO;
using TECHLABS_DTO;

namespace TECHLABS_DATA_ACESS.Mapper
{
    public class UserMapper : ICrudStatements, IObjectMapper
    {

        #region CRUD Methods
        public SqlOperation DeleteStatement(BaseEntity entityDTO)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetCreateStatement(BaseEntity entityDTO)
        {
            var user = (User)entityDTO;
            var operation = new SqlOperation();

            operation.AddVarcharParam("FIRST_NAME", user.Name);
            operation.AddVarcharParam("EMAIL", user.Email);
            operation.AddVarcharParam("LAST_NAME", user.LastName);
            operation.AddVarcharParam("SECOND_LAST_NAME", user.SecondLastName);
            operation.AddVarcharParam("PHONE", user.Phone);
            operation.AddVarcharParam("PASSWORD", user.Password);
            operation.AddVarcharParam("PHOTO_URL", user.PhotoUrl);
            operation.AddIntegerParam("STATUS_ID", user.Estatus);
            operation.AddIntegerParam("DEFECT_ROLE_ID", user.DefectRole);
            operation.AddIntegerParam("SMS_PREFERED", user.SMSActive);
            operation.AddIntegerParam("EMAIL_PREFERED", user.EmailActive);


            if (user.DefectRole == 0 || user.DefectRole == 2)
            {
                operation.ProcedureName = "SP_CreateUser";
               
                return operation;

            }
            else
                operation.ProcedureName = "SP_CreateNonClientUser";

            operation.AddIntegerParam("LAB_ID", user.userPermissions.LabId);
            operation.AddIntegerParam("MANAGE_LABS", user.userPermissions.ManageLabs);
            operation.AddIntegerParam("MANAGE_TESTS", user.userPermissions.ManageTests);
            operation.AddIntegerParam("MANAGE_EMPLOYEES", user.userPermissions.ManageEmployees);


            return operation;

        }
                                         
        public SqlOperation GetRetrieveByIdStatement(int id)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetrieveAllStatement(string pEmail)
        {
            var operation = new SqlOperation()
            {
                ProcedureName = "SP_RetrieveAllUsers"
            };

            operation.AddVarcharParam("adminEmail", pEmail);

            return operation;
        }
        
        public SqlOperation GetRetrieveByEmailIdStatement(String pEmail)
        {
            var operation = new SqlOperation()
            {
                ProcedureName = "SP_RetrieveByEmailId"
            };

            operation.AddVarcharParam("EMAIL", pEmail);

            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entityDTO)
        {
            var operation = new SqlOperation() { ProcedureName = "SP_ManageOtherUserProfile" };

            var user = (User)entityDTO;
            operation.AddIntegerParam("USER_ID", user.Id);
            operation.AddVarcharParam("FIRST_NAME", user.Name);           
            operation.AddVarcharParam("LAST_NAME", user.LastName);
            operation.AddVarcharParam("SECOND_LAST_NAME", user.SecondLastName);
            operation.AddVarcharParam("PHONE", user.Phone);
            operation.AddVarcharParam("EMAIL", user.Email);
            operation.AddVarcharParam("PASSWORD", user.Password);
            operation.AddVarcharParam("PHOTO_URL", user.PhotoUrl);
            operation.AddIntegerParam("STATUS_ID", user.Estatus);
            operation.AddIntegerParam("DEFECT_ROLE_ID", user.DefectRole);
            operation.AddIntegerParam("SMS_PREFERED", user.SMSActive);
            operation.AddIntegerParam("EMAIL_PREFERED", user.EmailActive);

           if (user.DefectRole == 1){              
                operation.AddIntegerParam("LAB_ID", user.userPermissions.LabId);
                operation.AddIntegerParam("MANAGE_LABS", user.userPermissions.ManageLabs);
                operation.AddIntegerParam("MANAGE_TESTS", user.userPermissions.ManageTests);
                operation.AddIntegerParam("MANAGE_EMPLOYEES", user.userPermissions.ManageEmployees);
                return operation;               
            }

            if(user.userPermissions == null) { 
                operation.AddIntegerParam("LAB_ID",0);
                operation.AddIntegerParam("MANAGE_LABS", 0);
                operation.AddIntegerParam("MANAGE_TESTS", 0);
                operation.AddIntegerParam("MANAGE_EMPLOYEES",0);
            }

            return operation;
        }

        public SqlOperation GetUpdateSelfProfileStatement(BaseEntity entityDTO)
        {
            var operation = new SqlOperation()
            {
                ProcedureName = "SP_UpdateSelfProfile"
            };

            var user = (User)entityDTO;
            operation.AddIntegerParam("USER_ID", user.Id);
            operation.AddVarcharParam("FIRST_NAME", user.Name);
            operation.AddVarcharParam("LAST_NAME", user.LastName);
            operation.AddVarcharParam("SECOND_LAST_NAME", user.SecondLastName);
            operation.AddVarcharParam("PHONE", user.Phone);
            operation.AddVarcharParam("EMAIL", user.Email);
            operation.AddVarcharParam("PASSWORD", user.Password);
            operation.AddVarcharParam("PHOTO_URL", user.PhotoUrl);
            operation.AddIntegerParam("STATUS_ID", user.Estatus);
            operation.AddIntegerParam("DEFECT_ROLE_ID", user.DefectRole);
            operation.AddIntegerParam("SMS_PREFERED", user.SMSActive);
            operation.AddIntegerParam("EMAIL_PREFERED", user.EmailActive);

            return operation;
        }


        public SqlOperation GetUpdatePassword(BaseEntity entityDTO) {

            var operation = new SqlOperation()
            {
                ProcedureName = "SP_UpdatePassword"
            };

            var user = (User)entityDTO;
            operation.AddVarcharParam("EMAIL", user.Email);
            operation.AddVarcharParam("PASSWORD", user.Password);

            return operation;
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            throw new NotImplementedException();
        }
        #endregion

        #region Object Mapper Methods
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {

            var user = new User
            {
                

                Id = int.Parse(row["USER_ID"].ToString()),
                Email = row["EMAIL"].ToString(),
                Name = row["FIRST_NAME"].ToString(),
                LastName = row["LAST_NAME"].ToString(),
                SecondLastName = row["SECOND_LAST_NAME"].ToString(),
                Phone = row["PHONE"].ToString(),
                Password = row["PASSWORD"].ToString(),
                PhotoUrl = row["PHOTO_URL"].ToString(),
                Estatus = int.Parse(row["STATUS_ID"].ToString()),
                DefectRole = int.Parse(row["DEFECT_ROLE_ID"].ToString()),
                SMSActive = int.Parse(row["SMS_PREFERED"].ToString()),
                EmailActive = int.Parse(row["EMAIL_PREFERED"].ToString())            
                
            };

     
            var userPermissions = new UserPermissions
            {
                    LabId = tryParseint(row["LAB_ID"].ToString()),
                    ManageLabs = tryParseint(row["MANAGE_LABS"].ToString()),
                    ManageTests = tryParseint(row["MANAGE_TESTS"].ToString()),
                    ManageEmployees = tryParseint(row["MANAGE_EMPLOYEES"].ToString())
           };
                user.userPermissions = userPermissions;
                return user;
        }

        private int tryParseint(string value)
        {
            int valueint = 0;


            if (int.TryParse(value, out  valueint))
            {
                return valueint;
            }
            else { return 0; }

        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var users = BuildObject(row);
                lstResults.Add(users);
            }

            return lstResults;
           
        }
    

      
    }
    #endregion
}
