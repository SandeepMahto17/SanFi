// src/components/Payment/PaymentDetails.jsx
import React from 'react';

const PaymentDetails = ({ paymentMethod, totalPrice, solanaPrice, solAmount }) => {
  return (
    <div className='pl-5'>
      <p>Total Amount: <strong>${totalPrice}.00</strong></p>
      <p>Equivalent Solana: <strong>{solAmount} SOL</strong></p>
      <p>Current Solana Value: <strong>${solanaPrice}</strong></p>
      <p>Please proceed with your {paymentMethod} payment.</p>
      {/* Add additional inputs or details for the payment here */}
    </div>
  );
};

export default PaymentDetails;
