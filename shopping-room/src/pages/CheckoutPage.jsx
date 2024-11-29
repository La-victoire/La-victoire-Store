import React, { useContext, useState } from "react";
import CheckoutForm from "./Checkout";
import { CartContext } from "./CartProvider";
import { FaStripeS } from "react-icons/fa";
import { MetaMaskAvatar } from 'react-metamask-avatar';
import { Web3Context } from './Web3Provider';

const CheckoutPage = () => {
  const {checkout} = useContext(CartContext);
  const [pay , setPay] = useState(false)
  const { walletAddress, connectWallet } = useContext(Web3Context);
  console.log(Web3Context);
  

  const handlePay = () => {
    setPay((prev) => !prev)
  }
    
  return (
    <>
       <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
      {checkout.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Your checkout is empty!</p>
      ) : (
        <ul className="space-y-6">
          {checkout.map((item) => (
            <li
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-lg shadow-lg border border-gray-200"
            >
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-1 md:ml-6 text-center md:text-left">
                <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">Price:</span> ${item.price*item.quantity}
                  <br />
                  <span className="font-medium text-gray-800">Quantity:</span>{" "}
                  {item.quantity}
                </p>
                <button 
                onClick={handlePay}
                className="px-3 py-2 relative left-24 buttom-12
                bg-gray-400 hover:bg-gray-200 hover:shadow-slate-500 hover:shadow-lg  text-white font-bold rounded-full">
                <FaStripeS size={18} className='text-slate-600 '  />
                </button>
                <MetaMaskAvatar address="0x6E4b9eb1454c0118c5Cdb369efD3BCc23ae379A4" className="hover:shadow-lg hover:shadow-red-950" size={28} />

              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-10 flex justify-center">
    </div>
    {pay&&(
     <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-6 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Complete Your Payment</h2>
        <CheckoutForm />
      </div>
    </div> )
    }
    </div>
    {/* MetaMask part */}
    <div className="text-center mt-10">
      {walletAddress ? (
        <p className="text-green-600 font-bold">Connected: {walletAddress}</p>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded shadow hover:from-indigo-500 hover:to-blue-600 transition-all"
        >
          Connect Wallet
        </button>
      )}
    </div>
    </>
  );
};

export default CheckoutPage;
