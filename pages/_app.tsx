import { AppProps } from 'next/app';
import Layout from '~/components/layout';
import { getLang } from '~/utils/translate';
import { initGTM } from '~/utils/analytics';
import { useEffect } from 'react';
import { AuthProvider } from '~/auth';
import { TranslationProvider } from '~/i18n';
import { DefaultSeo } from 'next-seo';

import '~/styles/web.scss';
import { prettyComment } from '../utils/analytics';

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
      process.env.NEXT_PUBLIC_ENV === 'production' && prettyComment();
   }, []);

   /* ---------------------- Application current language ---------------------- */
   const lang = getLang(router);
   return (
      <TranslationProvider lang={lang}>
         <DefaultSeo
            title="NextJS Starter"
            description="The best nextjs starter boiler"
            nofollow={false}
            noindex={false}
         />
         <AuthProvider>
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
