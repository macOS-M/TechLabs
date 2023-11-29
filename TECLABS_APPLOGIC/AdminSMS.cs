using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace TECLABS_APPLOGIC
{
    public class AdminSMS
    {

        public void SendSMS(string pContact, string pMsg) {

            // Find your Account SID and Auth Token at twilio.com/console
            // and set the environment variables. See http://twil.io/secure
            string accountSid = "ACc1734c5821707ca69951684b7e4815e7";
            string authToken = "7e8960bd375e31dac20010cd5140aad8";

            TwilioClient.Init(accountSid, authToken);

            var message = MessageResource.Create(
                body: pMsg,
                from: new Twilio.Types.PhoneNumber("+19804436621"),
                to: new Twilio.Types.PhoneNumber("+506"+pContact)
            //+50670368375
            ); ;
            Console.WriteLine(message.Sid);



        }



    }
}
