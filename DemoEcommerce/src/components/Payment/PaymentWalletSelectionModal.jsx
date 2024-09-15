// src/components/Payment/PaymentModal.jsx
import React, { useEffect, useState,useMemo } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PaymentModal from './PaymentModal'; // Import the PaymentDetails component
import './PaymentWalletSelectionModal.css';
// Solana wallet imports
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';

const PaymentWalletSelectionModal = ({ show, handleClose, paymentMethod, totalPrice, cartList }) => {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);

    const [showPayment, setShowPayment] = useState(false);

    const { connected } = useWallet();
    
    const handleProceedToPayment = () => {
      setShowPayment(true);
    };
    
    const handleWalletClick = () => {
      if(!connected){
        console.log("status: ",connected);
        handleClose();  // Close the modal
      }
      else{
        console.log("wallet is connected");
      }
    };

    return (
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            {!showPayment && 
              <Modal show={show} onHide={handleClose} className="custom-modal">
                <div className="modal-content" style={{
                    background: 'linear-gradient(to right,#1D192A, #1F2937, #374151)',
                    color: '#fff',
                    border: '2px solid #fff',
                    borderRadius: '10px',
                    padding: '2rem',
                  }}>
                  <Modal.Header closeButton>
                    <Modal.Title className='custom-modal-title text-center w-100'>{paymentMethod} Payment</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className='text-center w-100'>
                    <div onClick={handleWalletClick}>
                      <WalletMultiButton />
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className="custom-gradient-btn w-75" onClick={handleProceedToPayment}>
                      Proceed to Payment
                    </Button>
                  </Modal.Footer>
                </div>
              </Modal>
            }

            {showPayment && 
              <PaymentModal 
                show={showPayment} // Use showPayment for PaymentModal visibility
                handleClose={handleClose} // Update to close PaymentModal
                paymentMethod={paymentMethod}
                totalPrice={totalPrice}
                cartList={cartList}
              />
            }

          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    );
};

export default PaymentWalletSelectionModal;
