import Document, { Head, Main, NextScript, Html } from 'next/document';
import translations from '~/translations';
import { defaultLanguage } from '~/translation.json';

/* -------------------------------------------------------------------------- */
/*                                  DOCUMENT                                  */
/* -------------------------------------------------------------------------- */

export default class NextDocument extends Document {
   render() {
      /* -------- Just getting direction and language inside html elements -------- */
      const props = this.props.__NEXT_DATA__;
      const lang = props?.query?.lang || defaultLanguage;
      const direction = translations[lang + '']?.direction || 'ltr';
      return (
         <Html lang={lang + ''} dir={direction}>
            <Head>
               <meta charSet="utf-8" />
            </Head>
            <body id="body" dir={direction}>
               <Main />
               <NextScript />
            </body>
         </Html>
      );
   }
}
