import React, { useContext, useState } from "react";
import "./Details.css";
import { useParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const ProductDetails = () => {

  const { id } = useParams(); // get id from URL
   const { Product_list, addToCart, url } = useContext(StoreContext);

   if (!Product_list) return <div>Loading...</div>;
   

     // find the product with matching id
  const product = Product_list.find((p) => p._id === id);
  

  if (!product) return <div>Product not found</div>;

  const { name, price, description, category, image } = product;

  const [selectedSize, setSelectedSize] = useState("");

  
  const [mainImage, setMainImage] = useState(`${url}/image/${image[0]}`); // default image
  
  const productImages = image? image.map(img => `${url}/image/${img}`) : [];




  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };
  return (
    <div className="product-details">
      <div className="image-section">
        <img src={mainImage} alt="Product" className="main-image" />
        <div className="thumbnail-row">
          {productImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`product-${i}`}
              className={`thumbnail ${mainImage === img ? "active" : ""}`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>

      <div className="info-section">
        <h2 className="product-title">{name}</h2>
        <p className="product-price">₹{price}</p>
        <p className="product-desc">
         {description}
        </p>

        <div className="size-section">
          <h4>Select Size</h4>
          <div className="sizes">
            {["6", "7", "8", "9", "10"].map((size) => (
              <button
                key={size}
                className={`size-btn ${selectedSize === size ? "selected" : ""}`}
                onClick={() => handleSizeClick(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button onClick={()=>addToCart(id)} className="add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;
