import React from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const Footer = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (!isLoggedIn && (path === "/favourites" || path === "/bookings")) {
      // Show toast error if the user is not logged in
      toast.error("You must be logged in.");
    } else {
      navigate(path);
      window.scrollTo(0, 0); // Scroll to the top of the page
    }
  };

  return (
    <section className="f-wrapper">
      <div className="paddings innerWidth flexCenter f-container">
        <div className="flexColStart f-left">
          <img
            onClick={() => handleNavigation("/")}
            src="./logo2.png"
            alt=""
            width={220}
          />
          <span className="secondaryText">
            Our vision is to make all people <br />
            the best place to live for them.
          </span>
        </div>
        <div className="flexColStart f-right">
          <span className="primaryText">Information</span>
          <span className="secondaryText">
            45B, Vangapalayam, Karur, Tamil Nadu
          </span>
          <div className="flexCenter f-menu">
            <span onClick={() => handleNavigation("/properties")}>
              Properties
            </span>
            <span onClick={() => handleNavigation("/favourites")}>
              Favourites
            </span>
            <span onClick={() => handleNavigation("/bookings")}>Bookings</span>
          </div>
          <div className="flexCenter f-contact">
            <a href="mailto:akashbalaji594@gmail.com" className="secondaryText">
              akashbalaji594@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
