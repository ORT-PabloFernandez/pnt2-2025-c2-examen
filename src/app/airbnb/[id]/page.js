'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import '../airbnblist.css';

export default function AirbnbDetail() {
    const params = useParams();
    const [airbnb, setAirbnb] = useState(null);
    const [imageError, setImageError] = useState(false);

    console.log(params.id);
    useEffect(() => {
        const fetchAirbnb = async () => {
            const authToken = localStorage.getItem('authToken');
            const response = await fetch(`https://backendairbnb-befph8eegzabfudb.eastus2-01.azurewebsites.net/api/listings/${params.id}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            const data = await response.json();
            setAirbnb(data);
            console.log(data);
        }
        fetchAirbnb();
    }, [params.id]);

    if (!airbnb) {
        return <div>Loading...</div>;
    }
    return (
        <div className="airbnb-detail-container">
            <div className="airbnb-detail-header">
            </div>
            <h2 className="airbnb-detail-title">{airbnb.name}</h2>

            <div className="airbnb-detail-image ">
                <img
                    src={airbnb.images.picture_url}
                    alt={airbnb.name}
                    className="airbnb-image"
                ></img>

                <div className="airbnb-detail-info">
                    <p className="airbnb-detail-summary">{airbnb.summary}</p>
                    <p className="airbnb-detail-url">URL: <a href={airbnb.listing_url} target="_blank" rel="noopener noreferrer">{airbnb.listing_url}</a></p>

                    <p className="airbnb-detail-room-type">Room Type: {airbnb.room_type}</p>

                    <p className="airbnb-detail-cancellation-policy">Cancellation Policy: {airbnb.cancellation_policy}</p>
                </div>
            </div>
        </div>
    );
}