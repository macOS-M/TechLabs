using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TECHLABS_DTO;
using TECLABS_APPLOGIC;

namespace TECHLABS_API.Controllers
{
    public class UserController : ApiController
    {
        [HttpPost]
        public APIData UserRegistration(User user)
        {
            APIData resp = new APIData();          
            try { 
            AdminUsers adminUser = new AdminUsers();

                resp.Result = adminUser.CreateNewUser(user);
                if (resp.Result != "OK")
                {
                    resp.Message = "Error , no se ha podido registrar";
                }
                else if (resp.Result == "OK")
                {
                    resp.Message = "Registro completado con exito";
                }
                return resp;


            }
            catch (Exception ex)
            {
                resp.Message = ex.Message;
                resp.Result = "Error";
                return resp;
            }
        }

        [HttpPost]
        public APIData EmployeeRegistration(User user)
        {
            APIData resp = new APIData();
            try
            {
                AdminUsers adminUser = new AdminUsers();

                resp.Result = adminUser.CreateNewUser(user);
                if (resp.Result != "OK")
                {
                    resp.Message = "Error , no se ha podido registrar";
                }
                else if (resp.Result == "OK")
                {
                    resp.Message = "Registro completado con exito";
                }
                return resp;


            }
            catch (Exception ex)
            {
                resp.Message = ex.Message;
                resp.Result = "Error";
                return resp;
            }
        }

        [HttpPut]
        public APIData UpdateUser(User user)
        {
            APIData resp = new APIData();
            try
            {
                AdminUsers adminUser = new AdminUsers();

                resp.Result = adminUser.ModifyUser(user);
                if (resp.Result != "OK")
                {
                    resp.Message = "Error , no se ha podido actualizar";
                }
                else if (resp.Result == "OK")
                {
                    resp.Message = "Registro actualizado con éxito";
                }
                return resp;
            }
            catch (Exception ex)
            {
                resp.Message = ex.Message;
                resp.Result = "Error";
                return resp;
            }
        }


        [HttpPut]
        public APIData UpdateSelfProfile(User user)
        {
            APIData resp = new APIData();
            try
            {
                AdminUsers adminUser = new AdminUsers();

                resp.Result = adminUser.ModifySelfProfile(user);
                if (resp.Result != "OK")
                {
                    resp.Message = "Error , no se ha podido actualizar";
                }
                else if (resp.Result == "OK")
                {
                    resp.Message = "Registro actualizado con éxito";
                }
                return resp;
            }
            catch (Exception ex)
            {
                resp.Message = ex.Message;
                resp.Result = "Error";
                return resp;
            }
        }





        [HttpPost]
        public  APIData GenerateOTP(string method, string contact)
        {
            APIData resp = new APIData();
            try
            {
                AdminOTP adminOTP = new AdminOTP();

                resp.Result = adminOTP.GenerateAndStoreOTP(method, contact);
                if (resp.Result != "OK")
                {
                    resp.Message = "Error generando OTP";
                }
                else if (resp.Result == "OK") {
                    resp.Message = "OTP enviado con éxito";
                    
                }                
                return resp;               
            }
            catch (Exception ex) { 
                resp.Message = ex.Message;
                resp.Result = "Error";                
                return resp;           
            }           
        }

        [HttpGet]
        public APIData ProcessOTPValidation(int otp) {
            
            APIData resp = new APIData();
            try
            {
                AdminOTP adminOTP = new AdminOTP();
                resp.Result = adminOTP.ValidateOTPInput(otp);
                if (resp.Result != "OK")
                {
                    resp.Message = "Error validando OTP";
                }
                else if (resp.Result == "OK")
                {
                    resp.Message = "OTP confirmado";
                }
                return resp;
            }
            catch (Exception ex)
            {
                resp.Message = ex.Message;
                resp.Result = "Error";
                return resp;
            }
        }

        [HttpPost]
        public  User ValidateLoging(User User)
        {
            User userDB = new User();
            
            try {
                AdminUsers adminUser = new AdminUsers();
                 userDB = adminUser.ProcessLoginValidation(User);
                if (userDB == null)
                {
                    return null;
                }
                else 
                                  
                return userDB;
                       
            } catch (Exception ex) {
               Console.WriteLine(ex.Message);
               return null;
                
            }
        }

        [HttpGet]
        public List<User> RetrieveAllUsers(string email)
        {
            AdminUsers adminUser = new AdminUsers();
            return adminUser.ReturnAllUsers(email);
        }

        [HttpPost]
        public APIData RetrieveUserData(User User)
        {
            APIData apiData = new APIData();

            try
            {
                AdminUsers adminUser = new AdminUsers();
                apiData.Data = adminUser.ReturnOneUser(User);
                if (apiData.Data != null)
                {
                    apiData.Message = "Datos consultados con éxito";
                    apiData.Result = "OK";
                    return apiData;
                }
                else
                    apiData.Message = "Ha sucedido un error";
                    apiData.Result = "Error";

                    return apiData;

            }
            catch (Exception ex)
            {
                apiData.Message = ex.Message;
                apiData.Result = "Error";
                return apiData;

            }
        }

        [HttpPut]
        public APIData ChangePassword(User user)
        {
            APIData resp = new APIData();
            try
            {
                AdminUsers adminUser = new AdminUsers();

                resp.Result = adminUser.ModifyPassword(user);
                if (resp.Result != "OK")
                {
                    resp.Message = "Error , no se ha podido actualizar";
                }
                else if (resp.Result == "OK")
                {
                    resp.Message = "Registro actualizado con éxito";
                }
                return resp;
            }
            catch (Exception ex)
            {
                resp.Message = ex.Message;
                resp.Result = "Error";
                return resp;
            }
        }

    }
}
