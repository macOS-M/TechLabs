using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TECHLABS_DATA_ACESS.DAO;
using TECHLABS_DTO;

namespace TECHLABS_DATA_ACESS.Mapper
{
    internal interface ICrudStatements
    {
        SqlOperation GetCreateStatement(BaseEntity entityDTO);

        SqlOperation GetUpdateStatement(BaseEntity entityDTO);

        SqlOperation DeleteStatement(BaseEntity entityDTO);

        SqlOperation GetRetrieveByIdStatement(int id);

        SqlOperation GetRetrieveAllStatement();
    }
}
