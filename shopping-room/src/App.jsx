import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import ItemPreview from './pages/ItemPreview';
import HomePage from './pages/HomePage';
import MainLayout from './layout/MainLayout';
import Cart from './pages/Cart';
import Error from './pages/Error';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProtectedRoute from './pages/ProtectedRoute';
import CheckoutPage from './pages/CheckoutPage';
import Categories from './pages/Categories';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=0');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data.products); // Extract and store only the products array
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage products={products} />} />
          <Route path="/preview/:id" element={<ItemPreview products={products} />} />
          <Route path="/Category/:id" element={<Categories products={products} />} />
          <Route
            path="/Cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Error />} />
        </Route>
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path='/checkout' element={<CheckoutPage/>}/>
      </Routes>
  );
}

export default App;
