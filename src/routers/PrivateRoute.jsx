import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to="/log-in" />;
};

export default PrivateRoute;
