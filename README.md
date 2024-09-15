# Sanfi

Sanfi is an e-commerce platform integrated with real-time cryptocurrency payment capabilities. It leverages the Solana blockchain for cryptocurrency transactions and PayPal for converting crypto payments into the merchant’s preferred currency.

## Features

- **Real-Time Cryptocurrency Payments:** Facilitates payments using Solana blockchain.
- **Direct Merchant Payments:** Ensures payments are made directly to the merchant's PayPal account.
- **Currency Conversion:** Converts cryptocurrency into the merchant's preferred currency.
- **User-Friendly Payment Integration:** Seamlessly integrates cryptocurrency payments into the e-commerce checkout process.

## Project Structure

The project consists of the following main components:

1. **Frontend** - A complete e-commerce website with integrated payment functionality.
2. **Backend** - A Django-based API to handle payment processing.
3. **Wallet Integration** - Uses Solana for managing cryptocurrency payments.

### Backend

The backend includes:

- **`process_payment` API Endpoint**: Handles payment processing using the PayPal SDK, creating and executing payouts to merchants.

## Setup

### Prerequisites

- **Python**: Version 3.8 or higher
- **React**: Ensure you have the necessary tools to run a React application
- **PayPal SDK credentials**
- **Solana wallet and network configuration**

### Backend Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/sanfi.git
   cd SANFI PAY
   ```

### Frontend Setup

   1. **Navigate to the Frontend Directory**
   
   ```bash 
   cd ../DemoEcommerce
   ````
   2. **Install Dependencies**
      
   ```bash 
   npm install
   ````
   3. **Run the development server:**
   
   ```bash 
   npm run dev 
   ````
   
