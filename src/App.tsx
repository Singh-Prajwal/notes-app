import {
  Outlet,
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/dashboard";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import NotFound from "./pages/notfound";
import Navbar from "./components/navbar";
import authentication from "./core/authentication";
import PrivateRoutes from "./components/private-routes";
function App() {
  const auth = authentication.getAccessToken();

  const NavbarLayout = () => (
    <>
      <Navbar />
      <Outlet />
    </>
  );
  return (
    <Router>
      <Routes>
        <Route element={<NavbarLayout />}>
          <Route
            path="/login"
            element={auth ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route path="/signup" element={<RegisterPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
