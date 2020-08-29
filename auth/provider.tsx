import { FC, useState, useEffect } from 'react';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';
import AuthContext, { RedirectConfig, ComeBackConfig } from './context';
import { useTranslate } from '~/i18n';
import { languages } from '~/translation.json';

export interface AuthProviderProps {
   /** Login page path, (default is /[lang]/login)  */
   loginPath?: {
      as?: string;
      href: string;
   };
   /** After login action is triggered redirects to... (default is /[lang]) */
   afterLoginTo?: {
      as?: string;
      href: string;
   };
   /** After log out action is triggered redirects to... (default is /[lang]) */
   afterLogoutTo?: {
      as?: string;
      href: string;
   };
   /** If the user try to access a page wrapped by withRedirectOnAuth he will be redirected to.. (default is /[lang]) */
   onAuthTo?: {
      as?: string;
      href: string;
   };
}

export interface AuthState {
   authenticated: boolean;
   checked: boolean;
   token: string;
   user: Record<string, unknown> | null;
}

/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*                          THIS FILE IS CHALLENGING                          */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */

const AuthProvider: FC<AuthProviderProps> = ({ children, ...props }) => {
   const router = useRouter();
   const { lang } = useTranslate();

   const [data, setData] = useState<AuthState>({
      authenticated: false,
      checked: false,
      token: '',
      user: null,
   });

   useEffect(() => {
      /* --------------- Checking if the user is logged in already! --------------- */
      const token = cookie.get('token');
      if (token) {
         setData(d => ({ ...d, token, authenticated: true, checked: true }));
      } else {
         setData(d => ({ ...d, token: '', authenticated: false, checked: true }));
      }
   }, []);

   const login = (
      token: string,
      rememberMe?: boolean,
      user: Record<string, unknown> | null = null
   ) => {
      const rExipry = Number(process.env.NEXT_PUBLIC_REMEMBER_TOKEN_COOKIES_AGE || 1);
      const expiry = Number(process.env.NEXT_PUBLIC_TOKEN_COOKIES_AGE || 1);

      cookie.set('token', token, { path: '/', expires: rememberMe ? rExipry : expiry });
      setData({ ...data, token, authenticated: true, user });

      const sessionRedirect = sessionStorage.getItem('redirect');

      const { redirect, redirectAs } = JSON.parse(sessionRedirect || '{}');

      if (sessionRedirect) sessionStorage.removeItem('redirect');

      const href = props.afterLoginTo?.href || '/[lang]';
      const as = props.afterLoginTo?.as || props.afterLoginTo?.href || `/${lang}`;

      /**
       * Taking language from redirect url and match it with current user language (in case he changed the language)
       **/
      const asLang = redirectAs?.split('/');

      if (asLang && languages.includes(asLang[1])) {
         asLang[1] = lang;
         router.replace(redirect ? `${redirect}` : href, redirectAs ? `${asLang.join('/')}` : as);
         return;
      }
      router.replace(redirect ? `${redirect}` : href, redirectAs ? `${redirectAs}` : as);
   };

   const logout = () => {
      cookie.remove('token', { path: '/' });

      setData({ ...data, token: '', user: null, authenticated: false });
      const customHref = props?.afterLogoutTo?.href;
      const customHrefAs = props?.afterLogoutTo?.as || props?.afterLogoutTo?.href;

      router.push(customHref || '/[lang]', customHrefAs || `/${lang}`);
   };

   const updateUser = (user: any) => {
      if (data.authenticated) setData({ ...data, user });
   };

   const comebackLogin = (config?: RedirectConfig & ComeBackConfig) => {
      const href = `${config?.comebackTo?.href || router.pathname}`;

      const hrefAs = `${config?.comebackTo?.as || router.asPath}`;

      const redirect = {
         redirectAs: hrefAs,
         redirect: href,
      };

      sessionStorage.setItem('redirect', JSON.stringify(redirect));

      const customHref = props.loginPath?.href || '/[lang]/login';
      const customHrefAs = props.loginPath?.as || props.loginPath?.href || `/${lang}/login`;

      router.replace(
         config?.redirectTo?.href || customHref,
         config?.redirectTo?.as || customHrefAs
      );
   };

   return (
      <AuthContext.Provider
         value={{
            ...data,
            login,
            logout,
            updateUser,
            comebackLogin,
            settings: props,
         }}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthProvider;
