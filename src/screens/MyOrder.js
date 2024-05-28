import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../Styles/screens.css";

const MyOrder = () => {
  const [orderData, setOrderData] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);

  const fetchMyOrder = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/MyorderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("user_email"),
        }),
      });
      const data = await response.json();
      setOrderData(data.orderData);
      setDataFetched(true);
    } catch (error) {
      console.error("Error fetching order data:", error.message);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      {dataFetched && (
        <>
          <div>
            <Header />
          </div>
          <div className="MyOrder mt-4">
            <div className="container ">
              <div className="row">
                {dataFetched &&
                orderData &&
                orderData.order_data &&
                orderData.order_data.length > 0
                  ? orderData.order_data
                      .slice()
                      .reverse()
                      .map((item) => (
                        <div key={item._id}>
                        {item.Order_date && (
                          <div className="m-auto mt-5 fs-4 text-white d-flex justify-content-between align-items-center">
                            <div>
                              <b>{item.Order_date}</b>
                            </div>
                            <div className="text-right">
                                Total : ₹{" "}
                                <b>
                                {(item.order_data.reduce(
                                    (total, product) => total + product.price,
                                    0
                                  ) * 1.05).toFixed(2)}
                                /-
                              </b>
                            </div>
                          </div>
                        )}
                        <hr
                          style={{
                            color: "white",
                            backgroundColor: "white",
                            height: "2px",
                            opacity: 1,
                          }}
                        />
                          {Array.isArray(item.order_data) &&
                          item.order_data.length > 0 ? (
                            <div className="row">
                              {item.order_data.map((product) => (
                                <div
                                  key={product.id}
                                  className="col-12 col-md-6 col-lg-3"
                                >
                                  <div
                                    className="card mt-3 MyOrder-Card"
                                    style={{
                                      width: "16rem",
                                      maxHeight: "360px",
                                      boxShadow:
                                        "5px 5px 15px #e57373, -5px -5px 15px #81c784",
                                      border: "4px solid white",
                                      borderRadius: "20px",
                                      marginBottom: "25px",
                                    }}
                                  >
                                    <div
                                      className="card-body MyOrder-Card"
                                      style={{
                                        borderRadius: "20px",
                                      }}
                                    >
                                      <h5 className="card-title text-white fs-4">
                                        <b>{product.name}</b>
                                      </h5>
                                      <br></br>
                                      <div
                                        className="container w-100 p-0"
                                        style={{ maxheight: "50px" }}
                                      >
                                        <span className="m-1 text-white fs-5">
                                          Size - <b>{product.size}</b> ,{" "}
                                        </span>
                                        <span className="m-1 text-white fs-5">
                                          Qty - <b>{product.qty}</b>
                                        </span>
                                        <br />
                                        <br />
                                        <span className="d-inline text-primary ms-2 h-100 w-20 fs-3">
                                          <b>₹ {product.price}/-</b>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      ))
                  : dataFetched && (
                    <div
                    className="  fs-1 px-5 py-5 mx-5 my-5 text-white NoCategory text-center"
                    style={{ border: "2px solid white", borderRadius: "100px" ,boxShadow: "5px 5px 15px #e57373, -5px -5px 15px #81c784"}}
                  >
                    <div className="Oops">
                      <br></br>
                      <b>OOPS!!!!!!!!</b>
                      <br></br>
                      <br></br>
                      <b>No Orders Yet </b>
                      <br></br><br></br>
                      <b>Please Order Something First </b>
                      <br></br><br></br>
                    </div>
                  </div>
                    )}
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default MyOrder;
