import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useTranslation from '@/hooks/useTranslations'
import DefaultLayout from '../components/layouts/default-layout';
import { API_PATHS, APP_HOST } from '../core/config/api.environment';
import { getUserRoutes, userIsAdmin } from '../core/helpers/service.helper';
import NoticeWork from '../components/layouts/components/not-work';

const Index = () => {
  const router = useRouter();
  const { lang, t } = useTranslation();
  const [routes, setRoutes ] = useState([]);
  const [notice, setNotice ] = useState("...");


  useEffect(() => {
    setRoutes(getUserRoutes());
    console.log(getUserRoutes())
  }, []);

  useEffect(() => {
    console.log(routes)
    if(routes && routes.length <= 0 && !userIsAdmin()) {
      setNotice(t.notice);
    } else if(routes && routes.length <= 0 && userIsAdmin()) {
      setNotice(t.notice2);
    }
  }, [routes]);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div>
          <NoticeWork type="none" text={notice} />
      </div>
    </>
  )
}

export async function getStaticProps() {
  console.log(`${APP_HOST}${API_PATHS.ROUTES.GET_MY_ROUTES}`)
  // const res = await fetch(`${APP_HOST}${API_PATHS.ROUTES.GET_MY_ROUTES}`, {'method': 'GET'} + authHeader())
  // const routes = await res.json()

  return {
      props: {
          // routes: routes,
          // error: false
      }, // will be passed to the page component as props
  }
}

Index.getLayout = DefaultLayout;

export default Index