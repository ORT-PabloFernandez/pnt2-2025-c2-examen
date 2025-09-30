'use client';

import AirbnbCard from "./AirbnbCard";
import './airbnblist.css';

const AirbnbList = ({airbnbs}) => {
    return <div className="airbnb-grid">
        {
            airbnbs.map((a) => (
                <AirbnbCard key={a._id} airbnb={a}/>
            ))
        }
    </div>
}

export default AirbnbList;