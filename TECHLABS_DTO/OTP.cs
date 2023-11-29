using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TECHLABS_DTO
{
    public class OTP : BaseEntity
    {
        public int otp { get; set; }
        public DateTime otpCreation { get; set;}
        public DateTime otpExpiration { get; set; }
        public int otpUsed{ get; set; }



    }
}
