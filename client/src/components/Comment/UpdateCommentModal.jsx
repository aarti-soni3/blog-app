import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { commentValidationSchema } from "../../utils/formUtility";
import FormErrorMessage from "../FormErrorMessage";
import { ToastContext } from "../../Context Provider/createContext";
import { useForm } from "react-hook-form";
import { useUpdateCommentMutation } from "../../store/services/commentApiSlice";
import { useContext } from "react";

export default function UpdateCommentModal({
  blogId,
  comment,
  show,
  handleClose,
}) {
  const [updateComment, { isLoading }] = useUpdateCommentMutation();

  const { showSuccessFeedback, showErrorFeedback } = useContext(ToastContext);

  const {
    reset,
    register,
    getFieldState,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { description: comment.description },
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    try {
      const response = await updateComment({
        commentId: comment.commentId,
        blogId: blogId,
        data,
      });

      if (response) {
        reset();
        showSuccessFeedback("Comment Updated!");
      }
    } catch (error) {
      console.log(error);
      showErrorFeedback(error.message);
    }
    handleClose();
  };

  const isValid = (fieldName) => {
    const { invalid, isTouched, isDirty } = getFieldState(fieldName);
    return !invalid && (isTouched || isDirty);
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
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton onClick={handleClose}>
            <Modal.Title>Update Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...register(
                  "description",
                  commentValidationSchema.description,
                )}
                isInvalid={!!errors.description}
                isValid={isValid("description")}
                required
              />
              <FormErrorMessage error={errors.description} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={isLoading ? true : false}
            >
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
