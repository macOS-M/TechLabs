using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TECHLABS_DTO;

namespace TECHLABS_DATA_ACESS.Mapper
{
    public interface IObjectMapper
    {
        BaseEntity BuildObject(Dictionary<string, object> row);

        List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows);


    }
}
