'use client';

import { use, useState, useEffect } from 'react';
import AirbnbCard from "../AirbnbCard";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import '../../components/airbnb/airbnblist.css';


export default function AirbnbDetail({ params }) {
    const { id } = use(params);
    const [airbnb, setAirbnb] = useState([]);
    const [favorite, setFavorite] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    useEffect(() => {
        async function fetchAirbnbs() {
            try {
                var authToken = localStorage.getItem('authToken');
                const response = await fetch(`https://backendairbnb-befph8eegzabfudb.eastus2-01.azurewebsites.net/api/listings/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": "Bearer " + authToken
                    }
                });
                const data = await response.json();
                setAirbnb(data);
                console.log(data);
                console.log(airbnb);
            } catch (error) {
                console.error('Error fetching airbnbs:', error);
            }
        }
        fetchAirbnbs();
    }, []);

    return (
        <div>Detalle del Airbnb
            <div className="airbnb-card">
                {airbnb.listing_url && !imageError ? (
                    <div className="airbnb-image-container">
                        <img
                            className="airbnb-image"
                            src={airbnb.images.picture_url}
                            onError={handleImageError}
                        />
                    </div>
                ) : (
                    <div className="airbnb-sin-foto">
                        Sin fotos disponibles!
                    </div>
                )}

                <h2 className="airbnb-title">{airbnb.name}</h2>
                <p className="airbnb-summary">{airbnb.summary}</p>

                {favorite ? (
                    <FaHeart
                        onClick={() => setFavorite(!favorite)}>
                    </FaHeart>
                ) : (
                    <FaRegHeart
                        onClick={() => setFavorite(!favorite)}>
                    </FaRegHeart>
                )}

            </div>
        </div>
    );

}