import "./App.css";
import NavBar from "./components/common/NavBar";
import { BrowserRouter, Navigate } from "react-router";
import { Routes, Route } from "react-router";
import Profile from "./components/User/Profile";
import { ToastContainer } from "react-toastify";
import ToastProvider from "./Context Provider/ToastProvider";
import ProtectedRoute from "./components/User/ProtectedRoute";
import GuestRoute from "./components/User/GuestRoute";
import { useAccessUserQuery } from "./store/services/authApiSlice";
import { useSelector } from "react-redux";
import BlogDetails from "./components/Blog/BlogDetails";
import Footer from "./components/common/Footer";
import Blogs from "./components/Blog/Blogs";
import PageNotFound from "./components/common/PageNotFound";
import Login from "./components/User/Login";
import Register from "./components/User/Register";

export default function App() {
  const token = useSelector((state) => state.auth.accessToken);
  useAccessUserQuery(undefined, { skip: !token });

  return (
    <section className="d-flex flex-column min-vh-100">
      <ToastContainer limit={2} autoClose={3000} />
      <ToastProvider>
        <BrowserRouter>
          <NavBar />

          <main className="d-flex justify-content-center mt-5 flex-grow-1">
            <Routes>
              <Route path="/" element={<Navigate to={"/blogs"} replace />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:id" element={<BlogDetails />} />
              <Route element={<GuestRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </main>
          <br />
          <br />
          <Footer />
        </BrowserRouter>
      </ToastProvider>
    </section>
  );
}
