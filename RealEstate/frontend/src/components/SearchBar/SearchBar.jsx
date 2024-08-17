import React, { useState, useContext, useEffect } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { SearchContext } from "../../context/searchContext";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = ({ filter, setFilter }) => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const location = useLocation(); // Get the current URL path
  const navigate = useNavigate(); // Corrected: Use the navigate function

  const handleSearch = () => {
    if (location.pathname === "/" && filter !== "") {
      setSearchTerm(filter); // Set the search term before navigating
      navigate("/properties"); // Corrected: Navigate programmatically
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Trigger search on Enter key press
    }
  };

  useEffect(() => {
    if (location.pathname === "/properties") {
      setSearchTerm(filter);
      // console.log(location.pathname, searchTerm);
    }
  }, [ location.pathname, setSearchTerm]);

  return (
    <div className="flexCenter search-bar">
      <HiLocationMarker color="var(--blue)" size={25} />
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        onKeyPress={handleKeyPress} // Add keypress event listener
        placeholder="Search properties..."
      />
      <button className="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
