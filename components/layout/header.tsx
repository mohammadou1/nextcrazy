import { NextLink, Translate } from '~/i18n';
import styles from './styles/header.module.css';
import { useState } from 'react';
import LangSwitcher from '../common/lang-switcher';
import useTranslate from '../../i18n/useTranslate';
import { useAuth } from '../../auth';
import NProgress from 'nprogress';
import Router from 'next/router';

const Header = () => {
   const [isOpen, setOpen] = useState(false);
   const { lang } = useTranslate();
   const { authenticated, logout } = useAuth();

   const toggle = () => setOpen(prev => !prev);

   Router.events.on('routeChangeStart', () => {
      NProgress.start();
      setOpen(false);
   });
   Router.events.on('routeChangeComplete', () => NProgress.done());
   Router.events.on('routeChangeError', () => NProgress.done());

   return (
      <header>
         <nav className="bg-gray-800">
            <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
               <div className="relative flex items-center justify-between h-16">
                  <div className="absolute inset-y-0 flex items-center ltr:left-0 rtl:right-0 sm:hidden">
                     <button
                        className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
                        aria-label="Main menu"
                        onClick={toggle}
                        aria-expanded={isOpen ? 'true' : 'false'}>
                        <svg
                           className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 6h16M4 12h16M4 18h16"
                           />
                        </svg>

                        <svg
                           className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                           />
                        </svg>
                     </button>
                  </div>
                  <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                     <div className="flex-shrink-0">
                        <NextLink href="">
                           <span className="text-xl text-white">NextJS Boiler</span>
                        </NextLink>
                     </div>
                     <div className="hidden sm:block sm:ml-6">
                        <div className="flex">
                           <NextLink
                              href=""
                              exact
                              activeClassName={styles['navlink__active']}
                              className={styles['navlink']}>
                              <Translate id="common:home" />
                           </NextLink>
                           <NextLink
                              href="/contact-us"
                              exact
                              activeClassName={styles['navlink__active']}
                              className={styles['navlink']}>
                              <Translate id="common:contact" />
                           </NextLink>
                           <NextLink
                              href="/blogs"
                              exact
                              activeClassName={styles['navlink__active']}
                              className={styles['navlink']}>
                              <Translate id="common:blogs" />
                           </NextLink>
                           {authenticated && (
                              <NextLink
                                 href="/profile"
                                 exact
                                 activeClassName={styles['navlink__active']}
                                 className={styles['navlink']}>
                                 <Translate id="common:profile" />
                              </NextLink>
                           )}
                        </div>
                     </div>
                  </div>
                  <div className="absolute inset-y-0 flex items-center pr-2 rtl:left-0 ltr:right-0 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                     {!authenticated ? (
                        <NextLink href="/login" className="btn btn-primary">
                           <Translate id="common:login" />
                        </NextLink>
                     ) : (
                        <button onClick={() => logout()} className="btn btn-danger">
                           <Translate id="common:logout" />
                        </button>
                     )}
                  </div>
                  <div className="hidden mx-2 sm:flex">
                     {lang !== 'ar' && (
                        <LangSwitcher className={styles['navlink']} href="/ar" text="العربية" />
                     )}
                     {lang !== 'en' && (
                        <LangSwitcher className={styles['navlink']} href="/en" text="English" />
                     )}
                  </div>
               </div>
            </div>

            {/* Responsive  */}
            <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'}`}>
               <div className="px-2 pt-2 pb-3">
                  <NextLink
                     href=""
                     exact
                     activeClassName={styles['navlink__active']}
                     className={`${styles['navlink']} ${styles['navlink__mobile']}`}>
                     <Translate id="common:home" />
                  </NextLink>
                  <NextLink
                     href="/contact-us"
                     exact
                     activeClassName={styles['navlink__active']}
                     className={`${styles['navlink']} ${styles['navlink__mobile']}`}>
                     <Translate id="common:contact" />
                  </NextLink>
                  <NextLink
                     href="/blogs"
                     exact
                     activeClassName={styles['navlink__active']}
                     className={`${styles['navlink']} ${styles['navlink__mobile']}`}>
                     <Translate id="common:blogs" />
                  </NextLink>
                  {authenticated && (
                     <NextLink
                        href="/profile"
                        exact
                        activeClassName={styles['navlink__active']}
                        className={`${styles['navlink']} ${styles['navlink__mobile']}`}>
                        <Translate id="common:profile" />
                     </NextLink>
                  )}
                  <div className="h-1 mt-2 border-t border-white"></div>
                  <div>
                     {lang !== 'ar' && (
                        <LangSwitcher
                           className={`${styles['navlink']} ${styles['navlink__mobile']}`}
                           href="/ar"
                           text="العربية"
                        />
                     )}
                     {lang !== 'en' && (
                        <LangSwitcher
                           className={`${styles['navlink']} ${styles['navlink__mobile']}`}
                           href="/en"
                           text="English"
                        />
                     )}
                  </div>
               </div>
            </div>
         </nav>
      </header>
   );
};

export default Header;
