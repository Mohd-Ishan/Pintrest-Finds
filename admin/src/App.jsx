import React from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Add from './pages/Add/Add'
import Order from './pages/Orders/Order'
import List from './pages/list/List'
import { Route, Routes } from 'react-router-dom';
 import { ToastContainer} from 'react-toastify';

const App = () => {

  const url = 'https://pintrest-finds.onrender.com'

  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <Routes>
       <Route path='/add' element={<Add url={url}/>}/>
       <Route path='/list' element={<List url={url}/>}/>
       <Route path='/orders' element={<Order url={url}/>}/>
      </Routes>
    </div>
  )
}

export default App
