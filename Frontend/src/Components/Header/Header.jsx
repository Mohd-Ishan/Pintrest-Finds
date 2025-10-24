import { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './Header.css'
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Header = ({setShowlogin}) => {

  const {token,setToken} = useContext(StoreContext);

   const navigate = useNavigate();

   const logout = ()=>{
     localStorage.removeItem('token');
     setToken('');
     navigate('/')
   }

  const videoData = [
    {
      src: assets.video4,
      title: 'LANCOME',
      subtitle: '[ GIFTING CAMPAIGN ]'
    },
    {
      src: assets.video2,
      title: 'COPERNI',
      subtitle: '[ FALL COLLECTION ]'
    },
    {
      src: assets.video6,
      title: 'MCM',
      subtitle: '[ NEW SEASON LAUNCH ]'
    }
  ]

  const [current, setCurrent] = useState(0)

  const nextVideo = () =>{
     setCurrent((prev) => (prev + 1) % videoData.length)
  }
const prevVideo = () => {setCurrent((prev) => (prev - 1 + videoData.length) % videoData.length)
  }

  const handleVideoEnd = () => {
    nextVideo()
  }
  return (
    <div className="header">
      <video
        key={videoData[current].src}
        src={videoData[current].src}
        autoPlay
        muted
        loop={false}
        playsInline
        onEnded={handleVideoEnd}
        className="header-video"
      ></video>

      <div className="overlay">
        <div className="side-controls">
          <button onClick={nextVideo} className="arrow-btn"><IoIosArrowForward /></button>
          <div className="video-number">
            {String(current + 1).padStart(2, '0')}
          </div>
          <button onClick={prevVideo} className="arrow-btn"><IoIosArrowBack/></button>
        </div>

        <ul className='header-link'>
          <a href='/mens'>Mens</a>
          <a href='/watch'>Watch</a>
          <a href='/shoes'>Shoes</a>
          <a href='/myorders'>My Order</a>
          {!token?<button onClick={()=>setShowlogin(true)}>Sign up</button>:
            <button onClick={logout} >Logout</button> 
          }
        </ul>
         
        <div className='btn-div'>
        <a href='/project' className='all-btn'><FaArrowRight /></a>
         </div>
       <a href="/project"> <label className='all-product'>View Projects</label> </a> 
         
       

        {/* Center text */}
        <div className="video-info">
          <h1 className="video-title">{videoData[current].title}</h1>
          <p className="video-subtitle">{videoData[current].subtitle}</p>
        </div>
      </div>
    </div>
  )
}

export default Header
