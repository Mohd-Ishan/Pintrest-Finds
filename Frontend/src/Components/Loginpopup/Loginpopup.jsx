import { useContext, useState } from 'react'
import './Loginpopup.css'
import {assets} from '../../assets/assets'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'

const Loginpopup = ({setShowLogin}) => {

  const {url,setToken} = useContext(StoreContext);



   const [currState, setCurrState] = useState('Login')
   const [data,setData] = useState({
    name:'',
    email:'',
    password:''
   })

   const onChangeHandler = (event)=>{
     const {name,value} = event.target;
     setData(data=>({...data,[name]:value}))
   }

   const onLogin = async (e) =>{

       e.preventDefault()

         let newUrl = url;
       if(currState === 'Login'){
       newUrl += '/api/user/login'
       }
       else{
          newUrl += '/api/user/register'
       }

     const response = await axios.post(newUrl,data);

     if(response.data.success){
       setToken(response.data.token);
       localStorage.setItem('token',response.data.token);
       setShowLogin(false)
     }
     else{
       alert(response.data.message)
     }

       
   }

  return (
        <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="cross icon" />
        </div>
        <div className="login-popup-inputs">
          {currState==="Login"?<></>:<input type="text" name='name' onChange={onChangeHandler} value={data.name} required placeholder='Your Name' />}
          
          <input type="email" name='email' onChange={onChangeHandler}
           value={data.email} placeholder='Your Email' required autoComplete='off' />

          <input type="password" name='password' onChange={onChangeHandler}
           value={data.password} placeholder='Password' required 
          autoComplete='off' />
        </div>
        <button type='submit'>{currState === 'Sign Up'?'Create account':'Login'}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & Privacy Policy.</p>
        </div>
        {currState === 'Login'
        ? <p>Create a new accout? <span onClick={()=>setCurrState("Sign Up")}>Click Here</span></p>
        : <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login Here</span></p>
      }  
      </form>
    </div>
  )
}

export default Loginpopup
