import { useContext } from 'react';
import AuthContext from './context';

export default function useAuth() {
   return useContext(AuthContext);
}
