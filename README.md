# NextCrazy Boilerplate

![NextCrazy is really crazy](https://github.com/mohammadou1/next-boilerplate/blob/master/public/images/nextcrazy.png)

A boilerplate that gathers few things you may find helpful in any way,
please feel free to suggest changes, fixes or anything you find suitable

> So far it only supports tailwind, but supporting bootstrap is coming!

There is a nice expermintal cli for this boiler as well :)

```
npm i -g nextcrazy-cli
```

read more about it at [NextCrazy Cli](https://github.com/mohammadou1/nextcrazy-cli) or just type ```nextcrazy``` and check it!
### Features

-  NextJS 9.5
-  Multilanguage support (SSG supported)
-  Tailwind, and PostCSS
-  Authentication (Expermintal)
-  Google Tag Manager
-  Enviroment staging, (production,testing and development)
-  Typescript, Eslint and Prettier
-  React hook form example

### Multilanguage

-  translate function + <Translate/> component
-  RTL & LTR support

> Some parts were inspired by [next-translate](https://github.com/vinissimus/next-translate#readme), thanks to them this was possible

### Authentication

This part is tricky, and I don't think it's complete yet, but feel free to use it or improve it.
<AuthProvider> comes with few props to help you have better control over the authentication flow

> all of the links should match NextJS link shape (href & as), though they announced that they will support using href only soon

| Prop          |                                                                                                                                                                                                Description |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| loginPath     |                                                                                                                                                                 Login page path (default is /[lang]/login) |
| afterLoginTo  |                                                                                                                                                        Where is the user going to redirect to after login? |
| afterLogoutTo |                                                                                                                                                       Where is the user going to redirect to after logout? |
| onAuthTo      | Pages like login page can be wrapped with "withRedirectOnAuth" HOC, which will prevent the logged in user from visiting them, this prop will redirect them to the specified url (default is /[lang]/index) |

And you can use "useAuth" hook, useAuth got plenty of useful thinks to access

> login, it will only store the token in cookies and update login state, optionally it can store the user in the provider but not in cookies

```javascript
import useAuth from '~/auth/useAuth';
const { login, logout } = useAuth();

const loginHandler = () => {
   const user = { name: 'MY NAME' };
   // second paramater is remember_me which will extend the expiry of the token based on the stored value in .env files
   login('token goes here', true, user);
};

const logoutHandler = () => {
   // call some api to logout for example

   logout();
};
```

> You can access user related data as well!

```javascript
import useAuth from '~/auth/useAuth';
const { token, user, authenticated, updateUser } = useAuth();

// since the user is not stored in cookies, the data will be lost, its good to update the user data if user is not there

useEffect(() => {
   if (!user && authenticated) {
      fetchSomeApi(token).then(data => updateUser(data));
   }
}, [token, updateUser]);

return authenticated ? <div>{user && <div>{JSON.stringify(user)}</div>}</div> : 'Not authenticated';
```

Other than login and logout, there is a tricky one called "comebackLogin",
useful if clicks on an action that requires a logged in state (checkout for example)
if he successfully logs in, he will be redirected back to the desired location (default is the current one)

```javascript
import useAuth from '~/auth/useAuth';
const { comebackLogin, authenticated } = useAuth();

const checkoutHandler = () => {
   if (!authenticated) comebackLogin();
   else {
      // do something
   }
};

return <button onClick={checkoutHandler}>checkout</button>;
```

also we can redirect the user to another page upon login with the same action

```javascript
import useAuth from '~/auth/useAuth';
import useTranslate from '~/i18n/useTranslate';

const { comebackLogin, authenticated } = useAuth();
const {lang} = useTranslate();
const checkoutHandler = () => {

    // redirectTo will override going to login page and redirect to the desired path.

   if (!authenticated) comebackLogin({
       comebackTo:{
           href:'/[lang]/checkout'
           as:`/${lang}/checkout`
       }
   });
   else {
      // do something
   }
};

return <button onClick={checkoutHandler}>checkout</button>;
```

Additionally we can use withAuth HOC to protect a router (client side protection, SSR protection isn't added yet)
The user will be redirected to login page

```javascript
import { withAuth } from '~/auth/useAuth';

const ProfilePage = () => {
   return <div>profile page</div>;
};

export default withAuth(ProfilePage);
```

And you can pass an optional object with "comeback:true" to redirect back the user to this specific page after login,
it will override the provider default paths for this specific request

```javascript
import { withAuth } from '~/auth/useAuth';

const ProfilePage = () => {
   return <div>profile page</div>;
};

export default withAuth(ProfilePage, { comeback: true });
```
