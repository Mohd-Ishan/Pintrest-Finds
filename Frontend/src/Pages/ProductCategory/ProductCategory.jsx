import React, { useContext } from 'react'
import './ProductCategory.css'
import { StoreContext } from '../../context/StoreContext'
import ProductCard from '../../Components/Product-Card/ProductCard'

const ProductCategory = (props) => {

    document.title='Product Category';
  
  const {Product_list} = useContext(StoreContext)
  return (
     <div className='Product-category'>
      <div className='Product-sort'>
        <p>FILTER BY</p>
        <h1> <a href="/mens">Mens</a></h1>
        <h1> <a href="/women">Womens</a></h1>
        <h1> <a href="/shoes">Shoes</a></h1>
        <h1> <a href="/watch">Watch</a></h1>
      </div>
      <hr />
      <h1 className='Product-category-title'>Products</h1>
            <div className="shopcategory-products">
        {Product_list.map((curElem,index)=>{
           if(props.category===curElem.category){
            return <ProductCard key={index} id={curElem._id}
          name={curElem.name} description={curElem.description} 
          price={curElem.price} 
          image={curElem.image}
          category={curElem.category}/>
           }else{
            return null
           }
        })}
      </div>
       <hr className='bottom-category-hr' />
       <h1 className='bottom--category-title'>the end</h1>
    </div>
  )
}

export default ProductCategory




 
