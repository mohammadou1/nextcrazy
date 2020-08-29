import { GetStaticProps, GetStaticPaths } from 'next';
import { getLanguagesPaths } from '~/utils/translate';
import { Fragment } from 'react';
import { NextSeo } from 'next-seo';
import Axios from '~/utils/axios';
import { NextLink } from '~/i18n';
import useTranslate from '../../../i18n/useTranslate';

const BlogsPage = ({ blogs }: { blogs: any[] }) => {
   const { translate } = useTranslate();

   return (
      <Fragment>
         <NextSeo
            title={translate({ id: 'common:blogs' })}
            description="This is the blog page of nextjs boilerplate"
         />
         <div className="container mx-auto mt-32">
            <h1 className="text-gray-700 text-4xl">Blogs</h1>
            <ul className="mt-12">
               {blogs.map((blog: any) => (
                  <li key={blog.id} className="mt-2">
                     <NextLink
                        className="hover:underline"
                        href="/blogs/[slug]"
                        as={`/blogs/${blog.id}`}>
                        {blog.title}
                     </NextLink>
                  </li>
               ))}
            </ul>
         </div>
      </Fragment>
   );
};

export const getStaticPaths: GetStaticPaths = async () => {
   return {
      paths: getLanguagesPaths(),
      fallback: false,
   };
};

export const getStaticProps: GetStaticProps = async () => {
   const { data: blogs } = await Axios.get(
      'http://jsonplaceholder.typicode.com/posts?_start=0&_limit=15'
   );
   return {
      props: {
         blogs,
      },
   };
};
export default BlogsPage;
