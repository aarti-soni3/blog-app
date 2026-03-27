import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

//if user not exist then not render some protect pages eg. user profile [& redirect to login]
export default function ProtectedRoute() {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to={"/login"} replace />;

  return <Outlet />;
}
