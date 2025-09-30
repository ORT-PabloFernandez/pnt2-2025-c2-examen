'use client';

import React, { useState, useEffect } from 'react';
import { FaHome, FaTv } from 'react-icons/fa';
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

const AirbnbDetalle = ({id}) => {

  const [airbnb, setAirbnb] = useState([]);
      const [loading, setLoading] = useState(true);
  useEffect(() => {
        async function fetchAirbnb() {
          try {
            const response = await fetch(`https://backendairbnb-befph8eegzabfudb.eastus2-01.azurewebsites.net/api/listings/${id}`, {
    headers: {Authorization: `Bearer ${localStorage.getItem("authToken")}`}
  });
            const data = await response.json();
            setAirbnb(data);
            setLoading(false);
            console.log(data)
          } catch (error) {
            console.error('Error fetching airbnbs:', error);
            setLoading(false);
          }
        }
    
        fetchAirbnb();
      }, []);

  return (
    <div className="airbnb-container">
      {airbnb.images?.picture_url ? (
        <img 
          src={airbnb.images.picture_url} 
          alt={airbnb.name} 
          className="movie-poster"
        />
      ) : (
        <div className="airbnb-fallback">
          <span className="blackIcon"><FaTv /></span>
        </div>
      )}
      <p className="airbnb-title">{airbnb.name}</p>
      <span className="">{airbnb.listing_url}</span>
      <span className="">{airbnb.summary}</span>
    </div>
  );
};

export default AirbnbDetalle;
