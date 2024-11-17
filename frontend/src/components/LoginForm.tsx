import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchemaType } from '@/Schema';
import { useNavigate } from '@tanstack/react-router';
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

const LoginForm = () => {
  const navigate=useNavigate({from:'/login'})
  // const navigate = useNavigate({ from: '/(auth)/_auth.login' });
  const [formMessage, setFormMessage] = useState('');

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginSchemaType) => {
    const res = await loginUser(values);
    console.log(res);

    if (res.status === 409) {
      setFormMessage('User doesnt exists please signup');
      return;
    }

    const jwtToken = res.data.token;
    api.defaults.headers['Authorization'] = `Bearer ${jwtToken}`;
    localStorage.setItem('jwtToken', jwtToken);
    setFormMessage('');
    navigate({to:'/'})
    
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" {...field} />
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
              </FormControl>
              {/* <FormDescription> */}
              {/*   This is your public display name. */}
              {/* </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
      <p>{formMessage}</p>
    </Form>
  );
};

export default LoginForm;
