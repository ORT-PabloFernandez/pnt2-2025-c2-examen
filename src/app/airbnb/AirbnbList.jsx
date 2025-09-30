import React from "react";

import "./airbnblist.css";
import Airbnb from "./Airbnb";

export default function AirbnbList({ Airbnbs }) {
    return (
        <div className="airbnb-container">
            <h2 className="airbnb-title">Airbnb Listings</h2>
            <div className="airbnb-grid">
                {Airbnbs.map((airbnb) => (
                    <Airbnb key={airbnb.id} Airbnb={airbnb} />
                ))}
            </div>
        </div>


    )
}