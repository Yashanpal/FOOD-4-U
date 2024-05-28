import React, { useState } from "react";
import Badge from "react-bootstrap/Badge";
import propTypes from "prop-types";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Modal from "../modal";
import Cart from "../screens/Cart";
import { useCart, useDispatch } from "./ContextReducer";
import "../Styles/Components.css";

const Header = (props) => {
  const [cartview, setcartview] = useState(false);
  const dispatch = useDispatch();
  let data = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("authtoken");
    localStorage.removeItem("user_email");
    localStorage.removeItem("cart");

    // Dispatch the LOGOUT action to clear the cart state
    dispatch({ type: "LOGOUT" });

    navigate("/Login");
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-custom mb-2"
        style={{ background: "linear-gradient(45deg,  #3498db, #9b59b6)" }}
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-strong my-2 mx-4" to="/">
            <i
              className="fa-solid fa-burger fa-beat-fade"
              style={{
                marginRight: "12px",
                background: "linear-gradient(45deg, red, orange, yellow)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            ></i>
            <em
              style={{
                background: "linear-gradient(45deg, red, orange, yellow)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                textTransform: "uppercase",
              }}
            >
              <b>{props.title}</b>
            </em>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {location.pathname !== "/" && location.pathname !== "/AllOrders" && (
                <li className="nav-item">
                  <Link
                    className="nav-link acive text-white fs-5 Line hover-effect"
                    aria-current="page"
                    to="/"
                  >
                    <div>
                      <i
                        className="fa-solid fa-house"
                        style={{ marginRight: "5px" }}
                      ></i>
                      Home
                    </div>
                  </Link>
                </li>
              )}
              {localStorage.getItem("authtoken") && location.pathname !== "/AllOrders" && (
                <li className="nav-item">
                  <Link
                    className="nav-link acive text-white fs-5 mx-1 Line hover-effect"
                    aria-current="page"
                    to="/MyOrder"
                  >
                    {location.pathname !== "/MyOrder" && (
                      <div>
                        <i
                          className="fa-solid fa-clock-rotate-left fa-xl"
                          style={{ marginRight: "7px" }}
                        ></i>
                        My Orders
                      </div>
                    )}
                  </Link>
                </li>
              )}
            </ul>

            {!localStorage.getItem("authtoken") ? (
              <div className="d-flex">
                <Link
                  className="btn text-black bg-white fs-6 mx-1 me-3 hover-effect"
                  aria-current="page"
                  to="/createuser"
                >
                  <i
                    className="fa-solid fa-right-to-bracket"
                    style={{ marginRight: "5px" }}
                  ></i>
                  <b>SignUp</b>
                </Link>

                <Link
                  className="btn text-black bg-white fs-6 mx-1 me-3 hover-effect"
                  to="/Login"
                >
                  <i
                    className="fa-solid fa-right-to-bracket"
                    style={{ marginRight: "5px" }}
                  ></i>
                  <b>Login</b>
                </Link>
              </div>
            ) : (
              <div>
                {location.pathname !== "/AllOrders" && (
                  <div
                    className="btn text-success bg-white fs-6 mx-1 me-3 hover-effect"
                    aria-current="page"
                    onClick={() => setcartview(true)}
                  >
                    <i
                      className="fa-solid fa-cart-shopping"
                      style={{ marginRight: "5px" }}
                    ></i>
                    <b> My Cart</b>{" "}
                    <Badge pill bg="danger">
                      {data.length !== 0 ? data.length : null}
                    </Badge>
                  </div>
                )}
                {cartview && (
                  <Modal onClose={() => setcartview(false)}>
                    <Cart />
                  </Modal>
                )}
                <div
                  className="btn text-danger bg-white fs-6 mx-1 me-3 hover-effect"
                  aria-current="page"
                  onClick={handleLogout}
                >
                  <i
                    className="fa-solid fa-right-from-bracket"
                    style={{ marginRight: "5px" }}
                  ></i>
                  <b>Log Out</b>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

Header.propTypes = {
  title: propTypes.string,
};

Header.defaultProps = {
  title: "Food",
};

export default Header;
