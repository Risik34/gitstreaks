import { fetchAllHabits } from '@/api/habit';
import { useEffect, useState } from 'react';

const Habit = () => {
  useEffect(() => {
    const run = async () => {
      const res = await fetchAllHabits();
      console.log(res);
    };

    run();
  });
  return <div>Habit</div>;
};

export default Habit;
