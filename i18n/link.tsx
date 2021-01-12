import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { useTranslate } from '~/i18n';

export interface NextLinkProps extends LinkProps {
   className?: string;
   activeClassName?: string;
   title?: string;
   exact?: boolean;
   onClick?: any;
}

const NextLink: React.FC<NextLinkProps> = ({
   className = '',
   href,
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

   href = `/${lang}${href}`;

   return (
      <Link href={href} {...rest} prefetch={false}>
         <a
            aria-label={title}
            onClick={onClick}
            title={title}
            hrefLang={lang}
            className={className || ''}>
            {children}
         </a>
      </Link>
   );
};

export default NextLink;
