import ar from './ar';
import en from './en';

type Translations = {
   [key: string]: {
      messages: {
         [key: string]: Record<string, unknown>;
      };
      direction: 'ltr' | 'rtl';
   };
};

const translations: Translations = {
   ar: {
      messages: ar,
      direction: 'rtl',
   },
   en: {
      messages: en,
      direction: 'ltr',
   },
};

export default translations;
