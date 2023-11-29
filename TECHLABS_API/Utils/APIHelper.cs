using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;

namespace TECHLABS_API.Utils
{
    public class APIHelper
    {
        public string InvokeGet(string uri) {
            var client = new HttpClient();
            client.BaseAddress = new Uri(uri);

            var result = client.GetAsync(uri).Result;

            if (result.IsSuccessStatusCode) { 
                string jsonObject = result.Content.ReadAsStringAsync().Result;
                return jsonObject;
                        
            }else
                throw new Exception(result.Content.ReadAsStringAsync().Result);
        }


      
    }
}