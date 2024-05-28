import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../Styles/screens.css";

const AllOrders = () => {
  const [orderData, setOrderData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Sales Daywise");
  const [dropdownText, setDropdownText] = useState("Select Option");

  const fetchAllOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/allOrderData");
      const data = await response.json();
      console.log("Fetched order data:", data);
      setOrderData(data.orderData);
      setDataFetched(true);
    } catch (error) {
      console.error("Error fetching order data:", error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const groupOrdersByDate = (orders) => {
    const groupedOrders = new Map();

    orders.forEach((order) => {
      order.order_data.forEach((orderDetails) => {
        const date = orderDetails.Order_date.split(",")[0];
        if (!groupedOrders.has(date)) {
          groupedOrders.set(date, []);
        }
        groupedOrders.get(date).push(...orderDetails.order_data);
      });
    });

    // Sort the grouped orders by date in descending order
    const sortedGroupedOrders = new Map(
      [...groupedOrders.entries()].sort(([dateA], [dateB]) => {
        const dateAObject = new Date(dateA.split("/").reverse().join("-"));
        const dateBObject = new Date(dateB.split("/").reverse().join("-"));
        return dateBObject - dateAObject;
      })
    );

    return sortedGroupedOrders;
  };

  const calculateTotalPrice = (orderItems) => {
    return (orderItems.reduce((total, item) => total + item.price, 0) * 1.05).toFixed(2);
  };

  const groupedOrders = groupOrdersByDate(orderData);

  // Count the number of times each product has been ordered
  const productCount = orderData
    .flatMap((order) => order.order_data.flatMap((orderDetails) => orderDetails.order_data))
    .reduce((acc, orderItem) => {
      const existingProductIndex = acc.findIndex((product) => product.id === orderItem.id);
      if (existingProductIndex !== -1) {
        acc[existingProductIndex].qty += orderItem.qty;
      } else {
        acc.push({ id: orderItem.id, name: orderItem.name, qty: orderItem.qty });
      }
      return acc;
    }, [])
    .sort((a, b) => b.qty - a.qty);

  console.log("Product Count:", productCount);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setDropdownText(option);
  };

  return (
    <div>
      {dataFetched ? (
        <>
          <Header />
          <div className="MyOrder mt-4">
            <div className="container">
              <div className="d-flex justify-content-center mb-4">
                <div className="dropdown" style={{ marginTop: "50px" }}>
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {dropdownText}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleOptionClick("Sales Daywise")}
                      >
                        Sales Daywise
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleOptionClick("Top Products")}
                      >
                        Top Products
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              {selectedOption === "Sales Daywise" &&
                Array.from(groupedOrders.keys()).map((date) => (
                  <div key={date} className="mb-5">
                    <div className="m-auto mt-5 fs-4 text-white d-flex justify-content-between align-items-center">
                      <div>
                        <b>{date}</b>
                      </div>
                      <div className="text-right">
                        Total: ₹ <b>{calculateTotalPrice(groupedOrders.get(date))}/-</b>
                      </div>
                    </div>
                    <hr
                      style={{
                        color: "white",
                        backgroundColor: "white",
                        height: "2px",
                        opacity: 1,
                      }}
                    />
                    <div className="table-responsive">
                      <table className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">Product Name</th>
                            <th scope="col">Size</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {groupedOrders.get(date).map((product) => (
                            <tr key={product.id}>
                              <td>{product.name}</td>
                              <td>{product.size}</td>
                              <td>{product.qty}</td>
                              <td>₹ {product.price}/-</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              {selectedOption === "Top Products" && (
                <div className="table-responsive">
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Quantity Ordered</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productCount.map((product) => (
                        <tr key={product.id}>
                          <td>{product.name}</td>
                          <td>{product.qty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <div
          className="fs-1 px-5 py-5 mx-5 my-5 text-white NoCategory text-center"
          style={{
            border: "2px solid white",
            borderRadius: "100px",
            boxShadow: "5px 5px 15px #e57373, -5px -5px 15px #81c784",
          }}
        >
          <div className="Oops">
            <br />
            <b>OOPS!!!!!!!!</b>
            <br />
            <br />
            <b>No Orders Yet</b>

            <br />
            <br />
            <b>Please Order Something First</b>
            <br />
            <br />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllOrders;
