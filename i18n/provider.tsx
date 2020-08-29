import { FC, useEffect } from 'react';
import TranslationContext, { TranslateProps } from './context';
import translations from '~/translations';
import cookie from 'js-cookie';
type LocaleProviderProps = {
   lang: string;
};

/* -------------------------------------------------------------------------- */
/*                           TRANSLATING IS EASY :(                           */
/* -------------------------------------------------------------------------- */

const TranslationProvider: FC<LocaleProviderProps> = ({ children, lang }) => {
   function translate({ id, fallback, specificLang }: TranslateProps) {
      const keys = id?.split(':');
      let messages: any;

      if (specificLang) messages = translations[specificLang]?.messages;
      else messages = translations[lang]?.messages;

      const translatedMessage = messages?.[keys?.[0]]?.[keys?.[1]];
      if (!translatedMessage && fallback) {
         console.warn(`Translation for '${id}' not found, using fallback instead.`);
         return fallback;
      }
      if (!translatedMessage && !fallback) {
         console.warn(`Translation for '${id}' not found.`);
         return `Missing translation for '${id}'`;
      }

      return translatedMessage;
   }

   useEffect(() => {
      const cookieLang = cookie.get('lang');
      if (cookieLang !== lang)
         cookie.set('lang', lang, {
            path: '/',
            expires: Number(process.env.NEXT_PUBLIC_LANG_COOKIES_AGE),
         });
   }, [lang]);

   return (
      <TranslationContext.Provider value={{ lang, translate }}>
         {children}
      </TranslationContext.Provider>
   );
};

export default TranslationProvider;
