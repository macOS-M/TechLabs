using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TECHLABS_DATA_ACESS.CRUD;
using TECHLABS_DTO;

namespace TECLABS_APPLOGIC
{
    public class adminSearch
    {
        public List<SearchResult> retrieveSearch(string Name)
        {
            var crud = new SearchCrudFactory();
            var Resultados = crud.RetrieveBySearch<SearchResult>(Name);
            return Resultados;
        }

        public List<SearchResult> retrieveAllTags()
        {
            var crud = new SearchCrudFactory();
            var Resultados = crud.RetrieveAllTags<SearchResult>();
            return Resultados;
        }

        public List<SearchResult> retrieveTagByName(string Name)
        {
            var crud = new SearchCrudFactory();
            var Resultados = crud.RetrieveByTags<SearchResult>(Name);
            return Resultados;
        }

        public List<SearchResult> retrieveAll()
        {
            var crud = new SearchCrudFactory();
            var Resultados = crud.RetrieveAll<SearchResult>();
            return Resultados;
        }

        public List<SearchResult> RetrieveTestByLab(int Id)
        {
            var crud = new SearchCrudFactory();
            var Resultados = crud.RetrieveExamsByLab<SearchResult>(Id);
            return Resultados;
        }
    }
}
