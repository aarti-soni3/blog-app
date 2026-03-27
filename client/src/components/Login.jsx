import { useForm } from "react-hook-form";
import { useLoginUserMutation } from "../store/services/authApiSlice";
import { useContext } from "react";
import { ToastContext } from "../Context Provider/createContext";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/Slice/authSlice";
import { userValidationSchema } from "../utils/formUtility";
import FormErrorMessage from "./FormErrorMessage";

export default function Login() {
  //used api slice hook
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showSuccessFeedback, showErrorFeedback } = useContext(ToastContext);

  //react form hook for managing state & validations
  const {
    register,
    handleSubmit,
    reset,
    getFieldState,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" }, mode: "onSubmit" });

  const isValid = (fieldName) => {
    const { invalid, isTouched, isDirty } = getFieldState(fieldName);
    return !invalid && (isTouched || isDirty);
  };

  const loginSchema = {
    email: userValidationSchema.email,
    password: userValidationSchema.password,
  };

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data).unwrap();
      if (response.user) {
        //set user data
        dispatch(
          setCredentials({
            user: response.user,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
          }),
        );
        reset();
        showSuccessFeedback("You're logged in !");
        navigate("/");
      }
    } catch (error) {
      showErrorFeedback(error.data.message || error.message);
    }
  };

  return (
    <>
      <div className="container d-flex col-md-4 flex-column p-5 m-2">
        <h2 className="text-center">Login page</h2>
        <div className="card shadow p-3 mb-5 mt-3 rounded">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body needs-validation"
            noValidate
          >
            <div className="col-md mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-control ${errors.email ? "is-invalid" : ""} ${isValid("email") ? "is-valid" : ""}`}
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email", loginSchema.email)}
                required
              />
              <div className="valid-feedback">Looks good!</div>
              <FormErrorMessage error={errors.email} />
            </div>
            <div className="col-md mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-control ${errors.password ? "is-invalid" : ""} ${isValid("password") ? "is-valid" : ""}`}
                aria-invalid={errors.password ? "true" : "false"}
                {...register("password", loginSchema.password)}
                required
              />
              <div className="valid-feedback">Looks good!</div>
              <FormErrorMessage error={errors.password} />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading ? true : false}
            >
              {isLoading ? "Logging..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
