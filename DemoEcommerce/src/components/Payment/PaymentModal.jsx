import React, { useEffect, useState, useMemo } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PaymentDetails from './PaymentDetails';
import PaymentSuccess from './PaymentSuccess';
import PaymentFailed from './PaymentFailed';
import ProgressBarModal from './ProgressBarModal'; // Import the ProgressBarModal
import {
  ConnectionProvider, WalletProvider, useWallet
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { clusterApiUrl, Connection, Transaction, SystemProgram, PublicKey } from '@solana/web3.js';
import './PaymentModal.css'

const PaymentModal = ({ show, handleClose, paymentMethod, totalPrice, cartList }) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);

  const [solanaPrice, setSolanaPrice] = useState(null);
  const [solAmount, setSolAmount] = useState('Loading...');
  const [vendoremail, setVendoremail] = useState(cartList[0]?.Vendor_email || "");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [showProgress, setShowProgress] = useState(false); // State for showing progress modal
  const [payoutBatchId, setPayoutBatchId] = useState(null); // Initialize payoutBatchId with null
  const [currentStep, setCurrentStep] = useState(0); // State for current progress step

  const { publicKey, signTransaction } = useWallet();
  const [walletReady, setWalletReady] = useState(false);
  const paypalSolanaAccount = "BZLneDizdY8nvmWHNmVVcn1zkXK1cJesSwtpSHXihZHP";

  const [showPaymentModal, setShowPaymentModal] = useState(true);
  const handleProceedAfterPaymentModal = () => {
    setShowPaymentModal(false);
  };

  useEffect(() => {
    if (publicKey) {
      setWalletReady(true);
    } else {
      setWalletReady(false);
    }
  }, [publicKey]);

  const handlePayment = async (vendorEmail, totalPrice) => {
    try {
      // Mark middle checkpoint
      setCurrentStep(2);

      const response = await fetch('http://localhost:8000/api/process-payment/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vendor_email: vendorEmail,
          dollar_amount: totalPrice
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setPayoutBatchId(data.payout_batch_id);
        // Mark final checkpoint
        setCurrentStep(3);
        // Wait for a second before showing success page
        setTimeout(() => {
          setShowProgress(false);
          setShowSuccess(true);
          handleClose(); // Close the initial modal
        }, 1000);
      } else {
        setShowProgress(false);
        setShowFailed(true);
        handleClose(); // Close the initial modal
      }
    } catch (error) {
      setShowProgress(false);
      setShowFailed(true);
      handleClose(); // Close the initial modal
    }
  };

  const handlePay = async () => {
    if (!publicKey) {
      alert('Please connect your wallet first.');
      return;
    }

    try {
      // Mark first checkpoint
      setCurrentStep(1);

      // Close payment modal and open progress modal
      handleClose();
      setShowProgress(true);

      const connection = new Connection(endpoint, 'confirmed');
      const amountInLamports = solAmount * 1e9;
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(paypalSolanaAccount),
          lamports: amountInLamports,
        })
      );
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      const signedTransaction = await signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signedTransaction.serialize());

      await connection.confirmTransaction(signature, 'confirmed');

      // Call the handlePayment function to process the payment
      handlePayment(vendoremail, totalPrice);
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed.');
    }
  };

  useEffect(() => {
    const fetchSolanaPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
        const data = await response.json();
        const price = data.solana.usd;
        setSolanaPrice(price);
        setSolAmount((totalPrice / price).toFixed(2));
      } catch (error) {
        const fallbackPrice = 135.00;
        setSolanaPrice(fallbackPrice);
        setSolAmount((totalPrice / fallbackPrice).toFixed(2));
      }
    };

    fetchSolanaPrice();
  }, [totalPrice]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {showPaymentModal &&
          <Modal show={show} onHide={handleClose}>
          <div className="modal-content" style={{
              background: 'linear-gradient(to right,#1D192A, #1F2937, #374151)',
              color: '#fff',
              border: '2px solid #fff',
              borderRadius: '10px',
              padding: '2rem',
            }}>
            <Modal.Header >
              <Modal.Title className='custom-modal-title text-center w-100'>
                {paymentMethod}
                <br />
                <div className='mt-4'>
                <WalletMultiButton /></div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <PaymentDetails
                paymentMethod={paymentMethod}
                totalPrice={totalPrice}
                solanaPrice={solanaPrice}
                solAmount={solAmount}  // Passing solAmount as a prop
              />
            </Modal.Body>
            <Modal.Footer>
              <Button className="custom-gradient-btn" onClick={handleClose}>
                Close
              </Button>
              <Button className="custom-green-gradient w-50" onClick={() => {
                      handlePay();
                      handleProceedAfterPaymentModal();
                    }}  disabled={!solAmount || !walletReady}>
                   Pay
              </Button>
            </Modal.Footer>
            </div>
          </Modal>
          }


          <ProgressBarModal
            show={showProgress}
            handleClose={() => setShowProgress(false)}
            step={currentStep} // Pass currentStep as prop
          />

          <PaymentSuccess
            show={showSuccess}
            onHide={() => setShowSuccess(false)}
            payoutBatchId={payoutBatchId} // Ensure payoutBatchId is passed here
          />
          <PaymentFailed
            show={showFailed}
            onHide={() => setShowFailed(false)}
          />

        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default PaymentModal;
