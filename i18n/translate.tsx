import { Fragment, ElementType } from 'react';
import { useTranslate } from '~/i18n';
import { TranslateProps } from './context';

export interface TranslateComponentProps extends TranslateProps {
   /** Wrap the translation with a specific element */
   wrapperComponent?: ElementType;
}

/**
 * @description will search translation files based on current language
 * unless specific language prop was passed!
 */
const Translate: React.FC<TranslateComponentProps> = ({
   id,
   fallback,
   specificLang,
   wrapperComponent,
}) => {
   const { translate } = useTranslate();
   const message = translate({
      id,
      fallback,
      specificLang,
   });
   const Wrapper = wrapperComponent;
   if (Wrapper) {
      return <Wrapper>{message}</Wrapper>;
   }

   return <Fragment>{message}</Fragment>;
};

export default Translate;
