import { motion } from "framer-motion";
import "./ProductCard.css";
import { useContext, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";

const ProductCard = ({ id, name, price, category, image }) => {


  const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext)
  
  
  return (
    <motion.div
      className="product-card" 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ scale: 0.97, filter: "brightness(1.3)"  }} // subtle card scale on hover
    >
        
      <div className="image-container">
        <motion.img
          src={`${url}/image/${image[0]}`}
          alt={name}
          className="product-image"
        />
        <div className="overlay">
           
          <div className="item-add-btn"> 
            {
              !cartItems[id]? <div   onClick={()=>addToCart(id)}><CiSquarePlus /></div>:<div className="addcart-btn" > 
                 <button onClick={()=>removeFromCart(id)} className="arrow-btn">-</button>
                 <div className="video-number">{cartItems[id]}</div>
                 <button onClick={()=>addToCart(id)} className="arrow-btn">+</button>
                 
              </div>
            }   
          </div>


          <motion.div
            className="text-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }} >


            <h2 className="product-title">{name}</h2>
            <p className="product-subtitle">'24 GIFTING CAMPAIGN</p>
            <div className="tags">
              <span>₹{price}</span>
              <span>{category}</span>
            <Link to={`/product/${id}`}><span>Details</span></Link>
            </div>
          </motion.div>



        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
