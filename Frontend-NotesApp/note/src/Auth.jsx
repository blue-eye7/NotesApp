
import React, { useState } from "react";
import styles from "./Auth.module.css";
import api from "./api.js"; // make sure api.js exists in the same folder
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    mobile: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const regex = {
    username: /^[A-Za-z][A-Za-z0-9_]{3,15}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    mobile: /^[6-9]\d{9}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)\S{6,}$/,
  };

  const validate = () => {
    const newErrors = {};
    if (isSignup && !regex.username.test(formData.username)) {
      newErrors.username = "Username must be 4-16 chars, letters/numbers only";
    }
    if (!regex.email.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (isSignup && !regex.mobile.test(formData.mobile)) {
      newErrors.mobile = "Mobile must be 10 digits and start with 6-9";
    }
    if (!regex.password.test(formData.password)) {
      newErrors.password =
        "Password must have at least 6 chars, 1 letter & 1 number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const url = isSignup ? "/signup" : "/login";
      const response = await api.post(url, formData);

      if (response.status === 200) {
        if (isSignup) {
          toast.success("Signup successful! Please login.");
          setIsSignup(false);
        } else {
            console.log(response.data);
          localStorage.setItem("token", response.data || "");
          toast.success("Login successful!");
          navigate("/note");
        }
        setFormData({ username: "", mobile: "", email: "", password: "" });
        setErrors({});
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data || "Error occurred");
      } else {
        toast.error("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className={styles.toggleButtons}>
        <button
          className={!isSignup ? styles.active : ""}
          onClick={() => setIsSignup(false)}
        >
          Login
        </button>
        <button
          className={isSignup ? styles.active : ""}
          onClick={() => setIsSignup(true)}
        >
          Signup
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {isSignup && (
          <>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <p className={styles.error}>{errors.username}</p>}

            <input
              type="number"
              name="mobile"
              placeholder="Mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
            {errors.mobile && <p className={styles.error}>{errors.mobile}</p>}
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className={styles.error}>{errors.password}</p>}

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Please wait..." : isSignup ? "Signup" : "Login"}
        </button>
      </form>
    </div>
  );
}
