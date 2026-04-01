import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDeleteBlogMutation } from "../../store/services/blogApiSlice";
import { ToastContext } from "../../Context Provider/createContext";
import { trimSentence } from "../../utils/TextUtility";

export default function UpdateBlogModal({ blog, handleClose, show }) {
  const [deleteBlog, { isLoading }] = useDeleteBlogMutation();

  const { showSuccessFeedback, showErrorFeedback } = useContext(ToastContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await deleteBlog(blog.blogId).unwrap();

      if (response) {
        showSuccessFeedback("Blog Deleted!");
        handleClose();
      }
    } catch (error) {
      showErrorFeedback(error?.message);
      handleClose();
      console.log(error);
    } 
  };

  return (
    <>
      <Modal
        show={show}
        centered={true}
        size="lg"
        scrollable={true}
        onHide={handleClose}
        // backdrop={"static"}
      >
        <Form noValidate onSubmit={onSubmit}>
          <Modal.Header closeButton onClick={handleClose}>
            <Modal.Title>Delete Blog</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Are you sure you want to delete this blog? <br />
              title : <b> {trimSentence(blog.title)}</b>
            </p>
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
