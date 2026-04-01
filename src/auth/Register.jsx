import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [role, setRole] = useState("Customer");
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");

  const togglePassword = () => setShowPassword((prev) => !prev);

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      fullName: "",
      contact: "",
      email: "",
      password: "",
      confirmPassword: "",
      organization: "",
      address: "",
    },
  });

  // OTP
  const sendOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    setGeneratedOtp(otp);
    setOtpSent(true);
    alert(`Demo OTP: ${otp}`);
  };

  const verifyOtp = (data) => {
    if (Number(enteredOtp) === generatedOtp) {
      alert("OTP Verified! Registration Successful");
      console.log("Registered Data:", { ...data, role });
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1976d2, #0d47a1)",
      }}
    >
      <div className="card shadow-lg p-4" style={{ maxWidth: "500px", width: "100%", borderRadius: "15px" }}>
        
        {/* HEADER */}
        <div className="text-center mb-3">
          <div
            className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2"
            style={{ width: "50px", height: "50px" }}
          >
            👤
          </div>
          <h4 className="fw-bold">Create Account</h4>
        </div>

        {/* ROLE */}
        <div className="mb-3">
          <label className="form-label fw-bold">Select Account Type</label>
          <div>
            <input
              type="radio"
              className="form-check-input me-1"
              checked={role === "Customer"}
              onChange={() => setRole("Customer")}
            />
            Customer

            <input
              type="radio"
              className="form-check-input ms-3 me-1"
              checked={role === "Seller"}
              onChange={() => setRole("Seller")}
            />
            Seller
          </div>
        </div>

        <form onSubmit={handleSubmit(otpSent ? verifyOtp : sendOtp)}>

          {/* FULL NAME */}
          <Controller
            name="fullName"
            control={control}
            rules={{ required: "Full Name is required" }}
            render={({ field }) => (
              <>
                <input {...field} className="form-control mb-2" placeholder="Full Name" />
                <small className="text-danger">{errors.fullName?.message}</small>
              </>
            )}
          />

          {/* CONTACT */}
          <Controller
            name="contact"
            control={control}
            rules={{
              required: "Contact required",
              pattern: { value: /^[0-9]{10}$/, message: "Invalid number" },
            }}
            render={({ field }) => (
              <>
                <input {...field} className="form-control mb-2" placeholder="Contact Number" />
                <small className="text-danger">{errors.contact?.message}</small>
              </>
            )}
          />

          {/* EMAIL */}
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email required",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
            }}
            render={({ field }) => (
              <>
                <input {...field} type="email" className="form-control mb-2" placeholder="Email" />
                <small className="text-danger">{errors.email?.message}</small>
              </>
            )}
          />

          {/* CUSTOMER */}
          {role === "Customer" && (
            <>
              <Controller
                name="password"
                control={control}
                rules={{ required: "Password required" }}
                render={({ field }) => (
                  <>
                    <div className="input-group mb-2">
                      <input {...field} type={showPassword ? "text" : "password"} className="form-control" placeholder="Password" />
                      <button type="button" className="btn btn-outline-secondary" onClick={togglePassword}>
                         {showPassword ? "🙈" : "👁"}
                      </button>
                    </div>
                    <small className="text-danger">{errors.password?.message}</small>
                  </>
                )}
              />

              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: "Confirm Password required",
                  validate: (val) => val === getValues("password") || "Passwords not match",
                }}
                render={({ field }) => (
                  <>
                    <input {...field} type="password" className="form-control mb-2" placeholder="Confirm Password" />
                    <small className="text-danger">{errors.confirmPassword?.message}</small>
                  </>
                )}
              />
            </>
          )}

          {/* SELLER */}
          {role === "Seller" && (
            <>
              <Controller
                name="organization"
                control={control}
                rules={{ required: "Organization required" }}
                render={({ field }) => (
                  <>
                    <input {...field} className="form-control mb-2" placeholder="Shop Name" />
                    <small className="text-danger">{errors.organization?.message}</small>
                  </>
                )}
              />

              <Controller
                name="address"
                control={control}
                rules={{ required: "Address required" }}
                render={({ field }) => (
                  <>
                    <textarea {...field} className="form-control mb-2" placeholder="Address" />
                    <small className="text-danger">{errors.address?.message}</small>
                  </>
                )}
              />

              {/* CATEGORY */}
              <div className="mb-2">
                <label className="fw-bold">Product Categories</label><br />
                <input type="checkbox" className="form-check-input me-1" /> Mobile Phones
                <br />
                <input type="checkbox" className="form-check-input me-1" /> Earbuds
                <br />
                <input type="checkbox" className="form-check-input me-1" /> Chargers
              </div>

              <Controller
                name="password"
                control={control}
                rules={{ required: "Password required" }}
                render={({ field }) => (
                  <input {...field} type="password" className="form-control mb-2" placeholder="Password" />
                )}
              />

              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: "Confirm Password required",
                  validate: (val) => val === getValues("password") || "Passwords not match",
                }}
                render={({ field }) => (
                  <input {...field} type="password" className="form-control mb-2" placeholder="Confirm Password" />
                )}
              />
            </>
          )}

          {/* OTP */}
          {!otpSent ? (
            <button className="btn btn-outline-primary w-100 mt-2" type="button" onClick={sendOtp}>
              Send OTP
            </button>
          ) : (
            <>
              <input
                className="form-control mt-2"
                placeholder="Enter OTP"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
              />
              <button className="btn btn-primary w-100 mt-2" type="button" onClick={handleSubmit(verifyOtp)}>
                Verify & Register
              </button>
            </>
          )}

          <Link to="/login">
            <p className="text-center mt-3 text-primary">
              Already have an account? Login
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;