import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { ToastContext } from "../../Context Provider/createContext";
import { commentValidationSchema } from "../../utils/formUtility";
import FormErrorMessage from "../FormErrorMessage";
import { useCreateCommentMutation } from "../../store/services/commentApiSlice";
import FloatingLabel from "react-bootstrap/FloatingLabel";

export default function CreateComment({ blogId }) {
  const { showSuccessFeedback, showErrorFeedback } = useContext(ToastContext);
  const [createComment, { isLoading }] = useCreateCommentMutation();

  const {
    register,
    reset,
    getFieldState,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: "",
    },
    mode: "onSubmit",
  });

  const isValid = (fieldName) => {
    const { invalid, isTouched, isDirty } = getFieldState(fieldName);
    return !invalid && (isTouched || isDirty);
  };

  const onSubmit = async (data) => {
    try {
      const response = await createComment({
        description: data.description,
        id: blogId,
      }).unwrap();
      if (response) {
        showSuccessFeedback("Comment Added!");
        reset();
      }
    } catch (error) {
      showErrorFeedback(error?.message);
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-md d-flex flex-column p-2 mb-5">
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="description">
            <FloatingLabel
              controlId="floatingDescription"
              label="Write comment..."
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write Comment..."
                required
                {...register(
                  "description",
                  commentValidationSchema.description,
                )}
                isInvalid={!!errors.description}
                isValid={isValid("description")}
                style={{ height: "100px" }}
              />
              <FormErrorMessage error={errors.description} />
            </FloatingLabel>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={isLoading ? true : false}
          >
            {isLoading ? "Posting..." : "Comment"}
          </Button>
        </Form>
      </div>
    </>
  );
}
