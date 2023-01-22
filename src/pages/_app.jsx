import { ChakraProvider } from '@chakra-ui/react'
import useTranslations from '@/hooks/useTranslations';
import { useEffect } from 'react';
import AppWrapper from '../context/store';
import { RouteGuard } from '../core/guard/RouterGuard';
import '../styles/globals.css'
import Layout from "@/components/layouts/layout";

function MyApp({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page) => page)

  return (
    <ChakraProvider>
      <AppWrapper>
        <RouteGuard>
          <Layout getLayout={getLayout}>
            <Component {...pageProps} />
          </Layout>
        </RouteGuard>
      </AppWrapper>
    </ChakraProvider>
  )
}

export default MyApp
