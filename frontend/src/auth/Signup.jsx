import { useEffect, useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";

import { validateEmail } from "../utils.js";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../state/authSlice.js";
export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const errorInSignup = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitForm = async (e) => {
    e.preventDefault();
    await dispatch(signup({ email, password, confirmPassword }));
  };
  useEffect(() => {
    // If user is logged in, navigate to homepage
    if (isLoggedIn) {
      navigate("/create-profile", { replace: true });
    }
  }, [isLoggedIn]);
  return (
    <>
      <main className="signup">
        <div className="auth-content">
          <h2>Sign up in Passdn kitchen</h2>
          {/* {errors.signupError && (
            <p className="authError">
              {createUser.error?.response?.data?.message || errors.signupError}
            </p>
          )} */}
          <div className="auth-form signup-form">
            <form onSubmit={submitForm}>
              <div className="form-field">
                <label htmlFor="user_email">Email</label>
                <input
                  type="email"
                  className="text-input"
                  placeholder="abc@gmail.com"
                  id="user_email"
                  spellCheck={false}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
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
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                {/* {errors.passwordLength && (
                  <p className="authError">{errors.passwordLength}</p>
                )} */}
              </div>
              <div className="form-field">
                <label htmlFor="user_password">Confirm Password</label>
                <input
                  type="password"
                  className="text-input"
                  placeholder="8+ characters"
                  id="user_confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
                {/* {errors.passwordLength && (
                  <p className="authError">{errors.passwordLength}</p>
                )} */}
              </div>
              <div className="form-field opt-in">
                <input type="checkbox" id="user_agree_to_terms" required />
                <label htmlFor="user_agree_to_terms">
                  I agree with Passdn kitchen <a target="#">Terms of service</a>
                </label>
              </div>
              <div className="form-btns">
                <button className="auth-btn">
                  {/* {createUser.isLoading ? "Creating account" : "Create account"} */}
                  Create account
                </button>
              </div>
              <p className="already-acc">
                Already have an account? <Link to="/login"> Sign in</Link>
              </p>
              <p style={{ textAlign: "center", margin: "10px" }}>OR</p>
              <p className="already-acc">
                Are you restaurant owner?{" "}
                <Link to="/partner-signup">Sign up here</Link>
              </p>
            </form>
            {errorInSignup && (
              <p
                style={{ textAlign: "center", color: "red", fontSize: "20px" }}
              >
                {errorInSignup}
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};
