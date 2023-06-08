import React, { useState, useContext, useRef, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const usernameRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { login, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (usernameRef.current != null) {
      usernameRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!username) {
        setErrMsg("Enter Username");
      }
      if (!password) {
        setErrMsg("Enter Password");
      }
      if (username && password) {
        await login(username, password);
        setUsername("");
        setPassword("");
        navigate("/dashboard");
      }
    } catch (error) {
      setErrMsg("Login Failed");
      errRef.current?.focus();
    }
  };

  return (
    <div className="login_form_container">
      <h2 className="login-form-heading">Login</h2>
      <div className="form-wrapper">
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter Username (admin)"
            value={username}
            ref={usernameRef}
            className="login-input"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password (admin)"
            value={password}
            className="login-input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <button type="submit" className="submit-btn">
            {loading ? (
              <i class="fa fa-spinner fa-pulse fa-1x fa-fw"></i>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
