import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);
import axios from "axios";


const StoreContextProvider = (props) =>{

 const [cartItems,setCartItems] = useState({});

 const url = 'https://pintrest-finds.onrender.com';
 const [token,setToken] = useState('');
 const [Product_list,setProductList] = useState([])

 // add to cart 

 const addToCart = async(itemId)=>{
    if(!cartItems[itemId]){
      setCartItems((prev)=>({...prev,[itemId]:1}))
    }
    else{
         setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1})) 
    }
    if(token){
      await axios.post(url+'/api/cart/add',{itemId},{headers:{token}})
     }
 }

 const removeFromCart =async (itemId) =>{
  setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
   if (token) {
      await axios.post(url+'/api/cart/remove',{itemId},{headers:{token}})
     }
 }

    const getTotalCartAmount = ()=>{
     let totalAmount = 0;
     for(const item in cartItems)
    {
      if(cartItems[item] >0){
      let itemInfo = Product_list.find((product)=>product._id === item);
      totalAmount += itemInfo.price* cartItems[item]
      }
    }
     return totalAmount
   }

const fetchProductList = async ()=>{
    const response = await axios.get(url+"/api/product/list");
    setProductList(response.data.data)
   }

   const loadCartData = async (token) => {
  const response = await axios.post(url + '/api/cart/get',{},{ headers:{ token} });
  setCartItems(response.data.cartData || {}); // fallback to empty object
};


 const delivery_charge = 160;


    useEffect(()=>{
     async function loadData(){
      await fetchProductList()
        if( localStorage.getItem('token')){
     setToken(localStorage.getItem('token'))
     await loadCartData(localStorage.getItem('token'));
    }
     }
     loadData();
   },[])


const contextValue = {
url,  
delivery_charge,
Product_list,
cartItems,
setCartItems,
addToCart,
removeFromCart,
getTotalCartAmount,
token,
setToken,
fetchProductList
}

return(
  <StoreContext.Provider value={contextValue}>
    {props.children}
  </StoreContext.Provider>
)
}

export default StoreContextProvider;
