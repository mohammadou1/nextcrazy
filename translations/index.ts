import ar from './ar';
import en from './en';

export type Translations = {
   [key: string]: Record<string, unknown>;
};

const translations: Translations = {
   ar,
   en,
};

export default translations;
