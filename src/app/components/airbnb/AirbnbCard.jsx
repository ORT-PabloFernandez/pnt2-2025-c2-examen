'use client';

import React, { useState, useEffect } from 'react';
import { FaHome, FaTv } from 'react-icons/fa';
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AirbnbCard = ({airbnb}) => {

    const [favorito, setFavorito] = useState(false)
    const [favoritos, setFavoritos] = useState([])

    const marcarFavorito = () => {
    setFavorito(!favorito);
    setFavoritos(...favoritos.push(airbnb))
    localStorage.setItem("favoritos", JSON.stringify(airbnb._id))
  };

  return (
    <div className="airbnb-container">
        <Link href={`airbnb/${airbnb._id}`}>
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
      <br />
      <span className="">{airbnb.summary}</span>
      </Link>
      <button onClick={marcarFavorito}>
        <FontAwesomeIcon icon={favorito ? solidHeart : regularHeart} />
       </button>
    </div>
  );
};

export default AirbnbCard;