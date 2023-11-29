using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TECHLABS_DATA_ACESS.DAO;
using TECHLABS_DATA_ACESS.Mapper;
using TECHLABS_DTO;

namespace TECHLABS_DATA_ACESS.CRUD
{
    public class LabCrudFactory : CrudFactory
    {
        private LabMapper mapper;

        public LabCrudFactory() : base()
        {
            mapper = new LabMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity entityDTO)
        {
            var lab = (Laboratory)entityDTO;
            var sqlOperation = mapper.GetCreateStatement(lab);

            dao.ExecuteStoredProcedure(sqlOperation);
        }

        public override void Delete(BaseEntity entityDTO)
        {
            var lab = (Laboratory)entityDTO;
            var sqlOperation = mapper.DeleteStatement(lab);

            dao.ExecuteStoredProcedure(sqlOperation);
        }

        public override List<T> RetrieveAll<T>()
        {
            throw new NotImplementedException();
        }

        public override List<T> RetrieveById<T>(int id)
        {
            throw new NotImplementedException();
        }

        public List<T> RetrieveByUserTestAdmin<T>(string user)
        {
            var list = new List<T>();

            var listResult = dao.ExecuteStoredProcedureWithQuery(mapper.GetRetrieveByTestAdmin(user));

            var dicc = new Dictionary<string, object>();

            if (listResult.Count > 0)
            {
                var objsPedido = mapper.BuildObjects(listResult);

                foreach (var c in objsPedido)
                {
                    list.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }
            return list;
        }
        public List<T> RetrieveByUserAdmin<T>(string user)
        {
            var list = new List<T>();

            var listResult = dao.ExecuteStoredProcedureWithQuery(mapper.GetRetrieveByAdmin(user));

            var dicc = new Dictionary<string, object>();

            if (listResult.Count > 0)
            {
                var objsPedido = mapper.BuildObjects(listResult);

                foreach (var c in objsPedido)
                {
                    list.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }
            return list;
        }

        public override List<T> RetrieveByStringId<T>(string id)
        {
            throw new NotImplementedException();
        }

        public override void Update(BaseEntity entityDTO)
        {
            var lab = (Laboratory)entityDTO;
            var sqlOperation = mapper.GetUpdateStatement(lab);

            dao.ExecuteStoredProcedure(sqlOperation);
        }
    }
}
