import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router";
import { useLogoutUserMutation } from "../store/services/authApiSlice";
import { useContext } from "react";
import { ToastContext } from "../Context Provider/createContext";
import { logout } from "../store/Slice/authSlice";

export default function NavBar() {
  const { user } = useSelector((state) => state?.auth);

  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();
  const { showSuccessFeedback } = useContext(ToastContext);

  const handleLogout = async () => {
    const response = await logoutUser().unwrap();
    if (response) {
      dispatch(logout());
      <Navigate to={"/"} replace />;
      showSuccessFeedback(`You're logged out successfully`);
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary bg-primary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Blog App
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0">
              {!user ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <NavLink
                    to="/"
                    onClick={handleLogout}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Logout
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
