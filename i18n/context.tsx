import { createContext } from 'react';

export type Directions = 'rtl' | 'ltr';

export type TranslateProps = {
   /** key inside translation files  eg: common:home_page */
   id: string;
   /** if key wasn't found, this will be used instead */
   fallback?: string;
   values?: Record<string, string>;
};

export interface ITranslationContext {
   translate: (options: TranslateProps) => any;
   lang: string;
   dir: Directions;
}

const TranslationContext = createContext<ITranslationContext>({
   /* -------------------------------------------------------------------------- */
   /*                             Translate function                             */
   /* -------------------------------------------------------------------------- */

   /**
    * @description will search translation files based on current language
    * unless specific language prop was passed!
    */
   translate: ({ id }: TranslateProps) => id,
   lang: '',
   dir: 'ltr',
});

export default TranslationContext;
