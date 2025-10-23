import { useContext } from 'react'
import './Projects.css'
import { StoreContext } from '../../context/StoreContext'
import ProjectCard from '../../Components/Project-card/ProjectCart'

const Projects = () => {

  const {Product_list} =useContext(StoreContext)
  return (
    <div className='Product'>
       <div className='Product-sort'>
        <p>COMING SOON</p>
        <h1>Upcoming projects</h1>
      </div>
      <hr />
      <h1 className='Product-title'>Products</h1>
      <div className='Product-grid'>
        {
          Product_list.map((curElem,index)=>{
          return <ProjectCard key={index} id={curElem._id}
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

export default Projects

