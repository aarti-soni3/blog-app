import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter, Navigate } from "react-router";
import { Routes, Route } from "react-router";
import Profile from "./components/Profile";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import ToastProvider from "./Context Provider/ToastProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import { useAccessUserQuery } from "./store/services/authApiSlice";
import { useSelector } from "react-redux";
import BlogDetails from "./components/Blog/BlogDetails";
import Footer from "./components/Footer";

export default function App() {
  const token = useSelector((state) => state.auth.accessToken);
  useAccessUserQuery(undefined, { skip: !token });

  return (
    <section className="d-flex flex-column min-vh-100">
      <ToastContainer />
      <ToastProvider>
        <BrowserRouter>
          <NavBar />

          <main className="d-flex justify-content-center mt-5 flex-grow-1">
            <Routes>
              <Route path="/" element={<Navigate to={"/blogs"} replace />} />
              <Route path="/blogs" element={<Home />} />
              <Route path="/blogs/:id" element={<BlogDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route element={<GuestRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
              </Route>
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
