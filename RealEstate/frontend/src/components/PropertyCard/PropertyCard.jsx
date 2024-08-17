import { AiFillHeart } from "react-icons/ai";
import React from "react";
import "./PropertyCard.css";
import { truncate } from "lodash";
import { useNavigate } from "react-router-dom";
import Heart from "../Heart/Heart";
const PropertyCard = ({ card }) => {
  const navigate = useNavigate();
  return (
    <div className="flexColStart r-card" onClick={() => navigate(`/properties/${card.id}`)}>
      <div className={"heart-icon"}>
        <Heart id={card.id} />
      </div>
      <img src={card.image} alt="img" />
      <span className="secondaryText r-price">
        <span style={{ color: "orange" }}>₹</span>
        <span>{card.price}</span>
      </span>
      <span className="primaryText">
        {truncate(card.title, { length: 18 })}
      </span>
      <span className="secondaryText">
        {truncate(card.description, { length: 80 })}
      </span>
    </div>
  );
};

export default PropertyCard;
