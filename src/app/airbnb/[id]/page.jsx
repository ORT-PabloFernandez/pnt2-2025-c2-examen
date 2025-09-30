'use client';

import { useEffect, useState } from 'react'
import AirbnbDetail from '../../components/airbnb/AirbnbDetail'
import { useParams } from 'next/navigation'

export default function AirbnbDetailPage() {

    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [airbnb, setAirbnb] = useState({})

    useEffect(() => {
        const fetchAirbnb = async () => {
            try {
                const response = await fetch(`https://backendairbnb-befph8eegzabfudb.eastus2-01.azurewebsites.net/api/listings/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                const data = await response.json();
                setAirbnb(data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
        fetchAirbnb();
    }, [])

    return (
        <div>
            {loading ? <p>Loading Airbnb...</p> :  <AirbnbDetail airbnb={airbnb}/>}
        </div>
    
    )
}