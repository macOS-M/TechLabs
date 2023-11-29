using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TECHLABS_DTO
{
    public class User : BaseEntity
    {


        public string Email { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string SecondLastName { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
        public string PhotoUrl { get; set; }
        public int Estatus { get; set; }
        public int DefectRole { get; set; }
        public int SMSActive { get; set; }
        public int EmailActive { get; set; }      
        public UserPermissions userPermissions { get; set; }



    }        
    
}
