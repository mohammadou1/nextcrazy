import { GetStaticPaths, GetStaticProps } from 'next';
import { getLanguagesPaths } from '~/utils/translate';
import Axios from '~/utils/axios';
import { Fragment } from 'react';
import { NextSeo } from 'next-seo';

const NotFoundPage = ({ blog }: any) => {
   return (
      <Fragment>
         <NextSeo title={blog.title} description={blog.body} />
         <div className="container mx-auto mt-5">
            <h2 className="text-2xl">{blog.title}</h2>
            <p className="mt-5 text-gray-800">{blog.body}</p>
         </div>
      </Fragment>
   );
};

export const getStaticPaths: GetStaticPaths = async () => {
   const { data } = await Axios.get('http://jsonplaceholder.typicode.com/posts?_start=0&_limit=15');
   return {
      paths: getLanguagesPaths(data.map((item: any) => ({ slug: `${item.id}` }))),
      fallback: false,
   };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
   const { data: blog } = await Axios.get(
      `http://jsonplaceholder.typicode.com/posts/${params?.slug}`
   );
   return {
      props: {
         blog,
      },
   };
};

export default NotFoundPage;
