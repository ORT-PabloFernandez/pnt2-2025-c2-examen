'use client';

import React from "react";
import { useEffect, useState } from "react";
import AirbnbCard from "./AirbnbCard";

export default function Airbnb() {
    const [airbnbs, setAirbnbs] = useState([]);

    useEffect(() => {
        async function fetchAirbnbs() {
            try {
                var authToken = localStorage.getItem('authToken');
                const response = await fetch('https://backendairbnb-befph8eegzabfudb.eastus2-01.azurewebsites.net/api/listings?pageSize=100&page=1${authToken}', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": "Bearer " + authToken
                    }
                });
                const data = await response.json();
                setAirbnbs(data);
            } catch (error) {
                console.log("error")
                console.error('Error fetching airbnbs:', error);
            }
        }
        fetchAirbnbs();
    }, []);

    return (
        <div className="airbnb-page">
            <div className="airbnb-grid">
                {airbnbs.map((airbnb) => (
                    <AirbnbCard key={airbnb._id} airbnb={airbnb} />
                ))}
            </div>
        </div>
    );
};

