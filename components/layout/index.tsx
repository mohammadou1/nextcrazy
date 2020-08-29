import { FC, Fragment } from 'react';
import Header from './header';
import Footer from './footer';
import NProgress from 'nprogress';
import Router from 'next/router';

/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*                                 MAIN LAYOUT                                */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */

const Layout: FC = ({ children }) => {
   Router.events.on('routeChangeStart', () => NProgress.start());
   Router.events.on('routeChangeComplete', () => NProgress.done());
   Router.events.on('routeChangeError', () => NProgress.done());

   return (
      <Fragment>
         <Header />
         <main>{children}</main>
         <Footer />
      </Fragment>
   );
};

export default Layout;
