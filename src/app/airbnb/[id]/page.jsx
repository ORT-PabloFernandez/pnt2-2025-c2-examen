"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "../../components/airbnb/airbnblist.css";

export default function AirbnbDetailPage() {
    const { id } = useParams();
    const [airbnb, setAirbnb] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);

  
    useEffect(() => {
        const tokenGuardada = localStorage.getItem("authToken");
        setToken(tokenGuardada);
    }, []);

  
    useEffect(() => {
        const fetchAirbnb = async () => {
            try {
                const response = await fetch(`https://backendairbnb-befph8eegzabfudb.eastus2-01.azurewebsites.net/api/listings/${id}`, { headers: { Authorization: `Bearer ${token}` } });
                
                if (!response.ok) {
                    setAirbnb(null);
                } else {
                    const data = await response.json();
                    setAirbnb(data);
                }
            } catch (error) {
                console.error("Error al cargar detalle", error);
                setAirbnb(null);
            } finally {
                setLoading(false);
            }
        }; fetchAirbnb();
    }, [token, id]);

    const name = airbnb?.name || "Sin nombre";
    const summary = airbnb?.summary || "";
    const picture = airbnb?.images?.picture_url || null;

    return (
        <div className="airbnb-detail-container">
            {loading ? (
                <p>Cargando detalle...</p>
            ) : airbnb ? (
                <div>
                    <h2 className="airbnb-detail-title">{name}</h2>

                    <div className="airbnb-detail-image-container">
                        {picture ? (
                            <img className="airbnb-detail-image" src={picture} alt={name} />
                        ) : (
                            <div className="airbnb-detail-image-placeholder">🏠</div>
                        )}
                    </div>

                    <p className="airbnb-detail-summary">{summary}</p>
                    <p className="airbnb-url">{airbnb.listing_url}</p>
                </div>
            ) : (
                <p>No se encontró la propiedad.</p>
            )}
        </div>
    );
}
