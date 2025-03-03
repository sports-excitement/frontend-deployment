import { login } from './authSlice';
import { AppDispatch } from '../index';
import { FirebaseAuthResponse } from '../../auth/api/types';

export const loginUser = (userData: FirebaseAuthResponse) => {
  return (dispatch: AppDispatch) => {
    dispatch(login(userData));
  };
};
