import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { habitSchema, HabitSchemaType } from '@/Schema';
import { api } from '@/api/api';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { loginUser } from '@/api/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postHabit } from '@/api/habit';
import { DialogClose } from '@/components/ui/dialog';

const AddHabitForm = () => {
  const navigate = useNavigate();
  const [formMessage, setFormMessage] = useState('');

  const form = useForm<HabitSchemaType>({
    resolver: zodResolver(habitSchema),
    defaultValues: {
      occurence: 1,
    },
  });

  const onSubmit = async (values: HabitSchemaType) => {
    const res = await postHabit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Meditation" {...field} />
              </FormControl>
              {/* <FormDescription> */}
              {/*   This is your public display name. */}
              {/* </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="occurence"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Multiple occurence</FormLabel>
              <FormControl>
                <Input placeholder="No of occurence" {...field} />
              </FormControl>
              {/* <FormDescription> */}
              {/*   This is your public display name. */}
              {/* </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogClose>
          <Button type="submit" className="w-full">
            Save
          </Button>
        </DialogClose>
      </form>
      <p>{formMessage}</p>
    </Form>
  );
};

export default AddHabitForm;
