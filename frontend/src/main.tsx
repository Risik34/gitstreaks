import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import './index.css'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import './index.css';
// import { api } from './api/api';
// import Root from './routes/Root';
// import Home from './routes/Home';
// import NotFound from './NotFound';
// import Signup from './routes/SignUp';
// import Login from './routes/Login';
//
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Root />,
//     errorElement: <NotFound />,
//     children: [
//       {
//         path: 'home/',
//         element: <Home />,
//       },
//     ],
//   },
//   {
//     path: 'signup/',
//     element: <Signup />,
//   },
//   {
//     path: 'login/',
//     element: <Login />,
//   },
// ]);
//
// const jwtToken = localStorage.getItem('jwtToken');
// if (jwtToken) {
//   api.defaults.headers['Authorization'] = `Bearer ${jwtToken}`;
// }
//
// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>,
// );
