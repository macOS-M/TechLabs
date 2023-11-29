using SendGrid.Helpers.Mail;
using SendGrid;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace TECLABS_APPLOGIC
{
    public class AdminEmail
    {
        public string SendOTPEmail(string toEmail ,string emailSubject, string emailBody) {

            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("TechLabsP2@gmail.com", "TECHLABS");
            var subject = emailSubject;
            var to = new EmailAddress(toEmail);
            var plainTextContent = "and easy to do anywhere, even with C#";
            var htmlContent =  emailBody;
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = client.SendEmailAsync(msg);

            if (response != null)
                return "Ok";
            else
                return "Fail";
        }


        public string SendWelcomeEmail(string toEmail, string emailSubject, string emailBody)
        {
            

            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("TechLabsP2@gmail.com", "TECHLABS");
            var subject = emailSubject;
            var to = new EmailAddress(toEmail);
            var plainTextContent = "and easy to do anywhere, even with C#";
            var htmlContent = emailBody;
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = client.SendEmailAsync(msg);

            if (response != null)
                return "Ok";
            else
                return "Fail";
        }

    }
}
