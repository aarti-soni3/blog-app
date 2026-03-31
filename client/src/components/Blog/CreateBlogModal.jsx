import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useGetAllCategoryQuery } from "../../store/services/categoryApiSlice";
import { useForm } from "react-hook-form";
import { blogValidationSchema } from "../../utils/formUtility";
import FormErrorMessage from "../FormErrorMessage";
import { useCreateBlogMutation } from "../../store/services/blogApiSlice";
import { ToastContext } from "../../Context Provider/createContext";

export default function CreateBlogModal({ handleClose, show }) {
  const { data, isLoading, error } = useGetAllCategoryQuery();
  const [createBlog, { isLoading: isLoadingProcess }] = useCreateBlogMutation();

  const { showSuccessFeedback, showErrorFeedback } = useContext(ToastContext);

  const {
    register,
    reset,
    getFieldState,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      image: null,
      category: data && data.category[0].name,
    },
    mode: "onSubmit",
  });

  const isValid = (fieldName) => {
    const { invalid, isTouched, isDirty } = getFieldState(fieldName);
    return !invalid && (isTouched || isDirty);
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      if (data.image && data.image[0]) formData.append("image", data.image[0]);
      formData.append("category", data.category);
      console.log(formData);
      
      const response = await createBlog(formData).unwrap();

      if (response.data) {
        showSuccessFeedback("Blog Created!");
        reset();
      }
    } catch (error) {
      showErrorFeedback(error?.message);
      console.log(error);
    } finally {
      handleClose();
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
        backdrop={"static"}
      >
        <Form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                // autoFocus
                required
                {...register("title", blogValidationSchema.title)}
                isInvalid={!!errors.title}
                isValid={isValid("title")}
              />
              <FormErrorMessage error={errors.title} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Select size="md" {...register("category")}>
                {isLoading && <option>Loading...</option>}
                {error && <option>No categories available!</option>}
                {data &&
                  data?.category.map((category) => {
                    return (
                      <option key={category.categoryId}>
                        {category?.name}
                      </option>
                    );
                  })}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="file" className="mb-3">
              <Form.Label>Select Image</Form.Label>
              <Form.Control
                type="file"
                {...register("image", blogValidationSchema.image)}
                isInvalid={!!errors.image}
                isValid={isValid("image")}
                name="image"
                required
              />
              <FormErrorMessage error={errors.image} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...register("description", blogValidationSchema.description)}
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
              disabled={isLoadingProcess ? true : false}
            >
              {isLoadingProcess ? "Posting..." : "Post"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
