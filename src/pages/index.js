import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useTranslation from '@/hooks/useTranslations'
import DefaultLayout from '../components/layouts/default-layout';

const Index = () => {
  const router = useRouter()
  const { lang, t } = useTranslation()

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
    </>
  )
}

Index.getLayout = DefaultLayout;

export default Index