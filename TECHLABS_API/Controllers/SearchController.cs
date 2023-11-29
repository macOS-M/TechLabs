using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Xml.Linq;
using TECHLABS_DTO;
using TECLABS_APPLOGIC;

namespace TECHLABS_API.Controllers
{
    public class SearchController : ApiController
    {
        [HttpGet]
        [Route("api/search/{Name}")]
        public APIData search(string Name)
        {

            try {

                var Admin = new adminSearch();
                var searchResults = Admin.retrieveSearch(Name);

                return new APIData()
                {
                    Data = searchResults,
                    Message = "search completada",
                    Result = "ok"
                };
            }
            catch(Exception ex)
            {
                return new APIData()
                {
                    Data = "ERROR",
                    Message = ex.Message,
                    Result = "Error"
                };
            }
        }

        [HttpGet]
        [Route("api/search/")]
        public APIData GetAll()
        {
            try
            {
                var Admin = new adminSearch();
                var searchResults = Admin.retrieveAll();

                return new APIData()
                {
                    Data = searchResults,
                    Message = "search completada",
                    Result = "ok"
                };

            }
            catch (Exception ex)
            {

                return new APIData()
                {
                    Data = "ERROR",
                    Message = ex.Message,
                    Result = "Error"
                };
            }

        }



        [HttpGet]
        [Route("api/search/allTags/")]
        public APIData allTags()
        {
            try {
                var Admin = new adminSearch();
                var searchResults = Admin.retrieveAllTags();

                return new APIData()
                {
                    Data = searchResults,
                    Message = "search completada",
                    Result = "ok"
                };

            }
            catch(Exception ex){

                return new APIData()
                {
                    Data = "ERROR",
                    Message = ex.Message,
                    Result = "Error"
                };

            }
        }

        [HttpGet]
        [Route("api/search/tags/{Name}")]
        public APIData TagSearch(string Name)
        {

            try
            {

                var Admin = new adminSearch();
                var searchResults = Admin.retrieveTagByName(Name);

                return new APIData()
                {
                    Data = searchResults,
                    Message = "search completada",
                    Result = "ok"
                };
            }
            catch (Exception ex)
            {
                return new APIData()
                {
                    Data = "ERROR",
                    Message = ex.Message,
                    Result = "Error"
                };
            }

        }

        [HttpGet]
        [Route("api/search/Tests/lab/{id}")]
        public APIData GetTestsByLab(int Id)
        {

            try
            {

                var Admin = new adminSearch();
                var searchResults = Admin.RetrieveTestByLab(Id);

                return new APIData()
                {
                    Data = searchResults,
                    Message = "search completada",
                    Result = "ok"
                };
            }
            catch (Exception ex)
            {
                return new APIData()
                {
                    Data = "ERROR",
                    Message = ex.Message,
                    Result = "Error"
                };
            }

        }
    }
}
