import { useForm } from "react-hook-form";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { ToastContext } from "../../Context Provider/createContext";
import { userValidationSchema } from "../../utils/formUtility";
import FormErrorMessage from "../common/FormErrorMessage";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useUpdateUserMutation } from "../../store/services/userApiSlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function UpdateProfileModal({
  userId,
  user,
  address,
  isUserLoading,
  show,
  handleClose,
}) {
  const navigate = useNavigate();

  //show feedback
  const { showSuccessFeedback, showErrorFeedback } = useContext(ToastContext);

  //react hook form for managing state and validations
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getFieldState,
  } = useForm({
    defaultValues: {
      name: user?.name,
      username: user?.username,
      gender: user?.gender,
      phone: user?.phone,
      address: address?.address,
      city: address?.city,
      state: address?.state,
      zip: address?.zip,
    },
    mode: "onSubmit",
  });

  //style based on valid invalid state
  const isValid = (fieldName) => {
    const { invalid, isTouched, isDirty } = getFieldState(fieldName);
    return !invalid && (isTouched || isDirty);
  };
  //used update user mutation for passing data to server
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const onSubmit = async (data) => {
    try {
      const response = await updateUser({ id: userId, data }).unwrap();

      if (response.user) {
        reset();
        showSuccessFeedback("User Updated Successfully!");
        navigate("/profile");
      }
    } catch (error) {
      showErrorFeedback(error?.data?.message || error?.message);
      console.log(error?.data?.message);
    }
    handleClose();
  };

  if (isUserLoading) return <h6>Loading..</h6>;

  return (
    <>
      <Modal
        show={show}
        centered={true}
        size="lg"
        scrollable={true}
        onHide={handleClose}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton onClick={handleClose}>
            <Modal.Title>Update Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    name="name"
                    required
                    {...register("name", userValidationSchema.name)}
                    isInvalid={!!errors.name}
                    isValid={isValid("name")}
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <FormErrorMessage error={errors.name} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="username"
                    name="username"
                    required
                    {...register("username", userValidationSchema.username)}
                    isInvalid={!!errors.username}
                    isValid={isValid("username")}
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <FormErrorMessage error={errors.username} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select size="md" {...register("gender")}>
                    <option value={"male"}>Male</option>
                    <option value={"female"}>Female</option>
                    <option value={"other"}>Other</option>
                  </Form.Select>
                  <div className="valid-feedback">Looks good!</div>
                  <FormErrorMessage error={errors.gender} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Phone"
                    name="phone"
                    minLength={10}
                    maxLength={10}
                    required
                    {...register("phone", userValidationSchema.phone)}
                    isInvalid={!!errors.phone}
                    isValid={isValid("phone")}
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <FormErrorMessage error={errors.phone} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Address"
                    name="address"
                    required
                    {...register("address", userValidationSchema.address)}
                    isInvalid={!!errors.address}
                    isValid={isValid("address")}
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <FormErrorMessage error={errors.address} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="City"
                    name="city"
                    required
                    {...register("city", userValidationSchema.city)}
                    isInvalid={!!errors.city}
                    isValid={isValid("city")}
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <FormErrorMessage error={errors.city} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="state">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="State"
                    name="state"
                    required
                    {...register("state", userValidationSchema.state)}
                    isInvalid={!!errors.state}
                    isValid={isValid("state")}
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <FormErrorMessage error={errors.state} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="zip">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Zip"
                    name="zip"
                    minLength={6}
                    maxLength={6}
                    required
                    {...register("zip", userValidationSchema.zip)}
                    isInvalid={!!errors.zip}
                    isValid={isValid("zip")}
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <FormErrorMessage error={errors.zip} />
                </Form.Group>
              </Col>
            </Row>
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
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
