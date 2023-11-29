using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TECHLABS_DATA_ACESS.CRUD;
using TECHLABS_DTO;

namespace TECLABS_APPLOGIC
{
    public class AdminOrder
    {
        public string AddToCart(Order order)
        {
            var orderCrud = new OrderCrudFactory();
            orderCrud.Update(order);

            return "ok";
        }

        public string ReplaceOrderWithNewOrder(Order order)
        {
            var orderCrud = new OrderCrudFactory();
            orderCrud.Create(order);

            return "ok";
        }

        public Order ReturnOrderData(int id)
        {
            var orderCrud = new OrderCrudFactory();
            Order order = orderCrud.RetrieveById<Order>(id).FirstOrDefault();
            return order;
        }


    }
}
