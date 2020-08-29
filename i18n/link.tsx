import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { useTranslate } from '~/i18n';

interface NavLinkProps extends LinkProps {
   className?: string;
   activeClassName?: string;
   title?: string;
   exact?: boolean;
   onClick?: any;
}

const NextLink: React.FC<NavLinkProps> = ({
   className = '',
   href,
   as: hrefAs,
   activeClassName = '',
   title,
   children,
   exact,
   onClick = () => {},
   ...rest
}) => {
   const { lang } = useTranslate();
   const router = useRouter();
   if (exact && activeClassName) {
      if (router.asPath === `/${lang}${href}`) {
         className += ` ${activeClassName}`;
      }
   } else {
      if (router.asPath.startsWith(`/${lang}${href}`)) {
         className += ` ${activeClassName}`;
      }
   }
   if (hrefAs) {
      hrefAs = `/${lang}${hrefAs}`;
   } else {
      hrefAs = `/${lang}${href}`;
   }
   href = `/[lang]${href}`;

   return (
      <Link href={href} as={hrefAs} {...rest} prefetch={false}>
         <a onClick={onClick} title={title} hrefLang={lang} className={className || ''}>
            {children}
         </a>
      </Link>
   );
};

export default NextLink;
