import './Navbar.css'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
      <h1 className='logo'>PINTREST<br />FINDS ADMIN </h1>
     <ul className='navbar-menu'>
     <NavLink to='/add' >Add Items</NavLink>
     <NavLink to='/list'>List Itmes</NavLink> 
     <NavLink to="/orders">Orders</NavLink>
    </ul>  
    </div>
  )
}

export default Navbar
