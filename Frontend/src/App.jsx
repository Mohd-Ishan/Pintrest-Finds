import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/navbar/navbar';
import Home from './Pages/Home/Home';
import Cart from './Pages/Cart/Cart';
import Products from './Pages/Products/Products';
import Projects from './Pages/Projects/Projects';
import './App.css';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import Loginpopup from './Components/Loginpopup/Loginpopup';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder';
import ProductCategory from './Pages/ProductCategory/ProductCategory';
import Verify from './Pages/verify/Verify';
import MyOrders from './Pages/myorders/myOrders';
import ProductDetails from './Pages/Detailspage/Details';
import { StoreContext } from './context/StoreContext';
import Preloader from './Components/PreLoader/PreLoader';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [showlogin, setShowlogin] = useState(false);
  const { Product_list } = useContext(StoreContext);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      // First visit → show preloader
      setLoading(true);
      localStorage.setItem("hasVisited", "true");

      const timer = setTimeout(() => setLoading(false), 3000); // your preloader delay
      return () => clearTimeout(timer);
    }
  }, []);

  if (loading) {
    return <Preloader/>;
  }

  return (
    <>
      {showlogin && <Loginpopup setShowLogin={setShowlogin} />}

      <div>
        <Navbar />

        <Routes>
          <Route path='/mens' element={<ProductCategory category='Mens' />} />
          <Route path='/watch' element={<ProductCategory category='Watch' />} />
          <Route path='/women' element={<ProductCategory category='Women' />} />
          <Route path='/shoes' element={<ProductCategory category='Shoes' />} />

          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/product/:id' element={<ProductDetails />} />

          <Route
            path='/'
            element={
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ pointerEvents: 'auto' }}
              >
                <Home setShowlogin={setShowlogin} />
              </motion.div>
            }
          />

          <Route
            path='/project'
            element={
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ pointerEvents: 'auto' }}
              >
                <Projects />
              </motion.div>
            }
          />

          <Route
            path='/order'
            element={
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ pointerEvents: 'auto' }}
              >
                <PlaceOrder />
              </motion.div>
            }
          />

          <Route
            path='/cart'
            element={
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ pointerEvents: 'auto' }}
              >
                <Cart />
              </motion.div>
            }
          />

          <Route
            path='/product'
            element={
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ pointerEvents: 'auto' }}
              >
                <Products />
              </motion.div>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
