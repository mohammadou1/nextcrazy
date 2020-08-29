import { GetStaticPaths, GetStaticProps } from 'next';
import { useTranslate } from '~/i18n';
import { getLanguagesPaths } from '~/utils/translate';

const NotFoundPage = ({ params }: any) => {
   const { lang } = useTranslate();
   return (
      <div>
         temp {lang} {JSON.stringify(params)}
      </div>
   );
};

export const getStaticPaths: GetStaticPaths = async () => {
   return {
      paths: getLanguagesPaths([{ key: 'temp', values: ['1', '2', '3'] }]),
      fallback: true,
   };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
   return {
      props: {
         params,
      },
   };
};

export default NotFoundPage;
