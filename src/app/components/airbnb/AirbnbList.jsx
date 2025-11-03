import Airbnb from './Airbnb';
import "./airbnblist.css"

export default function AirbnbList({airbnbs}) {
    
    return (
        <div className="airbnb-list-container">
            <ul className="airbnb-list">
                {
                    airbnbs.map((airbnb) => (
                        <Airbnb key={airbnb._id || airbnb.id} airbnb={airbnb} />
                    ))
                }
            </ul>
        </div>
    )
}