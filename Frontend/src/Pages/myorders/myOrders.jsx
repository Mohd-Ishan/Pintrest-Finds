import React from 'react'
import './myOrders.css'
import { useState } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'

const MyOrders = () => {

    document.title='My Order';

   const {url,token}= useContext(StoreContext);
  const [data,setData] = useState([]);

  const fetchOrders = async()=>{
    const response = await axios.post(url+'/api/order/userorders',{},{headers:{token}});
    setData(response.data.data);
    console.log(response.data.data);
    
  }

  useEffect(()=>{
    if (token) {
      fetchOrders();
    }
  },[token])


  console.log(data);
  console.log(data.status);
  
  

  return (
    <>
      <div className='order'>
        <div className='order-title'>
        <p></p>
        <h1>My Orders</h1>
      </div>
      <hr className='navbar-bottom-line' />
    </div>
     <div className='my-orders'>
       <h2>My Orders</h2>
       <div className="container">
       {data.map((order,index)=>{
     return(
    <div key={index} className='my-orders-order'>
       <img src={assets.parcel_icon} alt="" />
       <p>{order.items.map((item,index)=>{
         if (index === order.items.length-1 ) {
           return item.name+' x '+item.quantity 
         }else{
          return item.name+' x '+item.quantity+", " 
         }
       })}</p>
       <p>₹{order.amount}.00</p>
       <p>Items : {order.items.length}</p>
       <p><span>&#x25cf;</span><b>{order.status}</b></p>
       <button onClick={fetchOrders}>Track Order</button>

       {order.status === 'Deliverd' && (
         <button 
           className='delete-btn' 
           onClick={async () => {
             try {
               await axios.delete(`${url}/api/order/${order._id}`, { headers: { token } });
               setData(prev => prev.filter(o => o._id.toString() !== order._id.toString()));
               alert('Order deleted successfully');
               fetchOrders(); // Refetch all orders from backend
             } catch (err) {
               alert(err.response?.data?.message || 'Error deleting order');
             }
           }}
         >
           Delete Order
         </button>
       )}
    </div>
  )
})}
       </div>
    </div>
    </>
   
  )
}

export default MyOrders
