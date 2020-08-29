import { FC, Fragment } from 'react';
import Header from './header';
import Footer from './footer';

/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*                                 MAIN LAYOUT                                */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */

const Layout: FC = ({ children }) => {
   return (
      <Fragment>
         <Header />
         <main>{children}</main>
         <Footer />
      </Fragment>
   );
};

export default Layout;
