'use client';
import React from "react";
import Link from "next/link";
import './airbnblist.css';
import { useState } from "react";


export default function Airbnb({ Airbnb }) {
    const [ImageError, setImageError] = useState(false);

    return (
        <div className="airbnb-card">

            <div className="airbnb-image-container">
                <img
                    src={Airbnb.images.picture_url}
                    alt={Airbnb.name}
                    className="airbnb-image"
                ></img>
            </div>

            <div className="airbnb-info">
                <h3 className="airbnb-name">
                    <Link href={`/airbnb/${Airbnb._id}`}>{Airbnb.name}</Link></h3>
                <div>
                    <p className="airbnb-summary">{Airbnb.summary}</p>
                    <p className="airbnb-url">URL: <a href={Airbnb.listing_url} target="_blank" rel="noopener noreferrer">{Airbnb.listing_url}</a></p>

                </div>
            </div>

        </div>
    )
}
