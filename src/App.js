import "./App.css";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import { CartProvider } from "./Components/ContextReducer";
import MyOrder from "./screens/MyOrder";
import AdminLogin from "./screens/AdminLogin";
import AllOrders from "./screens/AllOrders";


function App() {
  return (
    <CartProvider>
    <Router>
      
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/Login" element={<Login/>}></Route>
        <Route exact path="/createuser" element={<SignUp/>}></Route>
        <Route exact path="/MyOrder" element={<MyOrder/>}></Route>
        <Route exact path="/AllOrders" element={<AllOrders/>}></Route>
        <Route exact path="/Admin" element={<AdminLogin/>}></Route>

        
      </Routes>
    </Router>
    </CartProvider>
  );
}
export default App;
