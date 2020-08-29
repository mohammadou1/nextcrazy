import Head from 'next/head';
import { GetServerSideProps } from 'next';
import ssCookies from 'next-cookies';
import { defaultLanguage } from '~/translation.json';

/**************************************************************
 *
 *  THIS PAGE IS ONLY RESPONSIBLE TO REDIRECT TO /[lang] PAGE
 *
 **************************************************************/
const IndexPage = () => {
   return (
      <Head>
         <meta name="robots" content="noindex, nofollow" />
      </Head>
   );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
   const { lang } = ssCookies(ctx);

   ctx?.res?.writeHead(302, { Location: `/${lang || defaultLanguage}` });
   ctx?.res?.end();
   return {
      props: {},
   };
};

export default IndexPage;
