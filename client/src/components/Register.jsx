import { useForm } from "react-hook-form";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getFieldState,
  } = useForm({ defaultValues: { email: "", password: "" }, mode: "onSubmit" });

  const isValid = (fieldName) => {
    const { invalid, isTouched, isDirty } = getFieldState(fieldName);
    return !invalid && (isTouched || isDirty);
  };

  const onSubmit = () => {};

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
                  {...register("name", {
                    minLength: 2,
                    maxLength: 20,
                    required: "Name is required",
                  })}
                  required
                />
                <div className="valid-feedback">Looks good!</div>
                {errors.name && (
                  <div className="invalid-feedback">{errors.name.message}</div>
                )}
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
                  {...register("username", {
                    minLength: 2,
                    maxLength: 20,
                    required: "Username is required",
                  })}
                  required
                />
                <div className="valid-feedback">Looks good!</div>
                {errors.username && (
                  <div className="invalid-feedback">
                    {errors.username.message}
                  </div>
                )}
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
                {errors.gender && (
                  <div className="invalid-feedback">
                    {errors.gender.message}
                  </div>
                )}
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
                  {...register("phone", {
                    minLength: 10,
                    maxLength: 10,
                    required: "Please enter valid phone number",
                  })}
                  required
                />
                <div className="valid-feedback">Looks good!</div>
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone.message}</div>
                )}
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
                  {...register("password", {
                    required: "Password is required",
                  })}
                  required
                />
                <div className="valid-feedback">Looks good!</div>
                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password.message}
                  </div>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <textarea
                  // type="text"
                  id="address"
                  name="address"
                  className={`form-control ${errors.address ? "is-invalid" : ""} ${isValid("address") ? "is-valid" : ""}`}
                  aria-invalid={errors.address ? "true" : "false"}
                  {...register("address", {
                    required: "Address is required",
                  })}
                  required
                />
                <div className="valid-feedback">Looks good!</div>
                {errors.address && (
                  <div className="invalid-feedback">
                    {errors.address.message}
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
