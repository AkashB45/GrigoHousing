import React from "react";
import Hero from "../components/Hero/Hero";
import "../App.css";
import Companies from "../components/Companies/Companies";
import Residencies from "../components/Residencies/Residencies";
import Value from "../components/Value/Value";
import Contact from "../components/Contact/Contact";
import GetStarted from "../components/GetStarted/GetStarted";
import Chatbot from "../pages/ChatBot/Chatbot";
const Website = () => {
  return (
    <div className="App">
      <div>
        <div className="white-gradient"></div>
        <Hero />
      </div>
      <Companies />
      <Residencies />
      <Value />
      <Contact />
      <GetStarted />
      {/* <Chatbot/> */}
    </div>
  );
};

export default Website;
