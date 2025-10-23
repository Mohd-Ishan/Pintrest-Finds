import { useContext } from 'react'
import './Products.css'
import ProductCard from '../../Components/Product-Card/ProductCard'
import { StoreContext } from '../../context/StoreContext'

const Products = () => {

  const {Product_list} =useContext(StoreContext)
  return (
    <div className='Product'>
      <div className='Product-sort'>
        <p>Available</p>
        <h1>All Products</h1>
      </div>
      <hr />
      <h1 className='Product-title'>Products</h1>
      <div className='Product-grid'>
        {
          Product_list.map((curElem,index)=>{
          return <ProductCard key={index} id={curElem._id}
          name={curElem.name} description={curElem.description} 
          price={curElem.price} 
          image={curElem.image}
          category={curElem.category}/>
          })
        }
      </div>
       <hr className='bottom-hr' />
       <h1 className='bottom-title'>the end</h1>
    </div>
  )
}

export default Products
