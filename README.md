# Sanfi

SanFi – a revolutionary payment solution that allows users to pay with Solana directly on any e-commerce platform. With SanFi, users can pay Solana from their crypto account, while the merchant receives fiat currency instantly into their bank account.

## Features

- **Seamless Crypto-to-Fiat Payments:** Enable users to make direct cryptocurrency payments to any e-commerce website, even if the merchant doesn't accept crypto.
- **One-Click Payment:** With a single click, users can complete their purchases on almost any online store.
- **Currency Conversion:** Converts cryptocurrency into the merchant's preferred fiat currency.
- **Fast and Secure:** Transactions are completed within seconds, leveraging blockchain technology for speed and security, making crypto payments as easy as traditional methods.


   ![Sanfi GIF](https://github.com/SandeepMahto17/SanFi/raw/main/DemoEcommerce/src/Images/logos/Sanfivid.gif)


## Project Structure

The project consists of the following main components:

1. **Frontend** - A complete e-commerce website with integrated payment functionality.
2. **Backend** - A Django-based API to handle payment processing.
3. **Wallet Integration** - Uses Phantom for managing cryptocurrency payments.

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
   git clone https://github.com/SandeepMahto17/SanFi.git
   cd SANFI PAY
   ```
2. **Install Requirements**
   
   ```bash
   cd server
   pip install -r requirements.txt
   ```
3. **Run the Development Server**
   ```bash
   python manage.py runserver
   ```
   
### Frontend Setup

   1. **Navigate to the Frontend Directory**
   
   ```bash 
   cd ./DemoEcommerce
   ````
   2. **Install Dependencies**
      
   ```bash 
   npm install
   ````
   3. **Run the development server:**
   
   ```bash 
   npm run dev 
   ````
   
