import './Order.css'
import { useState } from 'react'
import {toast} from 'react-toastify'
import { useEffect } from 'react'
import axios from 'axios'
import { assets } from '../../assets/assets'

const Order = ({url}) => {

  const [orders,setOrders] = useState([]);

  const fetchAllOrders = async ()=>{
     const response = await axios.get(url+'/api/order/list');
     if (response.data.success) {
      setOrders(response.data.data)
     }
     else{
      toast.error('Error')
     }
  }

  useEffect(()=>{
   fetchAllOrders()
  },[])

    const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await axios.post(url + "/api/order/status", {
        orderId: orderId,
        status: newStatus,
      });
      if (res.data.success) {
        toast.success("Status Updated");
        fetchAllOrders(); // refresh orders to reflect update
      } else {
        toast.error("Error updating status");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
        <div className='order'>
        <div className='order-title'>
        <p></p>
        <h1>All Orders</h1>
      </div>
      <hr className='navbar-bottom-line' />
    </div>
      
      <div className='order add'>
      <h3>Orders Page</h3>
      <div className="order-list">
        {orders.map((order,index)=>(
          <div key={index} className="order-item">
         <img src={assets.parcel_icon} alt="" />
         <div>
          <p className='order-item-food'>
            {order.items.map((item,index)=>{
              if (index=order.items.length-1) {
                return item.name +' x '+item.quantity
              }
              else{
                 return item.name +' x '+item.quantity+' , '
              }
            })}
          </p>
          <p className="order-item-name">
            {order.address.firstName+' '+order.address.lastName}
          </p>
          <div className="order-item-address">
           <p>{order.address.street+', '}</p>
           <p>{order.address.city+', '+order.address.state+', '+order.address.country+', '+order.address.zipcode}</p> 
          </div>
          <p className='order-item-phone'>{order.address.phone}</p>
         </div>
         <p>Items : {order.items.length}</p>
         <p>₹{order.amount}</p>
         <select value={order.status}
            onChange={(e) => handleStatusChange(order._id, e.target.value)}>
          <option value="Start Packageing">Start Packageing</option>
          <option value="Out For Delivery">Out For Delivery</option>
          <option value="Deliverd">Deliverd</option>
         </select>
          </div>
        ))}
      </div>
    </div>


    </div>
 
  )
}

export default Order
