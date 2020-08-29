import { GetStaticProps, GetStaticPaths } from 'next';
import { getLanguagesPaths } from '~/utils/translate';
import { withRedirectOnAuth } from '~/auth';
import { Translate } from '~/i18n';
import useAuth from '~/auth/useAuth';

const LoginPage = () => {
   const { login } = useAuth();

   const loginHandler = () => {
      // call some api to login here
      login('fake token', false, { name: 'Mohammad Oulabi' });
   };
   return (
      <div className="flex justify-center items-center h-64">
         <button className="btn btn-primary" onClick={loginHandler}>
            <Translate id="common:fake_login" />
         </button>
      </div>
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

export default withRedirectOnAuth(LoginPage);
