import { useRoutes } from "react-router-dom";

function Router() {
  let element = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    
    },
    
  ]);

  return element;
}