import TagManager from 'react-gtm-module';

/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*                This file should have all analaytics configs                */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */

/* ------ Make sure to add their keys inside enviroment variables ------ */

export const initGTM = () => {
   if (process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER) {
      TagManager.initialize({
         gtmId: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER,
      });
   }
};
