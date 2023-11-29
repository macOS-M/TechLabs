using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TECHLABS_DTO
{
    public class Laboratory : BaseEntity
    {
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Mail { get; set; }
        public string SocialName { get; set; }
        public string CommercialName { get; set; }
        public DateTime OpenTime { get; set; }
        public DateTime CloseTime { get; set; }
        public int Capacity { get; set; }
        public string WebAddress { get; set; }
        public string Photos { get; set; }
        public string Status { get; set; }
        public string CreatedBy { get; set; }
    }
}
