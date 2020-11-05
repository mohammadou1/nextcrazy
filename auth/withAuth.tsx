import { useState, useEffect } from 'react';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { useTranslate } from '~/i18n';
import useAuth from './useAuth';
type LoggedState = 'checking' | true | false;

/* -------------------------------------------------------------------------- */
/*                             AUTHENTICATE ME :)                             */
/* -------------------------------------------------------------------------- */

/**
 * @description Pages wrapped by this component will redirect the user if he is logged in
 * good for pages such as (login,register,etc..)
 */

export const withRedirectOnAuth = (Component: React.ComponentType) => {
   const WithRedirect = (props: any) => {
      const [authenticated, setAuth] = useState<LoggedState>('checking');
      const router = useRouter();
      const { lang } = useTranslate();
      const { settings } = useAuth();

      useEffect(() => {
         const token = cookie.get('token');
         if (!token) setAuth(false);
         else {
            const customHref = settings.onAuthTo || `/${lang}`;

            router.replace(customHref);
         }
      }, [lang, router, settings.onAuthTo]);

      return authenticated === false && <Component {...props} />;
   };
   Object.keys(Component).forEach(key => {
      (WithRedirect as any)[key] = (Component as any)[key];
   });
   return WithRedirect;
};

type withAuthConfig = {
   /** If true, it means that the user will comeback here upon logging in */
   comeback?: boolean;
   /** By default its going to redirect the user to login page if he is not authenticated, if this is passed it will redirect him to the specified path */
   redirectTo?: {
      as: string;
      href: string;
   };
};

/**
 * @description Pages wrapped by this component will redirect the user if he is NOT logged in
 */
export function withAuth(Component: React.ComponentType, config?: withAuthConfig) {
   const WithAuth = (props: any) => {
      const [authenticated, setAuth] = useState<LoggedState>('checking');
      const router = useRouter();
      const { lang } = useTranslate();
      const { settings } = useAuth();

      useEffect(() => {
         const token = cookie.get('token');
         if (token) setAuth(true);
         else {
            if (config?.comeback) {
               const href = router.asPath;

               const redirect = {
                  redirect: href,
               };
               sessionStorage.setItem('redirect', JSON.stringify(redirect));
            }

            const customHref = settings.loginPath || `/${lang}/login`;
            router.replace(config?.redirectTo || customHref);
         }
      }, [lang, router, settings.loginPath]);

      return authenticated === true && <Component {...props} />;
   };
   Object.keys(Component).forEach(key => {
      (WithAuth as any)[key] = (Component as any)[key];
   });
   return WithAuth;
}
