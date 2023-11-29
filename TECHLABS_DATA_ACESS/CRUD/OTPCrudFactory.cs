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
    public class OTPCrudFactory : CrudFactory{

        private OTPMapper mapper;

        public OTPCrudFactory() : base()
        {
            mapper = new OTPMapper();
            dao = SqlDao.GetInstance();
        }


        public override void Create(BaseEntity entityDTO)
        {
            var otp = (OTP)entityDTO;
            var sqlOperation = mapper.GetCreateStatement(otp);

            dao.ExecuteStoredProcedure(sqlOperation);
        }

        public override void Delete(BaseEntity entityDTO)
        {
            throw new NotImplementedException();
        }

        public override List<T> RetrieveAll<T>()
        {
            throw new NotImplementedException();
        }

        public override List<T> RetrieveById<T>(int id)
        {
            var list = new List<T>();

            var listResult = dao.ExecuteStoredProcedureWithQuery(mapper.GetRetrieveByIdStatement(id));
            var dicc = new Dictionary<string, object>();

            if (listResult.Count > 0)
            {
                var objsOTP = mapper.BuildObjects(listResult);

                foreach (var c in objsOTP)
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
            throw new NotImplementedException();
        }
    }

}

