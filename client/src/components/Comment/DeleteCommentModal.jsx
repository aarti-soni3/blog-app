import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ToastContext } from "../../Context Provider/createContext";
import { useDeleteCommentMutation } from "../../store/services/commentApiSlice";
import { useContext } from "react";

export default function DeleteCommentModal({
  commentId,
  show,
  handleClose,
  commentDescription,
}) {
  const [deleteComment, { isLoading }] = useDeleteCommentMutation(commentId);

  const { showSuccessFeedback, showErrorFeedback } = useContext(ToastContext);

  const onSubmit = async () => {
    try {
      const response = await deleteComment(commentId);

      if (response) {
        showSuccessFeedback("Comment Deleted!");
      }
    } catch (error) {
      console.log(error);
      showErrorFeedback(error.message);
    }
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
            <Modal.Title>Delete Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Delete this comment?</h6>
            <p>{commentDescription} </p>
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
