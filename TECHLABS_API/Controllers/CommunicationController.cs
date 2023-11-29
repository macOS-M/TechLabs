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
    public class CommunicationController : ApiController
    {
        [HttpPost]
        public string  enviarCorreo() { 
        
            AdminEmail adminEmail = new AdminEmail();
            //adminEmail.EviarEmailBienvenida();


            return "ok";
        }


        [HttpPost]
        public string EnviarSMS( /*Usuario usuario,*/  string tipo)
        {
            AdminSMS adminSMS = new AdminSMS();
            string msg = "";

            switch (tipo) {
                case "otp":
                    msg = "TECHLABS:" + "código" + "es su código de acceso.Expirará en 30 minutos. No compara este código con nadie.";
                break;
                case "reminder":
                    msg = "TECHLABS recordatorio de cita";
                    break;
            
            
            }

            //adminSMS.SendSMS();

            return "SMS Enviado";
        }

    }
}
