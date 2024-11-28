import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);

  const cardStyle = {
    style: {
      base: {
        color: "#303238",
        fontSize: "16px",
        "::placeholder": {
          color: "#cfd7df",
        },
      },
      invalid: {
        color: "#e5424d",
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    try {
      const { clientSecret } = await fetch(
        "http://localhost:5000/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: 1000, currency: "usd" }), // Adjust amount dynamically
        }
      ).then((res) => res.json());

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: "Customer Name", // Add dynamically
          },
        },
      });

      if (paymentResult.error) {
        setError(paymentResult.error.message);
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        setSuccess("Payment Successful!");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
      options={cardStyle}
      className="border p-4 rounded-lg mb-4" />
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="bg-yellow-600 text-white py-2 px-4 rounded"
      >
        {processing ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};

export default CheckoutForm;
