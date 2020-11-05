import { GetServerSideProps } from 'next';
import { Fragment, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { withAuth, useAuth } from '~/auth';

const HomePage = () => {
   const { user, updateUser } = useAuth();

   useEffect(() => {
      //    Since user wont be stored in cookies, but the token is stored, we will need to fetch the user again!
      if (!user) updateUser({ name: 'Mohammad Oulabi' });
   }, [updateUser, user]);

   return (
      <Fragment>
         <NextSeo title="Home" description="This is the home page of nextjs boilerplate" />
         {user && <div className="container mx-auto mt-32">{JSON.stringify(user)}</div>}
      </Fragment>
   );
};

export const getServerSideProps: GetServerSideProps = async () => {
   return {
      props: {},
   };
};
export default withAuth(HomePage, { comeback: true });
