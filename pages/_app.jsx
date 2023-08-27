import Layout from '@/components/Layout'
import '@/styles/globals.css'
import { CookiesProvider } from 'react-cookie'
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App({ Component, pageProps, router }) {
  return (
    <GoogleOAuthProvider clientId={process.env.CLIENT_ID}>
      <CookiesProvider>
        <Layout>
          <Component key={router.pathname} {...pageProps} />
        </Layout>
      </CookiesProvider>
    </GoogleOAuthProvider>
  )
}