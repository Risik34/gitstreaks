import { api } from './api';
import { SignUpSchemaType } from '@/Schema';

export const signUpUser = async (userData: SignUpSchemaType) => {
  try {
    const res = await api.post('/signup', userData);
    return res;
  } catch (err) {
    return err;
  }
};

export const loginUser = async (userData: object) => {
  try {
    const res = await api.post('/login', userData);
    return res;
  } catch (err) {
    return err;
  }
};
