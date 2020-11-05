import { AppProps } from 'next/app';
import Layout from '~/components/layout';
import { getLang } from '~/utils/translate';
import { initGTM } from '~/utils/analytics';
import { useEffect } from 'react';
import { AuthProvider } from '~/auth';
import { TranslationProvider } from '~/i18n';
import { DefaultSeo } from 'next-seo';
import { languages } from '~/translation.json';

import '../css/tailwind.css';
import '../css/web.css';
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*                              NEXTJS IS AWESOME                             */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */

const App = ({ Component, pageProps, router }: AppProps) => {
   /*
    * Make sure to only use it when necessary as this function will run on every page
    * thats why we are using analytics in here
    **/
   useEffect(() => {
      initGTM();
   }, []);

   /* ---------------------- Application current language ---------------------- */
   const lang = getLang(router);

   // Manipulating html element for lang and dir attributes
   useEffect(() => {
      const langs = languages as Record<string, string>;
      const dir = langs[lang];
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
      document.body.dir = dir;
   }, [lang]);

   const translations = require(`~/translations/${lang}`).default;

   return (
      <TranslationProvider lang={lang} translations={translations}>
         <DefaultSeo
            title="NextJS Starter"
            description="The best nextjs starter boiler"
            nofollow={false}
            noindex={false}
         />
         <AuthProvider afterLoginTo={`/${lang}/profile`}>
            <Layout>
               <Component {...pageProps} />
            </Layout>
         </AuthProvider>

         {/* ------------------------------- App styling ------------------------------ */}
         {/* this makes sure that main take the full available height of the broweser */}
         <style jsx global>{`
            #__next {
               display: flex;
               flex-direction: column;
               min-height: 100vh;
            }
            #__next main {
               flex: 1;
            }
         `}</style>
      </TranslationProvider>
   );
};

export default App;
