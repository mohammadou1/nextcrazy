import { GetServerSideProps } from 'next';
import { useTranslate } from '~/i18n';

const NotFoundPage = () => {
   const { lang } = useTranslate();
   return <div>page not found {lang}</div>;
};

export const getServerSideProps: GetServerSideProps = async () => {
   return {
      props: {},
   };
};

export default NotFoundPage;
