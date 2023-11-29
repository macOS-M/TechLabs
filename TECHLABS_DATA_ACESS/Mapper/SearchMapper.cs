using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TECHLABS_DATA_ACESS.DAO;
using TECHLABS_DTO;

namespace TECHLABS_DATA_ACESS.Mapper
{
    public class SearchMapper : EntityMapper, ICrudStatements, IObjectMapper
    { 

        private const string DB_COL_TYPE = "TYPE";
        private const string DB_COL_NAME = "NAME";
        private const string DB_COL_ID = "ID";
        private const string DB_COL_INFO = "INFO";


        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var result = new SearchResult()
            {
                Id = GetIntValue(row, DB_COL_ID),
                Name = GetStringValue(row, DB_COL_NAME),
                Type = GetStringValue(row, DB_COL_TYPE),
                Info = GetStringValue(row,DB_COL_INFO)
            };

            return result;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstrow)
        {
            var Results = new List<BaseEntity>();

            foreach(var row in lstrow)
            {
                var resultado = BuildObject(row);
                Results.Add(resultado);
            }

            return Results;
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

        public SqlOperation GetRetrieveSearch(string Name)
        {
            var operation = new SqlOperation()
            {
                ProcedureName = "SEARCH_BY_NAME"
            };

            operation.AddVarcharParam("INPUT", Name);

            return operation;
        }

        public SqlOperation GetRetrieveAllTags()
        {
            var operation = new SqlOperation()
            {
                ProcedureName = "RETRIEVE_TAGS"
            };

            return operation;
        }

        public SqlOperation GetRetrieveSearchByTags(string Name)
        {
            var operation = new SqlOperation()
            {
                ProcedureName = "RETRIEVE_BY_TAG"
            };

            operation.AddVarcharParam("TAG", Name);

            return operation;
        }

        public SqlOperation GetRetrieveAll()
        {
            var operation = new SqlOperation()
            {
                ProcedureName = "RETRIEVE_ALL"
            };

            return operation;
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetrieveExamsByLab(int Id)
        {
            var operation = new SqlOperation()
            {
                ProcedureName = "GET_EXAMS_BY_LAB"
            };

            operation.AddIntegerParam("LAB_ID", Id);

            return operation;
        }
    }
}
