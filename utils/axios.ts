import axios from 'axios';

/** -------------------------------------------------------------------------- **/
/**        This file should have all axios instances, add more if needed       **/
/** -------------------------------------------------------------------------- **/

/** --------- Make sure to add their keys inside enviroment variables -------- **/

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Axios = axios.create({
   baseURL,
});

/** --------------------------- Interceptor example -------------------------- **/

/** -------------------------------------------------------------------------- **/
/**           Read axios docs: {@link https://github.com/axios/axios}          **/
/** -------------------------------------------------------------------------- **/

Axios.interceptors.response.use(
   function (response) {
      return Promise.resolve(response);
   },
   function (error) {
      return Promise.reject(error);
   }
);

export default Axios;
