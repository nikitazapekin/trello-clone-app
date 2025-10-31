import { Route, Routes } from "react-router-dom";
import { routes } from "@components/AppRouter/routesConfig";
 

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    
    </Routes>
  );
};

export default AppRoutes;
