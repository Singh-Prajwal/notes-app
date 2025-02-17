import { Navigate, Outlet } from "react-router-dom";
import authentication from "../core/authentication";
const PrivateRoutes = () => {
  const auth = authentication.getAccessToken();
  return auth ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;
