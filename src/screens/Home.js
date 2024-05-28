import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
import "../Styles/screens.css";
const Home = () => {
  const [FoodCat, setFoodCat] = useState([]);
  const [FoodItem, setFoodItem] = useState([]);
  const [search, Setsearch] = useState("");
  const [dataFetched, setDataFetched] = useState(false);

  const loadData = async () => {
    const response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setFoodItem(data[0]);
    setFoodCat(data[1]);
    setDataFetched(true);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredCategories = FoodCat.filter((category) => {
    const matchingItems = FoodItem.some(
      (item) =>
        item.CategoryName === category.CategoryName &&
        item.name.toLowerCase().includes(search.toLowerCase())
    );
    return matchingItems;
  });

  return (
    <div>
      {dataFetched && (
        <>
          <Header title="Food" />

          <div className="Home mt-4 py-3">
            <div className="container">
            <div className="d-flex justify-content-center" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                style={{ borderRadius: "20px" }}
                aria-label="Search"
                value={search}
                onChange={(e) => {
                  Setsearch(e.target.value);
                }}
              />
            </div>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((data) => {
                  return (
                    <div className="row mb-1" key={data._id}>
                      <div className="fs-3 m-3 text-white">
                        <b>{data.CategoryName}</b>
                      </div>
                      <hr
                        style={{
                          color: "white",
                          backgroundColor: "white",
                          height: "2px",
                          opacity: 1,
                        }}
                      />
                      {FoodItem.length > 0 ? (
                        FoodItem.filter(
                          (item) =>
                            item.CategoryName === data.CategoryName &&
                            item.name
                              .toLowerCase()
                              .includes(search.toLowerCase())
                        ).map((filter_items) => (
                          <div
                            key={filter_items._id}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            <Card
                              FoodItem={filter_items}
                              options={filter_items.options[0]}
                            ></Card>
                          </div>
                        ))
                      ) : (
                        <div>No Such Data</div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div
                  className="  fs-1 px-5 py-5 mx-5 my-5 text-white NoCategory text-center"
                  style={{
                    border: "2px solid white",
                    borderRadius: "100px",
                    boxShadow: "5px 5px 15px #e57373, -5px -5px 15px #81c784",
                  }}
                >
                  <div className="Oops">
                    <br></br>
                    <b>OOPS!!!!!!!!</b>
                    <br></br>
                    <br></br>
                    <b>No matching categories</b>
                    <br></br>
                    <br></br>
                  </div>
                </div>
              )}
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;
