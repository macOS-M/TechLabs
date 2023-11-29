using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TECHLABS_DTO
{
    public class Order : BaseEntity
    {
        public int UserId { get; set; }
        public int OrderId { get; set; }
        public int Status { get; set; }
        public int CartId { get; set; }
        public int LabId { get; set; }
        public int CoreTestId { get; set; }
       



    }
}
