import { Container } from 'reactstrap';
import { useAuth, withAuth } from '~/auth';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';

const ProfilePage = () => {
   const { user, authenticated, updateUser } = useAuth();

   useEffect(() => {
      // get the user using the token
      if (!user) {
         updateUser({
            name: {
               first_name: 'mohammad',
            },
         });
      }
   }, []);

   if (authenticated && user) return <Container fluid>{user.name.first_name}</Container>;

   return <div></div>;
};
export const getServerSideProps: GetServerSideProps = async () => {
   return {
      props: {},
   };
};
export default withAuth(ProfilePage, { comeback: true });
