import { useState } from "react";
import { Airport } from '../../types/typesAirport';
import { CardBottom, CardTop, CardWrapper, Delivery, Setup } from "../styled";
import { Link, useParams } from "react-router-dom";

interface AirportProps {
  airport: Airport;
}
 let favoritesAirports: Airport[] = [];

const AirportItem: React.FC<AirportProps> = ({ airport }) => {
  const [isFav, setIsFav] = useState<boolean>(false);

  const handleFavoriteClick = (e:any) => {
    console.log(airport);
    let stringifiedFavoriteIds = localStorage.getItem("airports");
   

    if (stringifiedFavoriteIds) {
      favoritesAirports = JSON.parse(stringifiedFavoriteIds);
    }

    if (!favoritesAirports.includes(airport)) {
        airport.favorite = true;
      favoritesAirports.unshift(airport);
      stringifiedFavoriteIds = JSON.stringify(favoritesAirports);
    
    localStorage.setItem("airports", stringifiedFavoriteIds);
    
    }
  };

  return (
    // <CardWrapper>
    //     <CardTop>
    //         {
    //             <>
    //             <Setup>{airport.PlaceName}</Setup>
    //             <Delivery> {airport.CityName}</Delivery>
    //             <button onClick={handleFavoriteClick}>Ajouter au favoris</button>
    //             </>
    //         }

    //     </CardTop>
    //     <CardBottom>
    //         <p>{airport.GeoId}</p>
    //     </CardBottom>
    // </CardWrapper>
    <div className="card m-2 " >
      <h5 className="card-header">{airport.CityName}</h5>
      <div className="card-body">
        <h5 className="card-title">{airport.CityName}</h5>
        <p className="card-text">{airport.ResultingPhrase}</p>
        <div>
          <button
            onClick={handleFavoriteClick}
            className="btn btn-primary btn-sm"
          >
            Ajouter favoris
          </button>
          <button className="float-end btn btn-info btn-sm">
           details
          </button>
        </div>
      </div>
    </div>
  );
};

export default AirportItem;
