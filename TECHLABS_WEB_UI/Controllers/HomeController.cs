using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Mail;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using System.Web.Services.Description;
using System.Web.UI.WebControls;
using TECHLABS_DTO;

using static System.Net.WebRequestMethods;

namespace TECHLABS_WEB_UI.Controllers
{
    public class HomeController : Controller
    {
        public OTP modelOTP;
        public User modelUser;


        public ActionResult Logout(){
            Session.Clear();
            return RedirectToAction("Index");
        }

        public ActionResult Index(){
            return View();
        }

        public ActionResult Login(){
            modelUser = new User();
            return View(modelUser);
        }

        [HttpPost]
        public ActionResult OTPPost(OTP otpInput)
        {
            

            var url = "https://localhost:44308";
            url = url + "/api/User/ProcessOTPValidation";
            url += string.Format("?otp={0}", otpInput.otp);               
            
            var cliente = new HttpClient();
            cliente.BaseAddress = new Uri(url);
            var result = cliente.GetAsync(url).Result;

            if (result.IsSuccessStatusCode)
            {
                var jsonObject = result.Content.ReadAsStringAsync().Result;
                var apiResponseOTP = JsonConvert.DeserializeObject<APIData>(jsonObject);

                if (apiResponseOTP.Result == "OK")
                {
                    User user = (User)TempData["TD"];

                    Session["user"] = true;
                    Session["user-name"] = user.Name;
                    Session["avatar"] = user.PhotoUrl;
                    Session["email"] = user.Email;
                    Session["role"] = user.DefectRole;
                    
                    if (user.DefectRole == 3 || user.DefectRole == 2) {
                        Session["manage-employees"] = 1;
                        Session["manage-tests"] = 1;
                        Session["manage-labs"] = 1;

                    }

                    if (user.DefectRole == 1)
                    {
                        Session["manage-employees"] = user.userPermissions.ManageEmployees;
                        Session["manage-tests"] = user.userPermissions.ManageTests;
                        Session["manage-labs"] = user.userPermissions.ManageLabs;

                    }

                    return View("Index");
                }
            }
          
            
            
            ViewBag.Message = "OTP incorrecto";
            return View("OTP");

           

        }

        [HttpPost]
        public ActionResult LoginPost(User user)
        {
            
            if (String.IsNullOrEmpty(user.Email) || String.IsNullOrEmpty(user.Password))
            {

                ViewBag.Message = string.Format("Usuario y/o contraseña incorrectas");
                
                return View("Login");
            }

            //var userID = user.UserId;
            //return View();
            //var url = ConfigurationManager.AppSettings["app-api-uri"];
            //var url = "https://localhost:44308";
            //url = url + "/api/User/ValidateLoging";

            var url = "https://localhost:44308/api/User/ValidateLoging";

            var cliente = new HttpClient();
            cliente.BaseAddress = new Uri(url);

            cliente.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
            string jsonData = JsonConvert.SerializeObject(user);

            var content = new StringContent(jsonData, System.Text.Encoding.UTF8, "application/json");

            var result = cliente.PostAsync(url, content).Result;

              if (result.IsSuccessStatusCode)
            {
                var jsonObject = result.Content.ReadAsStringAsync().Result;
                var apiResponseUser = JsonConvert.DeserializeObject<User>(jsonObject);
                if (apiResponseUser == null)
                {
                    ViewBag.Message = "Usuario y/o contraseña incorrectas";
                    return View("Login");
                }
                if (apiResponseUser.Estatus == 0) {
                    ViewBag.Message = "Usuario inactivo, contacte al administrador TechLabsP2@gmail.com";
                    return View("Login");

                }

                User userDB = apiResponseUser;

                Session["user"] = true;
                Session["user-id"] = userDB.Id;
                Session["user-name"] = userDB.Name;
                Session["avatar"] = userDB.PhotoUrl;
                Session["email"] = userDB.Email;
                Session["role"] = userDB.DefectRole;

                if (userDB.DefectRole == 3 || userDB.DefectRole == 2)
                {
                    Session["manage-employees"] = 1;
                    Session["manage-tests"] = 1;
                    Session["manage-labs"] = 1;

                }

                if (userDB.DefectRole == 1)
                {
                    Session["manage-employees"] = userDB.userPermissions.ManageEmployees;
                    Session["manage-tests"] = userDB.userPermissions.ManageTests;
                    Session["manage-labs"] = userDB.userPermissions.ManageLabs;

                }

                return View("Index");


                /*
                string method, contact;
                if (apiResponseUser.EmailActive == 1)
                {
                    method = "EMAIL";
                    contact = apiResponseUser.Email;
                  
                }
                else
                {
                    method = "SMS";
                    contact = apiResponseUser.Phone;
                  
                }



                var url_api = "https://localhost:44308";
                url_api = url_api + "/api/User/GenerateOTP?method=" + method + "&contact=" + contact;

                cliente = new HttpClient();
                cliente.BaseAddress = new Uri(url_api);

                APIData data = new APIData();

                cliente.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                jsonData = JsonConvert.SerializeObject(data);

                content = new StringContent(jsonData, System.Text.Encoding.UTF8, "application/json");

                result = cliente.PostAsync(url_api, content).Result;

                if (result.IsSuccessStatusCode)
                {

                    jsonObject = result.Content.ReadAsStringAsync().Result;
                    var apiResponseOTP = JsonConvert.DeserializeObject<APIData>(jsonObject);
                    if (apiResponseOTP.Result == "OK")
                    {
                        User dbUser = new User();
                        dbUser = apiResponseUser;
                        TempData["TD"] = dbUser;
                        Session["method"] = method;
                        Session["contact"] = contact;
                        return RedirectToAction("OTP");
                    }
                }


                */
            }
            else
                ViewBag.Message = "Usuario y/o password invalidos";
            return View("Login");
        }



        public ActionResult OTP()      
        {

            ViewData["contact"] = Session["contact"];
            ViewData["method"] = Session["method"];
            return View();
        }

        public ActionResult AdministrationPanel()
        {
            return View();
        }

        public ActionResult UserProfile()
        {
            return View();
        }
        public ActionResult LabRegister()
        {
            return View();
        }
        public ActionResult TestRegister()
        {
            return View();
        }

        public ActionResult TestInfo()
        {
            return View();
        }

        public ActionResult UserRegistration()
        {
           return View();
        }

        public ActionResult ManageUsers() {       
            return View();
        }

        public ActionResult MonkeyWare()
        {

            return View();
        }

        public ActionResult Citas()
        {
            return View();
        }

        public ActionResult EmployeeRegistration()
        {
            return View();
        }

        public ActionResult LabAdminRegistration() {
            return View();
        }
        public ActionResult TestAdmin()
        {

            return View();
        }
        public ActionResult LabsAdmin()
        {

            return View();
        }

        public ActionResult DashBoard()
        {
            return View();
        }

       

        public ActionResult Cart2()
        {
            return View();
        }

        public ActionResult OTPRecuperar()
        {
            return View();
        }
        
        public ActionResult RegistroMovimientos()
        {
            return View();
        }
    }

}