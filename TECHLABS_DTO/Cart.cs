using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TECHLABS_DTO
{
    public class Cart : BaseEntity 
    {
        public int OrderId { get; set; }
        public int TestId { get; set; }
        public int Count { get; set; }  




    }
}
