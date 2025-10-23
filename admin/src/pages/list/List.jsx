import './List.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const List = ({url}) => {
  
  const [list, setList] = useState([]); 

  const fetchList = async ()=>{
    const response = await axios.get(`${url}/api/product/list`);
    if (response.data.success) {
      setList(response.data.data)
    }
    else{
      toast.error('Error')
    }
  }

  const removeFood = async(productId)=>{
   const response = await axios.post(`${url}/api/product/remove`, {id:productId})
   await fetchList();
   if(response.data.success){
   toast.success(response.data.message)
   }
   else{
    toast.error('error')
   }
  }

  useEffect(()=>{
    fetchList()
  },[])

  
  return (
    <div>
      <div className='list'> 
      <div className='list-title'>
        <p></p>
        <h1>List Items</h1>
      </div>
     <hr className='navbar-bottom-line' /> 
    </div>

       <div className='list add flex-col'>
    <p>All Food List</p>
    <div className="list-table">
       <div className="list-table-format title">
         <b>Image</b>
         <b>Name</b>
         <b>Category</b>
         <b>Price</b>
         <b>Action</b>
       </div>
       {list.map((item,index)=>{
       return (
        <div key={index} className='list-table-format'>

  <div className="list-images">
  {item.image && item.image.length > 0 ? (
    <img src={`${url}/image/${item.image[0]}`} alt={item.name} />
  ) : (
    <div className="no-image">No Image</div>
  )}
  </div>


          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>{item.price}</p>
          <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
        </div>
       )
       })}
    </div>
    </div>


    </div>
   
  )
}

export default List
