import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ToastContext } from "../../Context Provider/createContext";
import { useDeleteUserMutation } from "../../store/services/userApiSlice";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/Slice/authSlice";
import { useNavigate } from "react-router";

export default function DeleteUserModal({ userId, show, handleClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //delete user mutation
  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  
  //show feedback
  const { showSuccessFeedback, showErrorFeedback } = useContext(ToastContext);

  const onSubmit = async () => {
    try {
      const response = await deleteUser(userId).unwrap();

      if (response) {
        dispatch(logout());
        navigate("/");
        showSuccessFeedback("User Deleted!");
      }
    } catch (error) {
      showErrorFeedback(error.message);
    }
    handleClose();
  };

  return (
    <>
      <Modal
        show={show}
        centered={true}
        size="sm"
        scrollable={true}
        onHide={handleClose}
      >
        <Form noValidate onSubmit={onSubmit}>
          <Modal.Header closeButton onClick={handleClose}>
            <Modal.Title>Delete User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Are you sure you want to delete this account?</h6>
            <h6 className="text-danger">You can't recover after delete!</h6>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="danger"
              type="submit"
              disabled={isLoading ? true : false}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
