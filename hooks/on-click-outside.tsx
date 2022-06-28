import { useEffect } from 'react';

export default function useOnClickOutside(
   ref: React.MutableRefObject<any>,
   // eslint-disable-next-line no-unused-vars
   handler: (event: any) => any
) {
   useEffect(() => {
      if (typeof window !== 'undefined') {
         const listener = (event: MouseEvent | TouchEvent | FocusEvent) => {
            if (!ref.current || ref.current?.contains(event.target)) {
               return;
            }

            handler(event);
         };

         document.addEventListener('mousedown', listener);
         document.addEventListener('touchstart', listener);
         document.addEventListener('focusin', listener);

         return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
            document.removeEventListener('focusin', listener);
         };
      }
   }, [ref, handler]);
}
