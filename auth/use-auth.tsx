import { useContext } from 'react';
import AuthContext, { AuthContextProps } from './context';

export default function useAuth<T = any>() {
   return useContext<AuthContextProps<T>>(AuthContext);
}
