import React from "react";
import "./GetStarted.css";
import sendSubscriptionEmail from "../../utils/sendSubscriptionEmail"; // Adjust the import path as needed
import { useAuth0 } from "@auth0/auth0-react"; // Import useAuth0
import { toast } from "react-toastify"; // Import toast

const GetStarted = () => {
  const { user } = useAuth0(); // Get user data from Auth0

  const handleGetStarted = () => {
    if (!user?.email) {
      toast.error("You need to log in to subscribe.");
      return;
    }
    
    const data = {
      userEmail: user?.email, // User's email
      userName: user?.name || "User" // Use user's name if available
    };

    sendSubscriptionEmail(user?.email, data);
  };

  return (
    <section className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
          <span className="primaryText">Get started with Grigo</span>
          <span className="secondaryText">
            Subscribe and find super attractive price quotes from us.
            <br />
            Find your residence soon
          </span>
          <button className="button" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
