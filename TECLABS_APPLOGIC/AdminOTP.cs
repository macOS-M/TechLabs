using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TECHLABS_DATA_ACESS.CRUD;
using TECHLABS_DTO;
using static SendGrid.BaseClient;
using Twilio.Types;
using System.Data.SqlClient;

namespace TECLABS_APPLOGIC
{
    public class AdminOTP
    {
        public string GenerateAndStoreOTP(string pMethod, string pContact)
        {
            Random random = new Random();

            var oneTimePassword = new OTP()
            {
                otp = random.Next(100000, 999999),
                otpCreation = DateTime.Now,
                otpExpiration = DateTime.Now.AddMinutes(5),
                otpUsed = 0
            };

            OTPCrudFactory oTPCrud = new OTPCrudFactory();
            oTPCrud.Create(oneTimePassword);


            SubmitOTPToUser(oneTimePassword.otp, pMethod, pContact);

            return "OK";
        }
        private void SubmitOTPToUser(int pCode, string pMethod, string pContact)
        {


            string msg = "";

            switch (pMethod)
            {
                case "SMS":
                    AdminSMS adminSMS = new AdminSMS();
                    msg = "TECHLABS: " + pCode + " es su código de acceso.Expirará en 5 minutos. No compara este código con nadie.";
                    adminSMS.SendSMS(pContact, msg);
                    break;
                case "EMAIL":
                    AdminEmail adminEmail = new AdminEmail();
                    var builder = new StringBuilder();
                    builder.Append("<strong>TECHLABS</strong><br/>");
                    builder.Append("El código de seguridad es :<strong> " + pCode + "</strong>");
                    builder.Append("  Este código expirará en 5 minutos. No comparta este código con nadie.");
                    msg = builder.ToString();

                    string subject = "Código de verificación";
                    adminEmail.SendOTPEmail(pContact, subject, msg);
                    break;


            }



        }

        public string ValidateOTPInput(int pCode)
        {

            string isValid = "Error";
            DateTime currentTime = DateTime.Now;
            var otpCrudFactory = new OTPCrudFactory();


            OTP otpList = otpCrudFactory.RetrieveById<OTP>(pCode).FirstOrDefault();

            if (otpList == null) {

                isValid = "Error";
            }else
               
            if (otpList.otp == pCode && otpList.otpExpiration > currentTime && otpList.otpUsed !=1)
                {
                    isValid = "OK";
                }
            



            return isValid;
        }

    }
}
