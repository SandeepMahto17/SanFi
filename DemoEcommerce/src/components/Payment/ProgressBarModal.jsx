import React from 'react';
import { Modal } from 'react-bootstrap';
import './ProgressBarModal.css'; // Import custom styles

const ProgressBarModal = ({ show, handleClose, step }) => {
  const steps = [
    { label: 'Transaction Initiated', completed: step >= 1 },
    { label: 'Solana Transfered to SanFi ', completed: step >= 2 },
    { label: 'Money Transfered to Merchant Bank', completed: step >= 3 },
  ];

  return (
    <Modal show={show} onHide={handleClose} centered>
       <div className="modal-content" style={{
              background: 'linear-gradient(to right,#1D192A, #1F2937, #374151)',
              color: '#fff',
              border: '2px solid #fff',
              borderRadius: '10px',
              padding: '2rem',
            }}>
      <Modal.Header closeButton>
        <Modal.Title>Processing Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="progress-bar-container">
          {steps.map((item, index) => (
            <div key={index} className="progress-step-wrapper">
              <div className={`circle ${item.completed ? 'completed' : ''}`}>
                {item.completed ? (
                  <span className="tick">&#10003;</span> // Green tick
                ) : (
                  <span className="number">{index + 1}</span>
                )}
              </div>
              {index !== steps.length - 1 && (
                <div className={`line ${step > index + 1 ? 'filled' : ''}`} />
              )}
              <span className="label">{item.label}</span>
            </div>
          ))}
        </div>
      </Modal.Body>
      </div>
    </Modal>
  );
};

export default ProgressBarModal;
