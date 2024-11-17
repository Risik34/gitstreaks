import Navbar from '@/components/Navbar';
import { isAuth } from '@/lib/auth';
import { Outlet, useNavigate } from 'react-router-dom';

const Root = () => {
  const isAuthenticated = isAuth();
  if (!isAuthenticated) {
return window.location.href='/login'
  }
  return (
    <>
      <div className="dark bg-background  text-foreground h-screen ">
        <section className="pt-10 px-4 ">
          <h1 className="text-6xl font-cookie">Welcome</h1>
        </section>

        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default Root;
