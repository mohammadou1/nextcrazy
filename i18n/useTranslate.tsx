import { useContext } from 'react';
import TranslationContext, { ITranslationContext } from './context';

export default function useTranslate() {
   return useContext<ITranslationContext>(TranslationContext);
}
