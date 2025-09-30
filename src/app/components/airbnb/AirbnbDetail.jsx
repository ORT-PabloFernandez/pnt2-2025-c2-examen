import Link from "next/link";
import './airbnblist.css';

const AirbnbDetail = ({airbnb}) => {

    return (
        <div className="airbnb-detail-container">
            <div className='airbnb-detail-header'>
                <p className='airbnb-detail-title'>{airbnb.name}</p>
            </div>
            <div className="airbnb-detail-info">
                <div className="airbnb-datail-url-container">
                    <a href={airbnb.listing_url} className='airbnb-detail-url'>{airbnb.listing_url}</a>
                </div>
                <p className='airbnb-detail-summary'>{airbnb.summary}</p>
            </div>
            <div className="airbnb-detail-image-container">
                <img src={airbnb.images.picture_url} alt={`Imagen de ${airbnb.name}`} />
            </div>
            <br />
            <Link href="/airbnb">
                <button className="back-button">Back</button>
            </Link>
        </div>
    )
}

export default AirbnbDetail;