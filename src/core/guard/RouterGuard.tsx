import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ROUTES } from '../config/app.environment';
import { STORAGE_KEYS } from '../config/api.environment';

export { RouteGuard };

function RouteGuard({ children }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // on initial load - run auth check 
        authCheck(router.asPath, (path) => router.push(path) );

        // on route change start - hide page content by setting authorized to false  
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function authCheck(url) {
        console.log('passou aqui');

        // redirect to login page if accessing a private page and not logged in 
        const publicPaths = [
            '/login', '/assets', '/recuperar-senha', '/lang'
        ];
        const someOff = [ '/login', '/recuperar-senha' ];
        const path = url.split('?')[0];

        let user = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER));

        if(user && user.accessToken && user.id
            && someOff.indexOf(path) >= 0 ) {
            setAuthorized(true);
            router.push(ROUTES.HOME);
        } else if (!user && 
                publicPaths.indexOf(path) < 0
                && path.indexOf('/assets') < 0
        ) {
            setAuthorized(false);
            router.push({
                pathname: '/login',
                query: { returnUrl: router.asPath }
            });
        } else {    
            setAuthorized(true);
        }
    }

    return (authorized && children);
}