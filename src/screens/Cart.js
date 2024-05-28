import React, { useEffect } from "react";
import { useCart, useDispatch } from "../Components/ContextReducer";
import { useNavigate } from "react-router-dom";
import trash from "../trash.svg";
import "../Styles/screens.css";

const Cart = () => {
  let data = useCart();
  let dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(data));
  }, [data]);

  const handleCheckout = async () => {
    let user_email = localStorage.getItem("user_email");
    let totalPrice = data.reduce((total, food) => total + food.price, 0);
    

    try {
      const response = await fetch("http://localhost:5000/api/orderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_data: data,
          email: user_email,
          order_date: new Date().toLocaleString(),
          total_price: totalPrice,
        }),
      });

      if (response.status === 200) {
        await dispatch({ type: "DROP" });
        navigate("/");
      } else {
        console.error("Failed to place order");
        // Handle failure scenario
      }
    } catch (error) {
      console.error("Error placing order:", error);
      // Handle error scenario
    }
  };

  if (data.length === 0) {
    return (
      <div className="container d-flex justify-content-center align-items-center">
        <div className="m-5 w-100 text-center fs-3">
          <h1 className="text-danger" style={{ marginTop: "100px" }}>
            The Cart is Empty !!!
          </h1>{" "}
          <br></br>
          <br></br>
          <h1 className="text-success" style={{ marginTop: "70px" }}>
            Please Add some items to Cart !!!
          </h1>
        </div>
      </div>
    );
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  
  const totalWithGST = (totalPrice * 1.05).toFixed(2);
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive-sm table-responsive-md ">
        <table className="table table-hover ">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">Sr. No.</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col" className="text-danger">
                <b>#</b>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button
                    type="button"
                    className="btn hover-effect delete p-0"
                    onClick={() => {
                      dispatch({ type: "REMOVE", index: index });
                    }}
                  >
                    <img
                      src={trash}
                      alt="delete"
                      style={{ width: "24px", height: "24px" }}
                    />
                  </button>
                </td>{" "}
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <h1 className="fs-3 text-primary text-center  mt-5">
            Total : ₹{totalPrice}/- <br></br><br></br> Total Include GST : ₹{totalWithGST}/-
          </h1>
        </div>

        <div className="d-flex justify-content-center">
          <button
            className="btn bg-success text-white mt-5"
            style={{ marginLeft: "10px", marginBottom: "50px" }}
            onClick={handleCheckout}
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
