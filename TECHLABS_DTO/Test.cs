using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TECHLABS_DTO
{
    public class Test : BaseEntity
    {
        public string Name { get; set; }
        public string Description {get; set;} 
        public string SampleReq {get; set;}
        public string Instructions {get; set;} 
        public string Method {get; set;}
        public string Reference {get; set;} 
        public int Cost {get; set;} 
        public int Category {get; set;}
        public int Lab { get; set; }
    }
}
