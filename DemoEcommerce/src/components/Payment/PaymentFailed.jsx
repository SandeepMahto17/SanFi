import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './PaymentModal.css';

const PaymentFailed = ({ show, onHide }) => {
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
        <Modal.Title>Payment Failed</Modal.Title>
      </Modal.Header>
      <Modal.Body className='text-danger'>
        <p>Unfortunately, your payment could not be processed.</p>
        <p>Please try again or contact support if the issue persists.</p>
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

export default PaymentFailed;
