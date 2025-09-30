"use client";

import { useState, useEffect } from "react";
import AirbnbList from "../components/airbnb/AirbnbList";

function AirbnbPage() {
  const [airbnbs, setAirbnbs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [token, setToken] = useState("");

  const setSiguiente = () => {
    setPage(page + 1);
  };

  const setAnterior = () => {
    setPage(page - 1);
  };

  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await fetch(
          "https://backendairbnb-befph8eegzabfudb.eastus2-01.azurewebsites.net/api/users/login",
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: "user1@ort.edu.ar",
              password: "abc123",
            }),
          }
        );
        const data = await response.json();
        setToken(data.token);
        setLoading(false);
        console.log(token);
      } catch (error) {
        console.error("Error fetching airbnbs:", error);
        setLoading(false);
      }
    }

    async function fetchAirbnbs() {
      try {
        const response = await fetch(
          `https://backendairbnb-befph8eegzabfudb.eastus2-01.azurewebsites.net/api/listings?pageSize=5&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(localStorage.getItem("authToken"))}`,
            },
          }
        );
        const data = await response.json();
        setAirbnbs(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error("Error fetching airbnbs:", error);
        setLoading(false);
      }
    }
fetchToken()
    fetchAirbnbs();
  }, [page]);

  return (
    <>
      <main className="airbnb-page">
        {loading ? (
          <p>Cargando airbnbs...</p>
        ) : (
          <>
            <AirbnbList
              airbnbs={airbnbs}
              sigPagina={setSiguiente}
              prevPagina={setAnterior}
            />
          </>
        )}
      </main>
    </>
  );
}

export default AirbnbPage;
