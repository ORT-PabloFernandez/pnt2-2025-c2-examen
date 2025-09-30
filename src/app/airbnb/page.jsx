'use client'

import { useEffect, useState } from "react";
import AirbnbList from "../components/airbnb/AirbnbList";

export default function AirbnbPage() {

    const [airbnbs, setAirbnbs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchAirbnbs = async () => {
            const pageSize = 100
            try {
                const response = await fetch(`https://backendairbnb-befph8eegzabfudb.eastus2-01.azurewebsites.net/api/listings?pageSize=${pageSize}&page=${page}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                const data = await response.json();
                setAirbnbs(data);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching airbnbs ', error)
                setLoading(false);
            }
        }

        fetchAirbnbs();
    }, [page])

    return (
        <div className="airbnb-container">
            {
                loading ? <p>Cargando Airbnbs... </p> :  
                <div>
                    <AirbnbList airbnbs={airbnbs}/>
                    <div className='airbnb-header'>
                        <button className='back-button' onClick={()=>setPage(value => value > 1 ? value - 1 : 1)} disabled={page === 1}>← Anterior</button>
                        <button className='back-button' onClick={()=>setPage(value => value + 1)}>Siguiente →</button>
                        <p>Página {page}</p>
                    </div>

                </div>
            }
        </div>
    )
}