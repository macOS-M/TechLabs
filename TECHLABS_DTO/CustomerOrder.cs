using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TECHLABS_DTO
{
    public class CustomerOrder : BaseEntity
    {

        public int BuyerId { get; set; }
        public DateTime PurchaseDate { get; set; }
        public int Status { get; set; }
        public int TempTestID { get; set; }

        


    }
}
