import {
    createBrowserRouter,
} from "react-router-dom";

// function Router() {
//   let element = useRoutes([
//     {
//       path: "/",
//       element: <Dashboard />,
    
//     },
    
//   ]);

//   return element;
// }

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello world!</div>,
    }
]);

export default router