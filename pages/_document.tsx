import Document, { Head, Main, NextScript, Html } from 'next/document';
import { defaultLanguage, languages } from '~/translation.json';

/* -------------------------------------------------------------------------- */
/*                                  DOCUMENT                                  */
/* -------------------------------------------------------------------------- */

export default class NextDocument extends Document {
   render() {
      /* -------- Just getting direction and language inside html elements -------- */

      const langs = languages as Record<string, string>;
      const props = this.props.__NEXT_DATA__;
      const lang = props?.query?.lang || defaultLanguage;
      const direction = langs[lang + ''] || 'ltr';
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
