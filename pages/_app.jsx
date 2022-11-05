import AuthenticationProvider from '../auth/AuthenticationProvider'
import CartProvider from '../cart/CartProvider'
import '../styles/globals.css'

function EcommerceApplication({ Component, pageProps }) {
  return (
    <AuthenticationProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AuthenticationProvider>
  )
}

export default EcommerceApplication
