import AuthenticationProvider from '../auth/AuthenticationProvider'
import CartProvider from '../cart/CartProvider'
import LoginModalProvider from '../modals/LoginModalProvider'
import SignupModalProvider from '../modals/payments/SignupModalProvider'
import '../styles/globals.css'


function EcommerceApplication({ Component, pageProps }) {
  return (
    <AuthenticationProvider>
      <CartProvider>
        <LoginModalProvider>
          <SignupModalProvider>
           <Component {...pageProps} />
          </SignupModalProvider>
        </LoginModalProvider>
      </CartProvider>
    </AuthenticationProvider>
  )
}

export default EcommerceApplication
