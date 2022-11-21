import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useTranslation from '@/hooks/useTranslations'
import LangSwitcher from '../components/lang-switcher/LangSwitcher';

const Index = () => {
  const router = useRouter()
  const { lang, t } = useTranslation()

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <LangSwitcher />
      <div>{ t.tagline }</div>
    </>
  )
}

export default Index