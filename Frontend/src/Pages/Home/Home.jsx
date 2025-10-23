import React from 'react'
import Header from '../../Components/Header/Header'
import './Home.css'

const Home = ({setShowlogin}) => {
  return (
    <div className='home'>
      <Header setShowlogin={setShowlogin} />
    </div>
  )
}

export default Home
