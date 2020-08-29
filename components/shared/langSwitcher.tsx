import { useRouter } from 'next/router';
import { languages } from '~/translation.json';
import Link from 'next/link';
import translations from '~/translations';
interface NavLinkProps extends React.HTMLProps<HTMLAnchorElement> {
   className?: string;
   text: string | React.ReactNode;
}

const LangSwitcher: React.FC<NavLinkProps> = ({ text, href, ...rest }) => {
   // Just finding the lang path inside the current url to replace it with the requested language
   // This will ensure that the user maintains his page on language switching
   const router = useRouter();
   const regex = new RegExp(`^/(${languages.join('|')})`);
   const hrefAs = `${router.asPath.replace(regex, `${href}`)}`;
   const pathname = router.pathname;
   const lang = href?.replace('/', '') + '';
   const dir = translations[lang].direction;

   const linkHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      router.push(pathname, hrefAs);
      document.documentElement.setAttribute('lang', lang);
      document.documentElement.setAttribute('dir', dir);
      document.body.setAttribute('dir', dir);
   };

   return (
      <Link href={pathname} as={hrefAs}>
         <a {...rest} onClick={linkHandler}>
            {text}
         </a>
      </Link>
   );
};

export default LangSwitcher;
