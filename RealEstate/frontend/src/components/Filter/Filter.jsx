// src/components/Filter/Filter.jsx

import React, { useState, useRef, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import "./Filter.css";

const Filter = ({ filters, setFilters }) => {
  const [showFilters, setShowFilters] = useState(false);
  const dropdownRef = useRef(null);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => {
      if (type === "checkbox") {
        return {
          ...prev,
          [name]: checked
            ? [...(prev[name] || []), value]
            : prev[name].filter((v) => v !== value),
        };
      } else {
        return {
          ...prev,
          [name]: type === "number" ? Number(value) : value,
        };
      }
    });
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowFilters(false);
    }
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="filter-options">
      <button
        className="filter-button"
        onClick={() => setShowFilters(!showFilters)}
      >
        <FaFilter /> Filters
      </button>
      {showFilters && (
        <div className="filter-dropdown" ref={dropdownRef}>
          <div className="filter-grid">
            <div className="filter-column">
              <div className="filter-section">
                <h4 className="primaryText">Price</h4>
                <input
                  type="number"
                  name="minPrice"
                  placeholder="Min Price"
                  onChange={handleFilterChange}
                  value={filters.minPrice || ""}
                  className="filter-input"
                />
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="Max Price"
                  onChange={handleFilterChange}
                  value={filters.maxPrice || ""}
                  className="filter-input"
                />
              </div>
              <div className="filter-section">
                <h4 className="primaryText">Country</h4>
                <div className="filter-checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="country"
                      value="US"
                      onChange={handleFilterChange}
                      checked={filters.country?.includes("US") || false}
                    />
                    USA
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="country"
                      value="India"
                      onChange={handleFilterChange}
                      checked={filters.country?.includes("India") || false}
                    />
                    India
                  </label>
                  {/* Add more countries as needed */}
                </div>
              </div>
            </div>
            <div className="filter-column">
              <div className="filter-section">
                <h4 className="primaryText">Facilities</h4>
                <input
                  type="number"
                  name="minBedrooms"
                  placeholder="Min Bedrooms"
                  onChange={handleFilterChange}
                  value={filters.minBedrooms || ""}
                  min="0"
                  className="filter-input"
                />
                <input
                  type="number"
                  name="minParking"
                  placeholder="Min Parking"
                  onChange={handleFilterChange}
                  value={filters.minParking || ""}
                  min="0"
                  className="filter-input"
                />
                <input
                  type="number"
                  name="minBathrooms"
                  placeholder="Min Bathrooms"
                  onChange={handleFilterChange}
                  value={filters.minBathrooms || ""}
                  min="0"
                  className="filter-input"
                />
                <input
                  type="number"
                  name="minArea"
                  placeholder="Min Area (sq ft)"
                  onChange={handleFilterChange}
                  value={filters.minArea || ""}
                  min="0"
                  className="filter-input"
                />
                <input
                  type="number"
                  name="maxArea"
                  placeholder="Max Area (sq ft)"
                  onChange={handleFilterChange}
                  value={filters.maxArea || ""}
                  min="0"
                  className="filter-input"
                />
              </div>
            </div>
          </div>
          <div className="clear-button-container">
            <button className="clear-button" onClick={handleClearFilters}>
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
