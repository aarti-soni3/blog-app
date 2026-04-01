import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router";
import { useLogoutUserMutation } from "../store/services/authApiSlice";
import { useContext, useState } from "react";
import { ToastContext } from "../Context Provider/createContext";
import { logout } from "../store/Slice/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import CreateBlogModal from "./Blog/CreateBlogModal";

export default function NavBar() {
  const { user } = useSelector((state) => state?.auth);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "nav-link active navbar-brand p-0"
                : "nav-link navbar-brand p-0"
            }
          >
            <div className="d-flex gap-3 align-items-start">
              <img src="/public/logo.png" width={35} height={40} />
              <h3>Content Corner</h3>
            </div>
          </NavLink>
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
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/"
                      onClick={handleShow}
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      <FontAwesomeIcon icon={faPenToSquare} /> Write
                    </NavLink>
                  </li>

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
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <CreateBlogModal handleClose={handleClose} show={show} />
    </>
  );
}
