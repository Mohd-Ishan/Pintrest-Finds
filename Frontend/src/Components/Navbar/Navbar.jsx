import './Navbar.css'
 import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className='navbar'>
     <h1 className='logo'>PINTREST <br /> FINDS</h1>
    <ul className='navbar-menu'>
     <NavLink to='/'>Home</NavLink>
     <NavLink to='/cart'>Cart</NavLink> 
     <NavLink to="/product">Product</NavLink>
     <NavLink to='/aboutus'>About us</NavLink>
    </ul>  
    </div>
  )
}

export default Navbar
