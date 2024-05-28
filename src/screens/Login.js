import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/screens.css";

const Login = () => {
  const [cred, setcred] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); //A synthetic event
    console.log({
      email: cred.email,
      password: cred.password,
    });

    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: cred.email,
        password: cred.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("user_email", cred.email);
      localStorage.setItem("authtoken", json.authtoken);
      console.log(localStorage.getItem("authtoken"));
      navigate("/");
    } else {
      if (
        json.errors === "Your email is not registered ,Please Sign Up First"
      ) {
        alert("Your email is not registered , Please Sign Up First");
      } else {
        alert("Incorrect Password");
      }
    }
  };

  const onChange = (e) => {
    setcred({ ...cred, [e.target.name]: e.target.value });
  };

  return (
    <div className="Login">
      <div className="form-box" style={{ height: "550px" }}>
        <h1 id="title">Login</h1>
        <form onSubmit={handleSubmit}>
          <div
            className="container"
            style={{
              height: "275px",
              width: "100%",
              backgroundPosition: "center",
              backgroundSize: "cover",
              position: "relative",
            }}
          >
            <div className="input-group">
              <div className="input-field">
                <i className="fa-solid fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={onChange}
                  value={cred.email}
                />
              </div>
              <div className="input-field">
                <i className="fa-solid fa-key"></i>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={onChange}
                  value={cred.password}
                />
              </div>
            </div>

            <div className="btno">
              <button type="submit" id="Signup">
                <b>Login</b>
              </button>
            </div>

            <div className="mt-2">
              <p>
                New user? Go to{" "}
                <Link to="/createuser">
                  <b>Sign Up</b>
                </Link>
              </p>
              <p>
                Are you an admin? Click{" "}
                <Link to="/admin">
                  <b>here</b>
                </Link>{" "}
                to login as admin.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;