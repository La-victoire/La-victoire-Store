import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ProductProvider }  from './pages/ProductProvider.jsx'
import { CartProvider } from './pages/CartProvider.jsx'
import { AuthProvider } from './pages/AuthProvider.jsx'
import { BrowserRouter } from 'react-router-dom'

const stripePromise = loadStripe("pk_test_51QPzTzEZa4tzaVYgYCCBm0k172VDBEThTbbp78eVjXVQwEkdodQjHGCTcWR9R8dYjQJna9vovDESKr1kQz93Tfa4005ZAxWeCY")

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <Elements stripe={stripePromise}>
          <App />
          </Elements>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
   </BrowserRouter>
  </StrictMode>
);
