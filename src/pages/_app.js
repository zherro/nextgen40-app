import { ChakraProvider } from '@chakra-ui/react'
import useTranslations from '@/hooks/useTranslations';
import { useEffect } from 'react';
import AppWrapper from '../context/store';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return (
    <ChakraProvider>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </ChakraProvider>
  )
}

export default MyApp
