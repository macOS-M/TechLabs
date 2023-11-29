using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TECHLABS_DATA_ACESS.CRUD;
using TECHLABS_DTO;

namespace TECLABS_APPLOGIC
{
    public class AdminLabs
    {
        public string RegisterLab(Laboratory lab)
        {
            LabCrudFactory labCrud = new LabCrudFactory();
            labCrud.Create(lab);

            return "Success";
        }

        public string UpdateLab(Laboratory lab)
        {
            LabCrudFactory labCrud = new LabCrudFactory();
            labCrud.Update(lab);

            return "Success";
        }
        public string DeleteLab(Laboratory lab)
        {
            LabCrudFactory labCrud = new LabCrudFactory();
            labCrud.Delete(lab);

            return "Success";
        }

        public List<Laboratory> ReturnLabsForTestCreation(string username)
        {
            LabCrudFactory labCrud = new LabCrudFactory();
            return labCrud.RetrieveByUserTestAdmin<Laboratory>(username);
        }

        public List<Laboratory> ReturnLabsForListAdmin(string username)
        {
            LabCrudFactory labCrud = new LabCrudFactory();
            return labCrud.RetrieveByUserAdmin<Laboratory>(username);
        }

    }
}

