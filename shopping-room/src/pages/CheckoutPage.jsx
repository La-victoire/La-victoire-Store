import React, { useContext } from "react";
import CheckoutForm from "./Checkout";
import { CartContext } from "./CartProvider";

const CheckoutPage = () => {
  const {checkout} = useContext(CartContext);
    
  return (
    <>
    <div>{checkout.length === 0 ? (<div className="text-center mt-6 mb-6 text-bold text-xl">Checkout is empty</div>
    ):(
      <section>
        {checkout.map((sells)=>(
        <section key={sells.id} sells={sells} >
          <h2>{sells.name}</h2>
          <p>Price: ${sells.price}</p>
          <p>Quantity: {sells.quantity}</p>
        </section>)
      )} 
      </section>
    )}
    </div>
    {/* <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-6 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Complete Your Payment</h2>
        <CheckoutForm />
      </div>
    </div> */}
    </>
  );
};

export default CheckoutPage;
