import SignupForm from '@/components/SignupForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  // If a auth token already exists  redirect  them to /home
  const navigate = useNavigate();
  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      console.log(jwtToken);
      navigate('/', { replace: true });
      return;
    }
  }, [navigate]);

  return (
    <div className="dark bg-background text-foreground h-screen py-20 px-14">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Welcome, Please sign up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
