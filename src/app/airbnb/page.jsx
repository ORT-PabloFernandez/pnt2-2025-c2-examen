'use client';

import React, { useEffect, useState } from "react";

const API_BASE = "https://backendairbnb-befph8eegzabfudb.eastus2-01.azurewebsites.net";

export default function AirbnbList() {
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedFavs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(savedFavs);

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No hay token. Inicia sesión primero.");

        const res = await fetch(`${API_BASE}/api/listings?pageSize=100&page=1`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Error en la petición");

        const data = await res.json();
        setItems(Array.isArray(data) ? data : data.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleFavorite = (id) => {
    let updated = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Listado de Airbnb</h1>
      <ul>
        {items.map((item) => {
          const id = item._id || item.id;
          return (
            <li key={id}>
              <strong>{item.name}</strong>{" "}
              <button onClick={() => toggleFavorite(id)}>
                {favorites.includes(id) ? "★" : "☆"}
              </button>
              {item.listing_url && (
                <a href={item.listing_url} target="_blank"> Ver Link</a>
              )}
              <p>{item.summary}</p>
              {item.picture_url && <img src={item.picture_url} alt={item.name} width={200} />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

