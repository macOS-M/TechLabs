using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TECHLABS_DATA_ACESS;
using TECHLABS_DATA_ACESS.DAO;
using TECHLABS_DTO;

namespace TECHLABS_DATA_ACESS.CRUD
{
    public abstract class CrudFactory{

        protected SqlDao dao;

        public abstract void Create(BaseEntity entityDTO);

        public abstract void Update(BaseEntity entityDTO);
        public abstract void Delete(BaseEntity entityDTO);
        public abstract List<T> RetrieveAll<T>();

        public abstract List<T> RetrieveById<T>(int id);

        public abstract List<T> RetrieveByStringId<T>(string id);

    }
}
