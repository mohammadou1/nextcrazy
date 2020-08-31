import { useRouter } from 'next/router';
import { languages } from '~/translation.json';
import Link from 'next/link';
interface NavLinkProps extends React.HTMLProps<HTMLAnchorElement> {
   className?: string;
   text: string | React.ReactNode;
}

const LangSwitcher: React.FC<NavLinkProps> = ({ text, href, ...rest }) => {
   const router = useRouter();
   const regex = new RegExp(`^/(${Object.keys(languages).join('|')})`);
   const hrefAs = `${router.asPath.replace(regex, `${href}`)}`;
   const pathname = router.pathname;
   const lang = href?.replace('/', '') + '';

   const langs = languages as Record<string, string>;
   const dir = langs[lang];

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
