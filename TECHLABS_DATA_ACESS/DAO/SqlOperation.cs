using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TECHLABS_DATA_ACESS.DAO
{
        public class SqlOperation
        {
            public string ProcedureName { get; set; }

            //LISTA DE PARAMETROS QUE SE VAN A ENVIAR:
            public List<SqlParameter> Parameters { get; set; }

            //CONSTRUCTOR:
            public SqlOperation()
            {
                Parameters = new List<SqlParameter>();
            }

            //AGREGA UN PARAMETRO VARCHAR:
            public void AddVarcharParam(string paramName, string paramValue)
            {
                Parameters.Add(new SqlParameter("@"+paramName, paramValue));
            }

        //AGREGA UN PARAMETRO INT:
            public void AddIntegerParam(string paramName, int paramValue)
            {
            Parameters.Add(new SqlParameter("@" + paramName, paramValue));
            }

        //AGREGA UN PARAMETRO SMALL INT:
        public void AddSmallIntParam(string paramName, int paramValue)
            {
                var param = new SqlParameter("@" + paramName, SqlDbType.SmallInt)
                {
                    Value = paramValue
                };
                Parameters.Add(param);
            }

            //AGREGA UN PARAMETRO DOUBLE:
            public void AddDoubleParam(string paramName, double paramValue)
            {
                var param = new SqlParameter("@" + paramName, SqlDbType.Decimal)
                {
                    Value = paramValue
                };
                Parameters.Add(param);
            }

            //AGREGA UN PARAMETRO DATE TIME:
            public void AddDateTimeParam(string paramName, DateTime paramValue)
            {
                var param = new SqlParameter("@" + paramName, SqlDbType.DateTime)
                {
                    Value = paramValue
                };
                Parameters.Add(param);
            }



        //AGREGA UN PARAMETRO DATE:
        public void AddDate(string paramName, DateTime paramValue)
            {
                var param = new SqlParameter("@" + paramName, SqlDbType.Date)
                {
                    Value = paramValue
                };
                Parameters.Add(param);
            }

        }
}
