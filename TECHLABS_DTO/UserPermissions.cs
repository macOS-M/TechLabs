using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TECHLABS_DTO
{
    public class UserPermissions 
    {
        public int ManageLabs { get; set; }
        public int ManageTests { get; set; }
        public int ManageEmployees { get; set; }

        public int LabId { get; set; }  
    }
}
