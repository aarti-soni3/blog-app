import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { useLogoutUserMutation } from "../../store/services/authApiSlice";
import { useContext, useState } from "react";
import { ToastContext } from "../../Context Provider/createContext";
import { logout } from "../../store/Slice/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import CreateBlogModal from "../Blog/CreateBlogModal";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { trimSentence } from "../../utils/TextUtility";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function NavBar() {
  const { user } = useSelector((state) => state?.auth);

  const [show, setShow] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();
  const { showSuccessFeedback } = useContext(ToastContext);

  const handleLogout = async () => {
    const response = await logoutUser().unwrap();
    if (response) {
      dispatch(logout());
      navigate("/");
      showSuccessFeedback(`You're logged out successfully`);
    }
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand={"lg"}
        onToggle={() => {
          setIsExpanded(!isExpanded);
        }}
        sticky="top"
        bg="dark"
        className="p-2 d-flex justify-content-between"
        data-bs-theme="dark"
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "nav-link active navbar-brand p-0"
              : "nav-link navbar-brand p-0"
          }
        >
          <div className="d-flex gap-3 align-items-center p-1">
            <img src="/logo.png" width={40} height={45} />
            <img src="/contentCorner.png" width={160} height={50} />
          </div>
        </NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className={
            isExpanded ? "" : "d-flex gap-2 flex-column align-items-start mt-4"
          }
        >
          <Nav className="ms-3">
            <Form inline="true" className="me-4">
              <Row className="d-flex align-items-center gap-2">
                <Col xs="auto" className="p-0">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className=" mr-sm-2"
                  />
                </Col>
                <Col xs="auto" className="p-0">
                  <Button type="submit" variant="outline-success">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Nav>
          <Nav className={isExpanded ? "ms-auto" : "ms-2"}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Home
            </NavLink>
            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Register
                </NavLink>
              </>
            ) : (
              <div className={isExpanded ? "d-flex gap-2" : ""}>
                <NavLink
                  to="/"
                  onClick={handleShow}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  <FontAwesomeIcon icon={faPenToSquare} /> Write
                </NavLink>

                {isExpanded ? (
                  <NavDropdown
                    className="rounded-circle py-0 px-2 m-0 fs-6 bg-light border dropdown-menu-start"
                    // drop="start"
                    align="end"
                    title={
                      <span className="text-black">
                        {trimSentence(user?.username, 1, false)}
                      </span>
                    }
                    id="dropdown"
                  >
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <div className="rounded-circle py-2 px-3 h-50 bg-light fs-5 border text-black">
                        {trimSentence(user?.name, 1, false)}
                      </div>
                      <small>
                        <h6 className="m-0">{user?.username}</h6>
                        <NavLink
                          to="/profile"
                          className={({ isActive }) =>
                            isActive
                              ? "nav-link active text-info p-0"
                              : "nav-link text-info p-0"
                          }
                        >
                          View profile
                        </NavLink>
                      </small>
                    </div>
                    <NavDropdown.Divider />
                    <NavLink
                      to="/"
                      onClick={handleLogout}
                      className={({ isActive }) =>
                        isActive
                          ? "nav-link active text-danger"
                          : "nav-link text-danger"
                      }
                    >
                      Logout
                    </NavLink>
                  </NavDropdown>
                ) : (
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    View user profile
                  </NavLink>
                )}
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <CreateBlogModal handleClose={handleClose} show={show} />
    </>
  );
}
