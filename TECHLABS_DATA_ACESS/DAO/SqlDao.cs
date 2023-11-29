using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;

namespace TECHLABS_DATA_ACESS.DAO{
    public class SqlDao{
        private string CONNECTION_STRING = String.Empty;

        private static SqlDao instance = new SqlDao();

        private SqlDao()
        {
            //var builder = new SqlConnectionStringBuilder();

            //builder.DataSource = @"LAPTOP-CVHOHDJB\SQLEXPRESS";
            //builder.InitialCatalog = "TECH_LABS_DB";
            //builder.IntegratedSecurity = true;

            //CONNECTION_STRING = builder.ToString();
            CONNECTION_STRING = ConfigurationManager.ConnectionStrings["TechLabs-DB"].ConnectionString;


        }


        public static SqlDao GetInstance()
        {
            if (instance == null)
            {
                instance = new SqlDao();
            }
            return instance;

        }


        public void ExecuteStoredProcedure(SqlOperation operation)
        {
            var connection = new SqlConnection(this.CONNECTION_STRING);
            var command = new SqlCommand();

            command.Connection = connection;
            command.CommandText = operation.ProcedureName;
            command.CommandType = CommandType.StoredProcedure;

            foreach (var param in operation.Parameters)
            {

                command.Parameters.Add(param);
            }

            connection.Open();
            command.ExecuteNonQuery();

        }

        public List<Dictionary<string, object>> ExecuteStoredProcedureWithQuery(SqlOperation operation)
        {
            var listaResultado = new List<Dictionary<string, object>>();
            var connection = new SqlConnection(this.CONNECTION_STRING);
            var command = new SqlCommand();

            command.Connection = connection;
            command.CommandText = operation.ProcedureName;
            command.CommandType = CommandType.StoredProcedure;

            foreach (var param in operation.Parameters)
            {
                command.Parameters.Add(param);
            }

            connection.Open();
            var reader = command.ExecuteReader();

            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    var dicc = new Dictionary<string, object>();

                    for (var fieldCounter = 0; fieldCounter < reader.FieldCount; fieldCounter++)
                    {
                        dicc.Add(reader.GetName(fieldCounter), reader.GetValue(fieldCounter));
                    }
                    listaResultado.Add(dicc);
                }

            }
            return listaResultado;
        }



    }
}

