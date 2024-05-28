import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatch } from "./ContextReducer";
import "../Styles/Components.css"; 

const Card = (props) => {
  let dispatch = useDispatch();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceoption = Object.keys(options);

  const [qty, setqty] = useState(1);
  const [size, setsize] = useState("");

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    dispatch({ type: "SET_CART", cart: cartData });
    setsize(priceRef.current.value);
  }, [dispatch]);

  const handleAdd = async () => {
    if (!localStorage.getItem("authtoken")) {
      window.alert("Please login or signup first.");
      return;
    }
  
    // Use find method to search for the item in the array
    let food = Array.isArray(data) ? data.find((item) => item.id === props.FoodItem._id) : null;
  
    const finalPrice = qty * parseInt(options[size]) || 0;
  
    if (food) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.FoodItem._id,
          price: finalPrice,
          qty: qty,
        });
        localStorage.setItem("cart", JSON.stringify(data));
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.FoodItem._id,
          name: props.FoodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
        });
        localStorage.setItem("cart", JSON.stringify(data));
        return;
      }
      return;
    }
  
    await dispatch({
      type: "ADD",
      id: props.FoodItem._id,
      name: props.FoodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
    localStorage.setItem("cart", JSON.stringify(data));
  };

  const handleSizeChange = (e) => {
    setsize(e.target.value);
  };

  const handleQtyChange = (e) => {
    setqty(e.target.value);
  };

  useEffect(() => {
    // Update qty after size is set
    if (size !== priceRef.current.value) {
      // Only set qty to 1 if the size has changed
      setqty(1);
    }
  }, [size]);
  

  return (
    <div className="m-3 " style={{ maxWidth: "100%" }}>
      <div
        className="card m-3"
        style={{
          width: "18rem",
          maxHeight: "360px",
          boxShadow: "5px 5px 15px #e57373, -5px -5px 15px #81c784",
          border: "0px solid #6B4226",
          borderRadius:"50px"
        }}
      >
        <img
          src={props.FoodItem.img}
          style={{ height: "150px", objectFit: "fill" ,borderBottom:"1px solid dark",
          borderTopLeftRadius: "50px",
          borderTopRightRadius: "50px"}}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body " style={{ justifyContent: "space-evenly",background:
                                          "#DEB887" ,
                                          borderBottomLeftRadius:"50px",borderBottomRightRadius:"50px"}}>
          <h5
            className="card-title justify-content-center"
            style={{ marginLeft: "23px", textTransform: "uppercase" }}
          >
            <b>{props.FoodItem.name}</b>
          </h5>

          <div
            style={{ justifyContent: "space-evenly" ,fontWeight: "bold"}}
            className="container w-100 d-flex justify-content align-items-center "
          >
            <div style={{ fontWeight: "bold" }}>
              <select
                className="m-2 h-100  bg-danger rounded hover-effect"
                style={{
                  maxHeight: "360px",
                  padding: "5px",
                  fontWeight: "bold",
                }}
                onChange={handleQtyChange}
              >
                {Array.from(Array(6), (e, i) => (
                  <option
                    
                    key={i + 1}
                    value={i + 1}
                  >
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                className="m-2 h-100  bg-danger rounded hover-effect"
                ref={priceRef}
                onChange={handleSizeChange}
                style={{ padding: "5px", fontWeight: "bold" }}
              >
                {priceoption.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
            </div>

            <div className="d-inline h-100 fs-5">
              <b>₹{qty * parseInt(options[size]) || 0}/-</b>
            </div>
          </div>
          <hr></hr>
          <button
            className="btn btn-danger text-dark justify-center AddToCart hover-effect  "
            onClick={handleAdd}
            style={{ marginLeft: "23px" }}
          >
            <i
              className="fa-solid fa-cart-plus"
              style={{ marginRight: "5px" }}
            ></i>
            <b className="fw-bold">Add to Cart</b>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;