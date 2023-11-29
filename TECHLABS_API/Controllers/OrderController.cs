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
    public class OrderController : ApiController
    {

        [HttpGet]
        public APIData GetOrderData(int userID)
        {
            AdminOrder adminOrder = new AdminOrder();


            APIData apiData = new APIData();
            apiData.Data = adminOrder.ReturnOrderData(userID);
            apiData.Result = "OK";
            apiData.Message = "Sucess";


            return apiData;
        }


        [HttpPut]
        public APIData CreateNewOrder(Order order)
        {
            APIData resp = new APIData();
            try
            {
                AdminOrder adminOrder = new AdminOrder();

                resp.Result = adminOrder.ReplaceOrderWithNewOrder(order);
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
        public APIData UpdateCart(Order order)
        {
            APIData resp = new APIData();
            try
            {
                AdminOrder adminOrder = new AdminOrder();

                resp.Result = adminOrder.AddToCart(order);
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
