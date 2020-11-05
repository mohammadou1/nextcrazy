import { FC, useState, useEffect } from 'react';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';
import AuthContext, { RedirectConfig, ComeBackConfig } from './context';
import { useTranslate } from '~/i18n';
import { languages } from '~/translation.json';

export interface AuthProviderProps {
   /** Login page path, (default is /[lang]/login)  */
   loginPath?: string;
   /** After login action is triggered redirects to... (default is /[lang]) */
   afterLoginTo?: string;
   /** After log out action is triggered redirects to... (default is /[lang]) */
   afterLogoutTo?: string;
   /** If the user try to access a page wrapped by withRedirectOnAuth he will be redirected to.. (default is /[lang]) */
   onAuthTo?: string;
}

export interface AuthState {
   authenticated: boolean;
   checked: boolean;
   token: string;
   user: any;
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

      const { redirect } = JSON.parse(sessionRedirect || '{}');

      if (sessionRedirect) sessionStorage.removeItem('redirect');

      const href = props.afterLoginTo || `/${lang}`;

      /**
       * Taking language from redirect url and match it with current user language (in case he changed the language)
       **/
      const asLang = redirect?.split('/');

      if (asLang && Object.keys(languages).includes(asLang[1])) {
         asLang[1] = lang;
         router.replace(redirect ? `${redirect}` : href);
         return;
      }
      router.replace(redirect ? `${redirect}` : href);
   };

   const logout = () => {
      cookie.remove('token', { path: '/' });

      setData({ ...data, token: '', user: null, authenticated: false });
      const customHref = props?.afterLogoutTo;

      router.push(customHref || `/${lang}`);
   };

   const updateUser = <T,>(user: T) => {
      if (data.authenticated) setData({ ...data, user });
   };

   const comebackLogin = (config?: RedirectConfig & ComeBackConfig) => {
      const href = `${config?.comebackTo || router.asPath}`;

      sessionStorage.setItem('redirect', JSON.stringify({ redirect: href }));

      const customHref = config?.redirectTo || props.loginPath || `/${lang}/login`;

      router.push(customHref);
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
