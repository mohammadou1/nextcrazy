import { useContext } from 'react';
import TranslationContext from './context';

export default function useTranslate() {
   return useContext(TranslationContext);
}
