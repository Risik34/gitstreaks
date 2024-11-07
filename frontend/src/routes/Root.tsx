import Navbar from '@/components/Navbar';
import { Outlet } from 'react-router-dom';

const Root = () => {
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
