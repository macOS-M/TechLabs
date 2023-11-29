using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TECHLABS_DATA_ACESS.DAO;
using TECHLABS_DTO;

namespace TECHLABS_DATA_ACESS.Mapper
{
    public class OrderMapper : ICrudStatements, IObjectMapper
    {
        public SqlOperation DeleteStatement(BaseEntity entityDTO)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetCreateStatement(BaseEntity entityDTO)
        {
            var order = (Order)entityDTO;
            var operation = new SqlOperation();

            operation.ProcedureName = "SP_Replace_CreateOrder";
            operation.AddIntegerParam("USER_ID", order.UserId);
            operation.AddIntegerParam("ORDER_ID", order.OrderId);
            operation.AddIntegerParam("TEST_ID", order.CoreTestId);

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
                ProcedureName = "SP_RetrieveOrder"
            };

            operation.AddIntegerParam("User_ID", id);

            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entityDTO)
        {
            var order = (Order)entityDTO;
            var operation = new SqlOperation();

            operation.ProcedureName = "SP_AddToCart";
            operation.AddIntegerParam("USER_ID", order.UserId);
            operation.AddIntegerParam("ORDER_ID", order.OrderId);
            operation.AddIntegerParam("TEST_ID", order.CoreTestId);

            return operation;
        }



        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var order = new Order
            {
                UserId = tryParseint(row["USER_ID"].ToString()),
                OrderId = tryParseint(row["PURCHASE_ID"].ToString()),
                Status = tryParseint(row["STATUS"].ToString()),
                CartId = tryParseint(row["CART_ID"].ToString()),
                LabId = tryParseint(row["LAB_ID"].ToString()),
            };

            return order;
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
}
