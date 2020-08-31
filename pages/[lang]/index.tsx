import { GetStaticProps, GetStaticPaths } from 'next';
import { getLanguagesPaths } from '~/utils/translate';
import { Fragment } from 'react';
import { NextSeo } from 'next-seo';
import useTranslate from '../../i18n/useTranslate';
import { Translate } from '~/i18n';

const HomePage = () => {
   const { translate } = useTranslate();
   return (
      <Fragment>
         <NextSeo
            title={translate({ id: 'common:home' })}
            description="This is the home page of nextjs boilerplate"
         />
         <div className="container mx-auto mt-32">
            <h1 className="text-center text-gray-700 text-4xl">This is home page</h1>
            <span className="text-center block text-gray-700 text-xl">
               <Translate id="common:welcome" values={{ user: 'Mohammad' }} />
            </span>
         </div>
      </Fragment>
   );
};

export const getStaticPaths: GetStaticPaths = async () => {
   return {
      paths: getLanguagesPaths(),
      fallback: false,
   };
};

export const getStaticProps: GetStaticProps = async () => {
   return {
      props: {},
   };
};
export default HomePage;
