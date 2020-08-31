import { createContext } from 'react';

export type TranslateProps = {
   /** key inside translation files  eg: common:home_page */
   id: string;
   /** will ignore current language and use this specific language */
   specificLang?: string;
   /** if key wasn't found, this will be used instead */
   fallback?: string;
   values?: Record<string, string>;
};

const TranslationContext = createContext({
   /* -------------------------------------------------------------------------- */
   /*                             Translate function                             */
   /* -------------------------------------------------------------------------- */

   /**
    * @description will search translation files based on current language
    * unless specific language prop was passed!
    */
   translate: ({ id }: TranslateProps) => id,
   lang: '',
});

export default TranslationContext;
