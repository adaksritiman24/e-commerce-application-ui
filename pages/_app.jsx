import Head from 'next/head'
import AuthenticationProvider from '../auth/AuthenticationProvider'
import CartProvider from '../cart/CartProvider'
import GlobalLoader from '../components/common/GlobalLoader'
import LoginModalProvider from '../modals/LoginModalProvider'
import SignupModalProvider from '../modals/payments/SignupModalProvider'
import '../styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

const Loading = ()=> {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(()=> {

    router.events.on("routeChangeStart", (url)=>{url !== router.asPath && setLoading(true)});
    router.events.on("routeChangeComplete", (url)=>{setLoading(false)});

    return(()=>{
      router.events.off("routeChangeStart", (url)=>{url !== router.asPath && setLoading(true)});
      router.events.off("routeChangeComplete", (url)=>{setLoading(false)});
    })
  });

  return (
    <>{loading && <GlobalLoader/>}</>
  )
}

function EcommerceApplication({ Component, pageProps }) {
  return (
    <>
    <Head>
      <link rel='icon' href='/fav.ico'/>
    </Head>
    <Loading/>
    <AuthenticationProvider>
      <CartProvider>
        <LoginModalProvider>
          <SignupModalProvider>
           <Component {...pageProps} />
          </SignupModalProvider>
        </LoginModalProvider>
      </CartProvider>
    </AuthenticationProvider>
    </>
  )
}

export default EcommerceApplication
