import { useForm } from "react-hook-form";
import { useRegisterUserMutation } from "../store/services/authApiSlice";
import { useContext } from "react";
import { ToastContext } from "../Context Provider/createContext";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/Slice/authSlice";
import { userValidationSchema } from "../utils/formUtility";
import FormErrorMessage from "./FormErrorMessage";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showSuccessFeedback, showErrorFeedback } = useContext(ToastContext);

  //react hook form for managing state and validations
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getFieldState,
  } = useForm({ defaultValues: { email: "", password: "" }, mode: "onSubmit" });

  const isValid = (fieldName) => {
    const { invalid, isTouched, isDirty } = getFieldState(fieldName);
    return !invalid && (isTouched || isDirty);
  };
  //used register mutation for passing data to server
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data).unwrap();

      if (response.user) {
        //setting res data
        dispatch(
          setCredentials({
            user: response.user,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
          }),
        );
        reset();
        showSuccessFeedback("User Registered Successfully!");
        navigate("/");
      }
    } catch (error) {
      showErrorFeedback(error.data.message);
      console.log(error.data.message);
    }
  };

  return (
    <>
      <div className="container d-flex col-md-6 flex-column p-5 m-2">
        <h2 className="text-center">Register page</h2>
        <div className="card shadow p-3 mb-5 mt-3 rounded">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body needs-validation"
            noValidate
          >
            <div className="row">
              <div className="col-lg mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`form-control ${errors.name ? "is-invalid" : ""} ${isValid("name") ? "is-valid" : ""}`}
                  aria-invalid={errors.name ? "true" : "false"}
                  {...register("name", userValidationSchema.name)}
                  required
                />
                <div className="valid-feedback">Looks good!</div>
                <FormErrorMessage error={errors.name} />
              </div>
              <div className="col-lg mb-3">
                <label htmlFor="name" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className={`form-control ${errors.username ? "is-invalid" : ""} ${isValid("username") ? "is-valid" : ""}`}
                  aria-invalid={errors.username ? "true" : "false"}
                  {...register("username", userValidationSchema.username)}
                  required
                />
                <div className="valid-feedback">Looks good!</div>
                <FormErrorMessage error={errors.username} />
              </div>
            </div>

            <div className="row">
              <div className="col-lg mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="form-select"
                  {...register("gender")}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <div className="valid-feedback">Looks good!</div>
                <FormErrorMessage error={errors.gender} />
              </div>
              <div className="col-lg mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  minLength={10}
                  maxLength={10}
                  className={`form-control ${errors.phone ? "is-invalid" : ""} ${isValid("phone") ? "is-valid" : ""}`}
                  aria-invalid={errors.phone ? "true" : "false"}
                  {...register("phone", userValidationSchema.phone)}
                  required
                />
                <div className="valid-feedback">Looks good!</div>
                <FormErrorMessage error={errors.phone} />
              </div>
            </div>

            <div className="row">
              <div className="col-lg mb-3">
                <label htmlFor="email" className="form-label">
                  Email Id
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""} ${isValid("email") ? "is-valid" : ""}`}
                  aria-invalid={errors.email ? "true" : "false"}
                  {...register("email", userValidationSchema.email)}
                  required
                />
                <div className="valid-feedback">Looks good!</div>
                <FormErrorMessage error={errors.email} />
              </div>
              <div className="col-lg mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={`form-control ${errors.password ? "is-invalid" : ""} ${isValid("password") ? "is-valid" : ""}`}
                  aria-invalid={errors.password ? "true" : "false"}
                  {...register("password", userValidationSchema.password)}
                  required
                />
                <div className="valid-feedback">Looks good!</div>
                <FormErrorMessage error={errors.password} />
              </div>
            </div>

            <div className="row">
              <div className="col mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  className={`form-control ${errors.address ? "is-invalid" : ""} ${isValid("address") ? "is-valid" : ""}`}
                  aria-invalid={errors.address ? "true" : "false"}
                  {...register("address", userValidationSchema.address)}
                  required
                />
                <div className="valid-feedback">Looks good!</div>
                <FormErrorMessage error={errors.address} />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading ? true : false}
            >
              {isLoading ? "Registering" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
