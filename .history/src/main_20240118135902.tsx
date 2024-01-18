import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import router from '@/router'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <div>Hello world!</div>,
//   },
// ]);


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);