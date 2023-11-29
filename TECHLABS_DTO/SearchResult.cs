using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TECHLABS_DTO
{
    public class SearchResult : BaseEntity
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string Info { get; set; }
    }
}
