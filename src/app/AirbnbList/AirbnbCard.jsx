import React from "react";
import { useState } from "react";
import '../components/airbnb/airbnblist.css';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Link from "next/link";


export default function airbnbCard({ airbnb }) {

    const [imageError, setImageError] = useState(false);
    const [favorite, setFavorite] = useState(false);


    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div className="airbnb-container">
        <Link href={`/AirbnbList/${airbnb._id}`}>
            <div className="airbnb-card">
                {airbnb.images.picture_url && !imageError ? (
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
        </Link>
        <Link className="airbnb-url" href={airbnb.listing_url}>Ver en Airbnb</Link>
        </div>
    );
}