import { NavLink } from "react-router";

export default function Footer() {
  return (
    <>
      <footer
        className="footer mt-auto p-3 bg-dark text-light text-center"
        data-bs-theme="dark"
      >
        <div className="container">
          <div className="d-flex gap-2 justify-content-between">
            <div className="w-50">
              <div className="d-flex gap-3 pb-3 align-items-end">
                <img src="/logo.png" width={50} height={60} />
                <h2>Content Corner</h2>
              </div>
              <p className="text-start">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </div>

            <div className="d-flex flex-column m-3">
              <h6>Pages</h6>

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
            </div>
            <div className="d-flex flex-column m-3">
              <h6>Pages</h6>
              <ul className="navbar-nav mb-2 mb-lg-0">
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
              </ul>
            </div>
          </div>
        </div>
        <hr />
        <p>&copy; 2026 ContentCorner.com </p>
      </footer>
    </>
  );
}
