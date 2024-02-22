import { useEffect, useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { validateEmail } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../state/authSlice";
// import { useDispatch } from "react-redux";
// import { login } from "../state/authSlice";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const submitLogin = async (e) => {
    e.preventDefault();
    await dispatch(login({ email, password }));
    // try {
    //   const response = await axios.post(
    //     "http://localhost:3000/api/v1/auth/login",
    //     { email, password },
    //     { withCredentials: true }
    //   );
    //   if (response.data.status === "success" && response.data.user) {
    //     navigate("/", { replace: true });
    //   }
    // } catch (error) {
    //   if (error.response) {
    //     // Server responded with a status code outside the range of 2xx
    //     setError(error.response.data.message || "Login failed");
    //   } else if (error.request) {
    //     // Request was made but no response received
    //     setError("Failed to login please try after some time");
    //   } else {
    //     // Error occurred before request was made
    //     setError("Error while making the request");
    //   }
    // }
  };
  useEffect(() => {
    // If user is logged in, navigate to homepage
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn]);
  useEffect(() => {
    if (!email) {
      setError(""); // Clear the error if email is empty
      return;
    }
    const validate = validateEmail(email);
    if (!validate) {
      setError("Please enter valid email");
    } else {
      setError("");
    }
  }, [email]);
  useEffect(() => {
    if (!password) {
      setError("");
      return;
    }
    if (password.length < 8) {
      setError("Password lenght is less than 8");
    } else {
      setError("");
    }
  }, [password]);
  return (
    <main className="signin">
      <div className="auth-content">
        <h2>Sign in to Passdn kitchen</h2>
        {/* {errors.loginError && <p className="authError">{errors.loginError}</p>} */}
        <div className="auth-form login-form">
          <form onSubmit={submitLogin}>
            <div className="form-field">
              <label htmlFor="user_email">Email</label>
              <input
                type="email"
                className="text-input"
                placeholder="abc@gmail.com"
                id="user_email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  // setErrors(delete errors.email);
                }}
                spellCheck={false}
              />
              {/* {errors.email && <p className="authError">{errors.email}</p>} */}
            </div>
            <div className="form-field">
              <label htmlFor="user_password">Password</label>
              <input
                type="password"
                className="text-input"
                placeholder="8+ characters"
                id="user_password"
                minLength="8"
                maxLength="20"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  // setErrors(delete errors.passwordLength);
                }}
              />
              {/* {errors.passwordLength && (
              <p className="authError">{errors.passwordLength}</p>
            )} */}
            </div>
            <div className="form-btns">
              <button
                className="auth-btn"
                // disabled={loginUser.isLoading && !loginUser.isError}
              >
                {/* {loginUser.isLoading ? "Loggging in" : "Log in"} */}
                Log in
              </button>
            </div>
            <p className="already-acc">
              Already have an account? <Link to="/signup"> Sign up</Link>
            </p>
            {error && <p>{error}</p>}
          </form>
        </div>
      </div>
    </main>
  );
};
export default Login;
