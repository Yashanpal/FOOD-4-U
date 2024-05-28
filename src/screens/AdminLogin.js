import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/screens.css";

const AdminLogin = () => {
  const [adminCred, setAdminCred] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      email: adminCred.email,
      password: adminCred.password,
    });

    const response = await fetch("http://localhost:5000/api/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: adminCred.email,
        password: adminCred.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      // Admin authenticated, redirect to admin dashboard
      // Make sure to save the token in localStorage
      localStorage.setItem("authtoken", json.authtoken);
      navigate("/AllOrders");
    } else {
      alert("Admin login failed. Please check your credentials.");
    }
  };

  const onChange = (e) => {
    setAdminCred({ ...adminCred, [e.target.name]: e.target.value });
  };
  return (
    <div className="Login">
      <div className="form-box" style={{ height: "500px" }}>
        <h1 id="title">Admin</h1>
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
                  value={adminCred.email}
                />
              </div>
              <div className="input-field">
                <i className="fa-solid fa-key"></i>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={onChange}
                  value={adminCred.password}
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
                Not an admin? Go back to{" "}
                <Link to="/login">
                  <b>user login</b>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;