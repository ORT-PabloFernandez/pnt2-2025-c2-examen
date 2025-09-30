import './airbnblist.css';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'
import Link from "next/link";

const AirbnbCard = ({airbnb}) => {

    const [liked, setLiked] = useState(false);

    const isLiked = () => {
        let alreadyLiked = JSON.parse(localStorage.getItem('liked'))
        return alreadyLiked != undefined && alreadyLiked.find(a => a == airbnb._id)
    }

    useEffect(() => {
        setLiked(isLiked())
    }, [])

    const toggleLike = () => {
        setLiked(!liked);
        let alreadyLiked = JSON.parse(localStorage.getItem('liked'))
        if (!liked) {
            if (alreadyLiked != undefined && alreadyLiked.length > 0) {
                localStorage.setItem('liked', JSON.stringify([...alreadyLiked, airbnb._id]))
            } else {
                localStorage.setItem('liked', JSON.stringify([airbnb._id]))
            }
        } else {
            if (alreadyLiked != undefined && alreadyLiked.length > 0) {
                let alreadyLiked2 = alreadyLiked.filter(a => a != airbnb._id)
                localStorage.setItem('liked', JSON.stringify(alreadyLiked2))
            }
        }
    }

    return (
        <div className="airbnb-card">
            <div>
                <button onClick={toggleLike} className={`favorite-button ${liked ? 'favorited': 'not-favorited'}`}>
                    <FontAwesomeIcon icon={liked ? solidHeart : regularHeart}/>
                </button>
            </div>

            <Link href={`/airbnb/${airbnb._id}`}>
                <div className='airbnb-content'>
                    <p className='airbnb-name'>{airbnb.name}</p>
                    <p className='airbnb-url'>{airbnb.listing_url}</p>
                    <p className='airbnb-summary'>{airbnb.summary}</p>
                </div>
                <div className="airbnb-image-container">
                    <img src={airbnb.images.picture_url} alt={`Imagen de ${airbnb.name}`} />
                </div>
            </Link>
        </div>
    )
}

export default AirbnbCard;