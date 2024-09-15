// src/pages/Cart.jsx
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decreaseQty, deleteProduct } from '../app/features/cart/cartSlice';
// Import specific icons from react-icons
import { FaTimes } from 'react-icons/fa';
import "@fortawesome/fontawesome-free/css/all.css";

import UpiLogo from '../Images/logos/upi-logo.png'; // Import logos
import PayPalLogo from '../Images/logos/paypal-logo.png';
import CreditCardLogo from '../Images/logos/credit-card-logo.png';
import ApplePayLogo from '../Images/logos/apple-pay-logo.png';
import AmazonPayLogo from '../Images/logos/amazon-pay-logo.png';
import NetBankingLogo from '../Images/logos/net-banking-logo.png';

// Import the PaymentModal component
import PaymentWalletSelectionModal from '../components/Payment/PaymentWalletSelectionModal';
import '../css/Cart_payment_component.css'

const Cart = () => {
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // State for handling the modal visibility
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  // Calculate total price
  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  // Function to open modal
  const handleOpenModal = (method) => {
    setPaymentMethod(method);
    setShowModal(true);
  };

  // Function to close modal
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      {/* Conditionally apply blur to the background when modal is open */}
      <section className={`cart-items ${showModal ? 'blur-background' : ''}`}>
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              {cartList.length === 0 && (
                <h1 className="no-items product">No Items are added in Cart</h1>
              )}
              {cartList.map((item) => {
                const productQty = item.price * item.qty;
                return (
                  <div className="cart-list" key={item.id}>
                    <Row>
                      <Col className="image-holder" sm={4} md={3}>
                        <img src={item.imgUrl} alt="" />
                      </Col>
                      <Col sm={8} md={9}>
                        <Row className="cart-content justify-content-center">
                          <Col xs={12} sm={9} className="cart-details">
                            <h3>{item.productName}</h3>
                            <h4>
                              ${item.price}.00 * {item.qty}
                              <span>${productQty}.00</span>
                            </h4>
                          </Col>
                          <Col xs={12} sm={3} className="cartControl">
                            <button
                              className="incCart"
                              onClick={() =>
                                dispatch(addToCart({ product: item, num: 1 }))
                              }
                            >
                              <i className="fa-solid fa-plus"></i>
                            </button>
                            <button
                              className="desCart"
                              onClick={() => dispatch(decreaseQty(item))}
                            >
                              <i className="fa-solid fa-minus"></i>
                            </button>
                          </Col>
                        </Row>
                      </Col>
                      <button
                        className="delete"
                        onClick={() => dispatch(deleteProduct(item))}
                      >
                       <FaTimes />
                      </button>
                    </Row>
                  </div>
                );
              })}
            </Col>
            <Col md={4}>
              <div className="cart-total">
                <h2>Cart Summary</h2>
                <div className=" d_flex">
                  <h4>Total Price :</h4>
                  <h3>${totalPrice}.00</h3>
                </div>
              </div>

              {/* Payment Options */}
              <div className="payment-options">
                <h3>Payment Options</h3>
                <div className="payment-grid">
                  <button className="payment-box" onClick={() => handleOpenModal("SanFi")}>
                    <img src={PayPalLogo} alt="SanFi" />
                  </button>
                  <button className="payment-box" >
                    <img src={UpiLogo} alt="UPI" />
                  </button>
                  <button className="payment-box" >
                    <img src={CreditCardLogo} alt="Credit/Debit Card" />
                  </button>
                  <button className="payment-box" >
                    <img src={ApplePayLogo} alt="Apple Pay" />
                  </button>
                  <button className="payment-box" >
                    <img src={AmazonPayLogo} alt="Amazon Pay" />
                  </button>
                  <button className="payment-box" >
                    <img src={NetBankingLogo} alt="Net Banking" />
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Use the PaymentModal component here */}
      <PaymentWalletSelectionModal
        show={showModal}
        handleClose={handleCloseModal}
        paymentMethod={paymentMethod}
        totalPrice={totalPrice}
        cartList={cartList} // Pass cartList to PaymentModal
      />
    </>
  );
};

export default Cart;
