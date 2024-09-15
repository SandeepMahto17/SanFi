import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './PaymentModal.css';

const PaymentSuccess = ({ show, onHide, payoutBatchId }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
        <div className="modal-content" style={{
              background: 'linear-gradient(to right,#1D192A, #1F2937, #374151)',
              color: '#fff',
              border: '2px solid #fff',
              borderRadius: '10px',
              padding: '2rem',
            }}>
      <Modal.Header closeButton>
        <Modal.Title>Payment Successful</Modal.Title>
      </Modal.Header>
      <Modal.Body className='text-success'>
        <p>Your payment has been processed successfully.</p>
        <p>Payout Batch ID: {payoutBatchId}</p>
        <p>Thank you for your purchase!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="custom-gradient-btn" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
         </div>
    </Modal>
  );
};

export default PaymentSuccess;
