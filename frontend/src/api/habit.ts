import { HabitSchemaType } from '@/Schema';
import { api } from './api';

export const fetchAllHabits = async () => {
  try {
    const res = await api.get('/habit');
    return res;
  } catch (err) {
    return err;
  }
};

export const postHabit = async (data: HabitSchemaType) => {
  try {
    const res = await api.post('/habit', data);
    return res;
  } catch (err) {
    return err;
  }
};
