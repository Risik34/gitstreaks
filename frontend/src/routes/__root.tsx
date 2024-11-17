import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Navbar from '@/components/Navbar';

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="dark bg-background  text-foreground h-screen ">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
