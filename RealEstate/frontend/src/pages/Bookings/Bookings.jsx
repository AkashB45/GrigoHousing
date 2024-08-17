import React, { useContext, useState } from "react";
import "../Properties/Properties.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import UserDetailContext from "../../context/UserDetailsContext";
import Filter from "../../components/Filter/Filter";

const Bookings = () => {
  const { data, isError, isLoading } = useProperties();
  const {
    userDetails: { bookings },
  } = useContext(UserDetailContext);

  const [filter, setFilter] = useState("");
  const [filters, setFilters] = useState({});

  if (isError) {
    return (
      <div className="p-wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  const filteredData = data
  .filter((card) => bookings.map((booking) => booking.id).includes(card.id))
  .filter(
    (card) =>
      card.title.toLowerCase().includes(filter.toLowerCase()) ||
      card.description.toLowerCase().includes(filter.toLowerCase()) ||
      card.city.toLowerCase().includes(filter.toLowerCase()) ||
      card.country.toLowerCase().includes(filter.toLowerCase())
  )
  .filter((card) => {
    if (filters.minPrice && card.price < filters.minPrice) return false;
    if (filters.maxPrice && card.price > filters.maxPrice) return false;
    if (
      filters.country &&
      filters.country.length > 0 &&
      !filters.country.includes(card.country)
    )
      return false;
    if (filters.minBedrooms && card.facilities.bedrooms < filters.minBedrooms)
      return false;
    if (filters.minParking && card.facilities.parking < filters.minParking)
      return false;
    if (filters.minBathrooms && card.facilities.bathrooms < filters.minBathrooms)
      return false;
    if (filters.minArea && card.facilities.area < filters.minArea) return false;
    if (filters.maxArea && card.facilities.area > filters.maxArea) return false; // Add this line
    return true;
  });

  return (
    <section className="p-wrapper">
      <div className="flexColCenter paddings innerWidth p-container">
      <div className="p-header">
          <SearchBar filter={filter} setFilter={setFilter} />
          <Filter filters={filters} setFilters={setFilters} />
        </div>
        <div className="paddings flexCenter p-properties">
          {filteredData.map((card, i) => (
            <PropertyCard key={i} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bookings;
