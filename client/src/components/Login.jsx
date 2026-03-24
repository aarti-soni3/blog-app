// import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoginUserMutation } from "../store/services/authSlice";
import { useContext } from "react";
import { ToastContext } from "../Context Provider/createContext";
import { useNavigate } from "react-router";

export default function Login() {
  const [loginUser, { isLoading /*error, isError*/ }] = useLoginUserMutation();

  const navigate = useNavigate();
  const { showSuccessFeedback, showErrorFeedback } = useContext(ToastContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm({ defaultValues: { email: "", password: "" }, mode: "onSubmit" });

  const isEmailValidFields =
    !errors.email && (touchedFields.email || dirtyFields.email);
  const isPasswordValidFields =
    !errors.email && (touchedFields.password || dirtyFields.password);

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data).unwrap();

      if (response.user) {
        reset();
        showSuccessFeedback("You're logged in !");
        navigate("/");
      }
    } catch (error) {
      showErrorFeedback(error.data.message);
      console.log(error);
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
                className={`form-control ${errors.email ? "is-invalid" : ""} ${isEmailValidFields ? "is-valid" : ""}`}
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email", {
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter valid Email-id",
                  },
                  required: "Email is required",
                })}
                required
              />
              <div className="valid-feedback">Looks good!</div>
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>
            <div className="col-md mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-control ${errors.password ? "is-invalid" : ""} ${isPasswordValidFields ? "is-valid" : ""}`}
                aria-invalid={errors.password ? "true" : "false"}
                {...register("password", { required: "Password is required" })}
                required
              />
              <div className="valid-feedback">Looks good!</div>
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
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
