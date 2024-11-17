import Habit from '@/components/Habit';
import Navbar from '@/components/Navbar';
import { isAuth } from '@/lib/auth';
import { createFileRoute, Navigate, Outlet, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/_app')({
  component: LayoutComponent,
});

function LayoutComponent() {
  const isAuthenticated=isAuth()
  if (!isAuthenticated){
    return <Navigate to='/login'/>
  }
  return (
    <div>
      <section className="pt-10 px-4 ">
        <h1 className="text-6xl font-cookie">Welcome</h1>
      </section>

      <Navbar />
      <Outlet />
    </div>
  );
}
