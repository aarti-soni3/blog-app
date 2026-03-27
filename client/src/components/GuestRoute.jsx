import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

// guest route for checking if user exist then not show some pages like login & register page
export default function GuestRoute() {
  const { user } = useSelector((state) => state?.auth);

  if (user) return <Navigate to={"/"} replace />;

  return <Outlet />;
}
