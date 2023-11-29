using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TECHLABS_DTO;
using TECHLABS_DATA_ACESS.CRUD;
using System.Net.Configuration;
using System.Diagnostics.Contracts;
//using IronBarCode;
//using ZXing;

namespace TECLABS_APPLOGIC
{
    public class AdminUsers
    {
        public string CreateNewUser(User user) {

            try
            {
                if (user.DefectRole == 1)
                {
                    Random random = new Random();
                    random.Next(100000, 999999);
                    user.Password = "@" + random.Next(100000, 999999) + "USER";
                }
                UserCrudFactory userCrud = new UserCrudFactory();
                userCrud.Create(user);

                if (user.DefectRole == 1) { 
                    AdminEmail adminEmail = new AdminEmail();

                    string msg;
                    var builder = new StringBuilder();
                    builder.Append("<strong>TECHLABS</strong><br/>");
                    builder.Append("Usted ha sido invitado a unirse como colaborador de TECHLABS<br/>");
                    builder.Append("Para iniciar sesión acceda al siguiente enlace https://localhost:44368/Home/Login?EMAIL="+user.Email+"&PASSWORD="+user.Password+"<br/>"); 
                    builder.Append("Su usuario es: " + user.Email +" "+"<br/>");
                    builder.Append("Su contraseña temporal es: " + user.Password);
                    builder.Append("");
                    msg = builder.ToString();

                    string subject = "Bienvenido a TECHLABS Work Force";
                    
                    adminEmail.SendWelcomeEmail(user.Email,subject,msg);

                }

                return "OK";



            }
            catch (Exception ex){
                return ex.Message;
            }
        }

        public string ModifyUser(User user)
        {
            try
            {
                UserCrudFactory userCrud = new UserCrudFactory();
                userCrud.Update(user);
                

                return "OK";
                

            }
            catch (Exception ex) {
                return  ex.Message;
            
            }           
        }

        public string ModifySelfProfile(User user)
        {
            try
            {
                UserCrudFactory userCrud = new UserCrudFactory();
                userCrud.UpdateSelfProfile(user);


                return "OK";


            }
            catch (Exception ex)
            {
                return ex.Message;

            }
        }

        public string ModifyPassword(User user)
        {
            try
            {
                UserCrudFactory userCrud = new UserCrudFactory();
                userCrud.UpdatePassword(user);


                return "OK";


            }
            catch (Exception ex)
            {
                return ex.Message;

            }
        }

        public User ProcessLoginValidation(User user)
        {
            try{
                if (!String.IsNullOrEmpty(user.Email))
                {
                    if (!string.IsNullOrEmpty(user.Password))
                    {
                        var userCrud = new UserCrudFactory();

                        User dBUser = userCrud.RetrieveByStringId<User>(user.Email).FirstOrDefault();
                        if (dBUser != null)
                        {
                            
                            if (user.Email.ToLower().Equals(dBUser.Email.ToLower()) && user.Password.Equals(dBUser.Password))
                            {
                                return dBUser;
                            }
                        }
                    }                   
                }
                return null;
            }
            catch (Exception ex){
                Console.WriteLine(ex.Message);
                return null;
            }
        }


        public List<User> ReturnAllUsers(string pEmail) {
            UserCrudFactory userCrud = new UserCrudFactory();
            return userCrud.RetrieveAll<User>(pEmail);
        }


        public User ReturnOneUser(User user)
        {                         
                    var userCrud = new UserCrudFactory();

                    User dBUser = userCrud.RetrieveByStringId<User>(user.Email).FirstOrDefault();
                    if (dBUser != null)
                    {                       
                            return dBUser;                        
                    }                                          
            return null;
        }


       // public GeneratedBarcode GenereQR() {

       //     GeneratedBarcode barcode = IronBarCode.BarcodeWriter.CreateBarcode("rerwe", BarcodeEncoding.QRCode);
       //     barcode.AddAnnotationTextAboveBarcode("My QR Code");
       //     barcode.AddAnnotationTextBelowBarcode("below");
       //     barcode.SaveAsJpeg("TEst.pdf");
        
       //     return barcode;

       //}
         

    }
}
