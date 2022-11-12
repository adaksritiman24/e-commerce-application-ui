import AuthenticationProvider from '../auth/AuthenticationProvider'
import CartProvider from '../cart/CartProvider'
import LoginModalProvider from '../modals/LoginModalProvider'
import '../styles/globals.css'


function EcommerceApplication({ Component, pageProps }) {
  return (
    <AuthenticationProvider>
      <CartProvider>
        <LoginModalProvider>
          <Component {...pageProps} />
        </LoginModalProvider>
      </CartProvider>
    </AuthenticationProvider>
  )
}

export default EcommerceApplication
