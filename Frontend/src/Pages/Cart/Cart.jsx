import { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from "react-router-dom";

const Cart = () => {
   
  const {cartItems,Product_list,removeFromCart,getTotalCartAmount, delivery_charge,url,token} = useContext(StoreContext);

  

   const navigate = useNavigate();
  
  return (
    <div className='cart'>
      <hr className='upper-line' />
       <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr className='bottom-line' />
      <div>

    {Product_list.map((item,index)=>{
     if(cartItems[item._id] >0 ){
      return (
      <>
     <div className='cart-items'>
  <img src={`${url}/image/${item.image[0]}`} alt="" />
  <div className="cart-item-info">
    <p>{item.name}</p>
    <p className="price">₹{item.price}</p>
  </div>
  <div className="quantity-total">
    <p>Qty: {cartItems[item._id]}</p>
    <p>Total: ₹{item.price * cartItems[item._id]}</p>
  </div>
  <p className='remove-btn' onClick={() => removeFromCart(item._id)}>X</p>
</div>  
      <hr className='bottom-line' />
      
      </>)
     }
    })}
      </div>
          <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount()===0?0:delivery_charge}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount()===0?0:getTotalCartAmount() + delivery_charge}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
      <hr className='bottom-hr' />
       <h1 className='bottom-text'>the end</h1>
    </div>
  )
}

export default Cart
