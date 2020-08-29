import LangSwitcher from '../shared/langSwitcher';
import { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';
import { useTranslate, Translate, NextLink } from '~/i18n';
import { useAuth } from '~/auth';
const Header = () => {
   const { lang } = useTranslate();
   const { authenticated, login, logout } = useAuth();
   const [isOpen, setIsOpen] = useState(false);
   const toggle = () => setIsOpen(!isOpen);
   const loginHandler = () => {
      login('dummy token', false, {
         name: {
            first_name: 'mohammad',
         },
      });
   };
   return (
      <header>
         <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/" tag={NextLink}>
               Nextest
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
               <Nav className="mr-auto" navbar>
                  <NavItem>
                     <NextLink className="nav-link" href="/">
                        <Translate id="common:home" />
                     </NextLink>
                  </NavItem>

                  {authenticated && (
                     <NavItem>
                        <NextLink className="nav-link" href="/profile">
                           <Translate id="common:profile" />
                        </NextLink>
                     </NavItem>
                  )}

                  {authenticated && (
                     <Button onClick={() => logout()} color="danger">
                        <Translate id="common:logout" />
                     </Button>
                  )}
                  {!authenticated && (
                     <Button onClick={loginHandler} color="success">
                        <Translate id="common:login" />
                     </Button>
                  )}
               </Nav>

               {lang !== 'ar' && <LangSwitcher className="mr-2" href="/ar" text="العربية" />}
               {lang !== 'en' && <LangSwitcher className="mr-2" href="/en" text="English" />}
            </Collapse>
         </Navbar>
      </header>
   );
};

export default Header;
