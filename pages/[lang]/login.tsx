import { GetStaticProps, GetStaticPaths } from 'next';
import { getLanguagesPaths } from '~/utils/translate';
import { withRedirectOnAuth } from '~/auth';

const LoginPage = () => {
   return <div></div>;
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

export default withRedirectOnAuth(LoginPage);
