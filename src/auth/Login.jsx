import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import LeftSlider from "../components/LeftSlider";
import api from "../api/axios";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { setAuthData } from "../utils/auth";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData) => {
    try {
      const { data } = await api.post("/auth/login", formData);
      
      setAuthData(data.token, data.user);

      toast.success("Login Successful!", {
        position: "top-left",
        autoClose: 2000,
      });

      setTimeout(() => {
        if (data.user.role === "admin") {
          navigate("/AdminDashboard");
        } else if (data.user.role === "seller") {
          navigate("/SellerDashboard");
        } else {
          navigate("/product"); 
        }
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed", {
        position: "top-left",
      });
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1976d2, #0d47a1, #2c5364)",
      }}
    >
      <div className="row min-vh-100">
        {/* LEFT SLIDER */}
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center text-white">
          <LeftSlider />
        </div>

        {/* RIGHT LOGIN */}
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <div
            className="card shadow-lg p-4"
            style={{
              width: "100%",
              maxWidth: "400px",
              borderRadius: "15px",
              background: "rgba(255,255,255,0.95)",
            }}
          >
            <div className="text-center mb-3">
              <div
                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-2"
                style={{ width: "50px", height: "50px" }}
              >
                🔒
              </div>
              <h4 className="fw-bold">Login</h4>
              <p className="text-muted small">Welcome back, please login</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* EMAIL */}
              <Controller
                name="email"
                control={control}
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    className="form-control mb-3"
                    placeholder="Email"
                  />
                )}
              />

              {/* PASSWORD */}
              <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <div className="input-group mb-3">
                    <input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={togglePassword}
                    >
                      {showPassword ? "🙈" : "👁"}
                    </button>
                  </div>
                )}
              />

              {/* BUTTON */}
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>

              {/* REGISTER */}
              <Link to="/Register">
                <p className="text-center mt-3 text-primary">
                  Don't have an account? Register
                </p>
              </Link>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
