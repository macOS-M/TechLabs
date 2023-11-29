using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TECHLABS_DATA_ACESS.Mapper;
using TECHLABS_DATA_ACESS.DAO;
using TECHLABS_DTO;



namespace TECHLABS_DATA_ACESS.CRUD
{
    public class UserCrudFactory : CrudFactory
    {
        private UserMapper userMapper;

        //Constructor
        public UserCrudFactory() : base() {
            userMapper = new UserMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity entityDTO)
        {
            var user = (User)entityDTO;
            var sqlOperation = userMapper.GetCreateStatement(user);

            dao.ExecuteStoredProcedure(sqlOperation);
        }

        public override void Delete(BaseEntity entityDTO)
        {
            var user = (User)entityDTO;
            var sqlOperation = userMapper.GetCreateStatement(user);

            dao.ExecuteStoredProcedure(sqlOperation);
        }

        public override void Update(BaseEntity entityDTO)
        {
            var user = (User)entityDTO;
            var sqlOperation = userMapper.GetUpdateStatement(user);

            dao.ExecuteStoredProcedure(sqlOperation);
        }


        public  void UpdateSelfProfile(BaseEntity entityDTO)
        {
            var user = (User)entityDTO;
            var sqlOperation = userMapper.GetUpdateSelfProfileStatement(user);

            dao.ExecuteStoredProcedure(sqlOperation);
        }




        public  void UpdatePassword(BaseEntity entityDTO)
        {
            var user = (User)entityDTO;
            var sqlOperation = userMapper.GetUpdatePassword(user);

            dao.ExecuteStoredProcedure(sqlOperation);
        }

        public override List<T> RetrieveAll<T>()//
        {
            /*var list = new List<T>();

            var listResult = dao.ExecuteStoredProcedureWithQuery(userMapper.GetRetrieveAllStatement());

            var dicc = new Dictionary<string, object>();

            if (listResult.Count > 0)
            {
                var objsUser = userMapper.BuildObjects(listResult);

                foreach (var c in objsUser)
                {
                    list.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }*/
            throw new NotImplementedException(); ;//list;
        }

        public  List<T> RetrieveAll<T>(string pEmail)//
        {
            var list = new List<T>();

            var listResult = dao.ExecuteStoredProcedureWithQuery(userMapper.GetRetrieveAllStatement(pEmail));

            var dicc = new Dictionary<string, object>();

            if (listResult.Count > 0)
            {
                var objsUser = userMapper.BuildObjects(listResult);

                foreach (var c in objsUser)
                {
                    list.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }
            return list;
        }

        public override List<T> RetrieveById<T>(int id)
        {
            throw new NotImplementedException();
        }

        public override List<T> RetrieveByStringId<T>(string id)
        {

            var list = new List<T>();

            var listResult = dao.ExecuteStoredProcedureWithQuery(userMapper.GetRetrieveByEmailIdStatement(id));
            var dicc = new Dictionary<string, object>();

            if (listResult.Count > 0)
            {
                var objsOTP = userMapper.BuildObjects(listResult);

                foreach (var c in objsOTP)
                {
                    list.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }
            return list;
        }

       


        
    }
}
