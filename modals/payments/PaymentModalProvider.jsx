import React, { useState } from 'react'
import PaymentModal from './PaymentModal';

const contextValues = {
    cartTotal : 0,
    paymentData : {
        paymentModes : ['Credit/Debit Card', 'Buzz Giftcard'],
        bankCardDetails: {
            cardNumber : "",
            cardName: "",
            cardExpiryData: "",
            cardCVV : "",
        },
        giftCardDetails: {
            giftCardName: "",
            giftCardNumber: ""
        },
    },
    setPaymentData : ()=> {},
    paymentModalOpen: false,
    setPaymentModalOpen: ()=> {},
    placeOrder: (bankCardDetails)=> {},
}

export const PaymentContext = React.createContext(contextValues);

const PaymentModalProvider =({children, placeOrderForCart})=> {

    const [paymentData, setPaymentData] = useState(contextValues.paymentData);
    const [paymentModalOpen, setPaymentModalOpen] = useState(false)

    const paymentContextData = {
        cartTotal : 0,
        paymentData,
        setPaymentData,
        paymentModalOpen,
        setPaymentModalOpen,
        placeOrder : placeOrderForCart,
    }

  return (
    <PaymentContext.Provider value={paymentContextData}>
        <>
            {children}
            <PaymentModal 
                paymentModalOpen={paymentModalOpen}
                setPaymentModalOpen={setPaymentModalOpen}
                paymentData={paymentData}
                setPaymentData={setPaymentData}
            />
        </>
    </PaymentContext.Provider>
  )
}

export default PaymentModalProvider