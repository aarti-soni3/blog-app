import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useGetAllCategoryQuery } from "../../store/services/categoryApiSlice";
import { useForm } from "react-hook-form";
import { blogValidationSchema } from "../../utils/formUtility";
import FormErrorMessage from "../common/FormErrorMessage";
import { useUpdateBlogMutation } from "../../store/services/blogApiSlice";
import { ToastContext } from "../../Context Provider/createContext";
import Image from "react-bootstrap/Image";

export default function UpdateBlogModal({ blog, handleClose, show }) {
  // get all category to display list
  const { data, isLoading, error } = useGetAllCategoryQuery();

  //update mutation called
  const [updateBlog, { isLoading: isLoadingProcess }] = useUpdateBlogMutation();

  //show feedback
  const { showSuccessFeedback, showErrorFeedback } = useContext(ToastContext);

  const categories = data?.category;
  const getSelectedCategory = () => {
    // console.log(categories, blog);
    if (categories)
      return categories.find(
        (category) => category.categoryId === blog?.Category?.categoryId,
      );
    else return null;
  };

  const defaultValues = {
    title: blog.title,
    description: blog.description,
    image: null,
    isDeleteImage: false,
    category: getSelectedCategory()?.name,
  };

  // react form hook for handling data
  const {
    register,
    getFieldState,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: blog,
    defaultValues,
    mode: "onSubmit",
  });

  // for data validation style
  const isValid = (fieldName) => {
    const { invalid, isTouched, isDirty } = getFieldState(fieldName);
    return !invalid && (isTouched || isDirty);
  };

  const onSubmit = async (data) => {
    try {
      // form data for send image to backend
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      if (data.image !== null && data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }
      formData.append("category", data.category);
      formData.append("isDeleteImage", data.isDeleteImage);

      const response = await updateBlog({
        id: blog.blogId,
        data: formData,
      }).unwrap();

      if (response) {
        showSuccessFeedback("Blog Updated!");
      }
    } catch (error) {
      showErrorFeedback(error?.message);
    }
    handleClose();
  };

  if (isLoading) return <h3>Loading...</h3>;

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
        <Form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <Modal.Header closeButton onClick={handleClose}>
            <Modal.Title>Update Blog</Modal.Title>
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
            {blog.image && (
              <Form.Group>
                <Form.Label>Select for delete image</Form.Label>
                <div className="d-flex gap-2">
                  <Form.Check type="checkbox" {...register("isDeleteImage")} />
                  <Image src={blog.thumbnail} thumbnail />
                </div>
              </Form.Group>
            )}
            <br />
            <Form.Group controlId="file" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                {...register("image")}
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
              {isLoadingProcess ? "Updating..." : "Update"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
