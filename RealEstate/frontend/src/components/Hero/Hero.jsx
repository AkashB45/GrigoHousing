import React ,{useState}from "react";
import "./Hero.css";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import SearchBar from "../SearchBar/SearchBar";
const Hero = () => {
  const [filter, setFilter] = useState("");
  return (
    <section className=" hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        <div className="flexColStart  hero-left">
          <div className="hero-title">
            <div className="orange-circle"></div>
            <motion.h1
            initial={{y:"2rem",opacity:0}}
            animate={{y:0,opacity:1}}
            transition={{duration:2,type:"spring"}}
            >
              Discover <br /> your dream <br />
              property
            </motion.h1>
          </div>
          <div className=" flexColStart hero-des">
            <span className="secondaryText">Find a variety of property that suits you easily</span>
            <span className="secondaryText">Forget all difficulties in finding a residence for you</span>
          </div>
          <SearchBar filter={filter} setFilter={setFilter}/>
          <div className="flexCenter stats">
            <div className="flexColCenter stat">
              <span>
                <CountUp start={8800} end={9000} duration={4} />
                <span>+</span>
              </span>
              <span className="secondaryText">Premium Property</span>
            </div>
            <div className="flexColCenter stat">
              <span>
                <CountUp start={3800} end={4000} duration={4} />
                <span>+</span>
              </span>
              <span className="secondaryText">Happy Customers</span>
            </div>
            <div className="flexColCenter stat">
              <span>
                <CountUp end={25} />
                <span>+</span>
              </span>
              <span className="secondaryText">Award Winnings</span>
            </div>
          </div>
        </div>
        <motion.div 
        initial={{x:"7rem",opacity:0}}
        animate={{x:0,opacity:1}}
        transition={{duration:2,type:"spring"}}
        className="flexCenter hero-right">
          <div className="image-container">
            <img src="./hero-image.png" alt="" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
