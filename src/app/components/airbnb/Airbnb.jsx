'use client';

import "./airbnblist.css";
import { useState, useEffect } from "react";
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Airbnb({ airbnb }) {
    const id = String(airbnb._id || airbnb.id);
    const name = airbnb.name || "Sin nombre";
    const summary = airbnb.summary || "";
    const picture = airbnb.images?.picture_url || null;
    const [favorito, setFavorito] = useState(false);

    useEffect(() => {
      try {
        const guardado = localStorage.getItem('favorites');
        const lista = guardado ? JSON.parse(guardado) : [];
        setFavorito(Array.isArray(lista) && lista.includes(id));
      } catch {
        setFavorito(false);
      }
    }, [id]);

    const toggleFav = () => {
      try {
        const guardado = localStorage.getItem('favorites');
        const lista = guardado ? JSON.parse(guardado) : [];
        const existe = Array.isArray(lista) && lista.includes(id);

        const siguiente = existe ? lista.filter(x => x !== id) : [...lista, id];
        localStorage.setItem('favorites', JSON.stringify(siguiente));
        setFavorito(!existe);
      } catch {
        localStorage.setItem('favorites', JSON.stringify([id]));
        setFavorito(true);
      }
    };

    return (
      <div className="airbnb-card">
        <div className="airbnb-image-container">
          {picture ? (
            <img className="airbnb-image" src={picture} alt={name} loading="lazy" />
          ) : (
            <div className="airbnb-image-placeholder">🏠</div>
          )}

          <button type="button" className="favorite-button" onClick={toggleFav}>
            <span className={`favorite-icon ${favorito ? 'favorited' : 'not-favorited'}`}>
              <FontAwesomeIcon icon={favorito ? solidHeart : regularHeart} />
            </span>
          </button>
        </div>

        <div className="airbnb-content">
          <p className="airbnb-name">{name}</p>
          <p className="airbnb-summary">{summary}</p>
          {airbnb.listing_url && <p className="airbnb-url">{airbnb.listing_url}</p>}
        </div>
      </div>
    );
}
