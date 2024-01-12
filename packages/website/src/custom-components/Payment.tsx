import "./Payment.css";
import React, { useEffect, type FC, useRef } from "react";

const stripe = (window as any).Stripe(import.meta.env.VITE_STRIPE_KEY);

export const Payment: FC = () => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (!(window as any).Stripe) {
      return;
    }

    const elements = stripe.elements();
    const paymentElement = elements.create("payment");

    paymentElement.mount(elementRef.current);

    return () => {
      paymentElement.unmount();
    };
  }, []);

  const handleSubmit = async () => {
    return;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div ref={elementRef}></div>
      <button type="submit">Pay</button>
    </form>
  );
};
