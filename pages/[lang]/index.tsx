import { GetStaticProps, GetStaticPaths } from 'next';
import { getLanguagesPaths } from '~/utils/translate';
import { Container, Button } from 'reactstrap';
import { useAuth } from '~/auth';
import { useTranslate } from '~/i18n';

const HomePage = () => {
   const { authenticated, comebackLogin } = useAuth();
   const { lang } = useTranslate();

   const safeHandle = () => {
      if (authenticated) console.log('ok lets do the work');
      else
         comebackLogin({
            comebackTo: {
               href: '/[lang]/profile',
               as: `/${lang}/profile`,
            },
         });
   };

   return (
      <Container fluid>
         <div>This page is generated via SSG</div>
         <p className="text-muted mb-1 mt-5">
            I will only work if authenticated, otherwise i will safely redirect you to login and
            come back here
         </p>
         <Button onClick={safeHandle} color="warning">
            Check out your profile!
         </Button>
         <div className="text-warning mt-5">This is "{process.env.NEXT_PUBLIC_ENV}" enviroment</div>
      </Container>
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
      revalidate: 50,
   };
};
export default HomePage;
