import { GetServerSideProps } from 'next';
import { Translate } from '~/i18n';
const NotFoundPage = () => {
   return (
      <div className="container mx-auto">
         <h1 className="text-4xl text-gray-700 text-center mt-32">
            <Translate id="common:404" />
         </h1>
      </div>
   );
};

export const getServerSideProps: GetServerSideProps = async () => {
   // It's better to use getServerSideProps than statically generating pages for not found :O
   return {
      props: {},
   };
};

export default NotFoundPage;
