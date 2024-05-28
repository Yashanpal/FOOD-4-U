import React, { useState } from "react";
import "../Styles/screens.css"; 
import { Link,useNavigate } from "react-router-dom"
const SignUp = () => {
  const [cred, setcred] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  let navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); //A synthetic event
    console.log({
      name: cred.name,
      email: cred.email,
      password: cred.password,
      location: cred.location,
    });
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cred.name,
        email: cred.email,
        password: cred.password,
        location: cred.location,
      }),
    });
    const json = await response.json();
    console.log(json);

    
    if (json.success) {
      // Handle successful registration if needed
      console.log("User registered successfully");

      // Set the authentication token in local storage
      localStorage.setItem("authtoken", json.authtoken);

      // Redirect to the home page
      navigate("/Login");
    } else {
      if (json.errors && typeof json.errors === "string" && json.errors === "User already exists") {
        alert("User with this email already exists. Please use a different email.");
      } else if (json.errors && Array.isArray(json.errors)) {
        // Validation errors
        alert(`Validation errors: ${json.errors.map((error) => error.msg).join(", ")}`);
      } else {
        // Generic error message
        alert("An error occurred. Please try again later.");
      }
    }
  
  };
  const onChange = (f) => {
    setcred({ ...cred, [f.target.name]: f.target.value });
  };
  return (
    <div className="Login">
      <div className="form-box">
        <h1 id="title">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div
            className="container"
            style={{
              height: "275px",
              width: "100%",
              
              backgroundposition: "center",
              backgroundsize: "cover",
              position: "relative",
            }}
          >
            <div className="input-group">
              <div className="input-field" id="namefield">
                <i className="fa-solid fa-user-secret"></i>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={onChange}
                  value={cred.name}
                />
              </div>
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
              <div className="input-field">
                <i className="fa-solid fa-location"></i>
                <input
                  type="text"
                  placeholder="Address"
                  name="location"
                  onChange={onChange}
                  value={cred.location}
                />
              </div>
            </div>

            <div className=" btno">
              <button type="submit" id="Signup">
                <b>Sign Up</b>
              </button>
            </div>

            <div className="mt-2">
              <p>
                Already a user goto{" "}
                <Link to="/Login ">
                  <b>Login</b>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
