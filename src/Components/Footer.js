import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="mt-4 ">
      <div className="  text-light  py-3 "style={{background:"linear-gradient(45deg,  #3498db, #9b59b6)"}}>
        <footer className="text-center fs-3 my-3"style={{background:"linear-gradient(45deg,  #3498db, #9b59b6)"}}>
          Copyright  Food Delivery.com
<br></br><br></br>
              <Link to="/" className="nav-link text-light">
                Home
              </Link>

        </footer>
      </div>
    </div>
  )
}

export default Footer;
