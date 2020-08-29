import { GetStaticProps, GetStaticPaths } from 'next';
import { getLanguagesPaths } from '~/utils/translate';
import { useForm } from 'react-hook-form';
import validator from 'validator';
import useTranslate from '~/i18n/useTranslate';
import { Fragment } from 'react';
import { NextSeo } from 'next-seo';
const ContactPage = () => {
   const { register, handleSubmit, errors } = useForm();
   const { translate } = useTranslate();

   const submitContactForm = (values: Record<string, unknown>) => {
      console.log(values);
      alert('submitted');
   };
   return (
      <Fragment>
         <NextSeo
            title={translate({ id: 'common:contact' })}
            description="This is contact page of nextjs boilerplate"
         />
         <div className="container mx-auto mt-32">
            <h1 className="text-gray-700 text-4xl">Contact us</h1>

            <div className="mt-5 md:w-2/4">
               <form noValidate onSubmit={handleSubmit(submitContactForm)}>
                  <div className="mb-4">
                     <input
                        name="email"
                        placeholder="email"
                        type="email"
                        ref={register({
                           validate: value =>
                              validator.isEmail(value) || translate({ id: 'validation:not_email' }),
                        })}
                        className="bg-gray-800 px-2 py-2 rounded-sm w-full focus:outline-none border border-transparent focus:shadow-lg"
                     />
                     {errors.email && <div className="text-red-600">{errors.email.message}</div>}
                  </div>
                  <div className="mb-2">
                     <textarea
                        name="content"
                        placeholder="content"
                        rows={6}
                        ref={register({ required: translate({ id: 'validation:required' }) })}
                        className="bg-gray-800 px-2 py-2  rounded-sm w-full focus:outline-none border border-transparent focus:shadow-lg"></textarea>

                     {errors.content && (
                        <div className="text-red-600">{errors.content.message}</div>
                     )}
                  </div>
                  <button type="submit" className="btn btn-primary">
                     Submit
                  </button>
               </form>
            </div>
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
   return {
      props: {},
   };
};
export default ContactPage;
