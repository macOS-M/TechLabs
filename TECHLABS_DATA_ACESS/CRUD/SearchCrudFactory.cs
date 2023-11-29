using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using TECHLABS_DATA_ACESS.DAO;
using TECHLABS_DATA_ACESS.Mapper;
using TECHLABS_DTO;

namespace TECHLABS_DATA_ACESS.CRUD
{
   public class SearchCrudFactory : CrudFactory
    {
        private SearchMapper Mapper;

        public SearchCrudFactory()
        {
            Mapper = new SearchMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity entityDTO)
        {
            throw new NotImplementedException();
        }

        public override void Delete(BaseEntity entityDTO)
        {
            throw new NotImplementedException();
        }

        public override List<T> RetrieveAll<T>()
        {
            var ListaResultados = new List<T>();
            var Result = dao.ExecuteStoredProcedureWithQuery(Mapper.GetRetrieveAll());

            if (Result.Count > 0)
            {
                var objs = Mapper.BuildObjects(Result);
                foreach (var c in objs)
                {
                    ListaResultados.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return ListaResultados;
        }

        public override List<T> RetrieveById<T>(int id)
        {
            throw new NotImplementedException();
        }

        public override List<T> RetrieveByStringId<T>(string id)
        {
            throw new NotImplementedException();
        }

        public override void Update(BaseEntity entityDTO)
        {
            throw new NotImplementedException();
        }

        public List<T> RetrieveBySearch<T>(string Name)
        {
            var ListaResultados = new List<T>();
            var Result = dao.ExecuteStoredProcedureWithQuery(Mapper.GetRetrieveSearch(Name));

            if (Result.Count > 0)
            {
                var objs = Mapper.BuildObjects(Result);
                foreach (var c in objs)
                {
                    ListaResultados.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return ListaResultados;
        }

        public List<T> RetrieveAllTags<T>()
        {
            var ListaResultados = new List<T>();
            var Result = dao.ExecuteStoredProcedureWithQuery(Mapper.GetRetrieveAllTags());

            if (Result.Count > 0)
            {
                var objs = Mapper.BuildObjects(Result);
                foreach (var c in objs)
                {
                    ListaResultados.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return ListaResultados;
        }

        public List<T> RetrieveByTags<T>(string Name)
        {
            var ListaResultados = new List<T>();
            var Result = dao.ExecuteStoredProcedureWithQuery(Mapper.GetRetrieveSearchByTags(Name));

            if (Result.Count > 0)
            {
                var objs = Mapper.BuildObjects(Result);
                foreach (var c in objs)
                {
                    ListaResultados.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return ListaResultados;
        }

        public List<T> RetrieveExamsByLab<T>(int Id)
        {
            var ListaResultados = new List<T>();
            var Result = dao.ExecuteStoredProcedureWithQuery(Mapper.GetRetrieveExamsByLab(Id));

            if (Result.Count > 0)
            {
                var objs = Mapper.BuildObjects(Result);
                foreach (var c in objs)
                {
                    ListaResultados.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return ListaResultados;
        }
    }
}
