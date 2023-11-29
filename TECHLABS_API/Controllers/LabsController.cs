using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TECHLABS_DTO;
using TECLABS_APPLOGIC;

namespace TECHLABS_API.Controllers
{
    public class LabsController : ApiController
    {
        [HttpPost]
        public string RegisterLab(Laboratory l)
        {
            AdminLabs adminLabs = new AdminLabs();
            return adminLabs.RegisterLab(l);
        }

        [HttpDelete]
        public string DeleteLab(Laboratory l)
        {
            AdminLabs adminLabs = new AdminLabs();
            return adminLabs.DeleteLab(l);
        }

        [HttpPut]
        public string UpdateLab(Laboratory l)
        {
            AdminLabs adminLabs = new AdminLabs();
            return adminLabs.UpdateLab(l);
        }

        [HttpGet]
        public List<Laboratory> ReturnLabsForList(string username)
        {
            AdminLabs adminLabs = new AdminLabs();
            return adminLabs.ReturnLabsForListAdmin(username);
        }

        [HttpGet]
        public List<Laboratory> ReturnLabsForTestCreation(string username)
        {
            AdminLabs adminLabs = new AdminLabs();
            return adminLabs.ReturnLabsForTestCreation(username);
        }
    }
}