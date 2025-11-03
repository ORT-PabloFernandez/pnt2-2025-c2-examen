'use client'

import AirbnbList from "../components/airbnb/AirbnbList";
import { useState, useEffect } from "react";

export default function AirbnbPage() {
    const [loading, setLoading] = useState(true);
    const [airbnbs, setAirbnbs] = useState([]);
    const [token, setToken] = useState(null);
    const [page, setPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        const tokenGuardada = localStorage.getItem('authToken');
        setToken(tokenGuardada);
    }, []);

    useEffect(() => {
        const fetchAirbnbs = async () => {
            try {
                const response = await fetch(`https://backendairbnb-befph8eegzabfudb.eastus2-01.azurewebsites.net/api/listings?pageSize=${pageSize}&page=${page}`, {headers: token ? { Authorization: `Bearer ${token}`} : {}});
                const data = await response.json();
                setAirbnbs(data);
                setLoading(false);
            } catch (error) {
                console.error('Error al cargar listado', error);
                setLoading(false);
            }
        };
        if (token) fetchAirbnbs();
    }, [token, page]);

    return (
        <div className="airbnb-container">
            <h2 className="airbnb-title">Listado de Airbnb</h2>

            {loading ? (
                <p>Cargando sitios...</p>
            ) : (
                <div>
                    <AirbnbList airbnbs={airbnbs} />

                    <div className="airbnb-pagination">
                        <button
                            className="retry-button"
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                        >
                        ← Anterior
                        </button>

                        <span className="airbnb-subtitle">Página {page}</span>

                        <button
                            className="retry-button"
                            onClick={() => setPage(page + 1)}
                            disabled={airbnbs.length < pageSize}
                        >
                        Siguiente →
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}