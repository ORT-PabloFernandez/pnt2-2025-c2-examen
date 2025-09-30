'use client';

import { useState, useEffect } from "react";
import React from "react";
import './airbnblist.css';
import AirbnbList from "./AirbnbList";


export default function Home() {
    console.log("Rendering Airbnb Page");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const API_BASE_URL = 'https://backendairbnb-befph8eegzabfudb.eastus2-01.azurewebsites.net';

    useEffect(() => {
        async function fetchData() {
            try {
                const authToken = localStorage.getItem('authToken');
                const response = await fetch(`${API_BASE_URL}/api/listings?pageSize=100&page=${page}`, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    }
                });
                const data = await response.json();

                setData(data);
                setLoading(false);
                console.log("Fetched data:", data);

            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        }

        fetchData();
    }, [page]);

    return (
        <main className="airbnb-container">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <AirbnbList Airbnbs={data || []} />


                    <div >
                        <button
                            onClick={() => setPage(prev => prev > 1 ? prev - 1 : 1)}
                            disabled={page === 1}

                        > Previous</button>
                        <span > Page {page} </span>
                        <button
                            onClick={() => setPage(prev => prev + 1)}

                        > Next</button>
                    </div>
                </>
            )}
        </main>
    );
}