import { Vol } from "../../types/typesVol";
import { CardBottom, Button, CardTop, CardWrapper, Delivery, Setup } from "../styled";
import {Link , useParams} from "react-router-dom"


interface VolProps{
    vol: Vol;
}

const AirportItem: React.FC<VolProps> = ({vol}) =>{
    let sza = `/details/${vol.legs[0].id}`;

    const handleFavoriteClick = () => {
        let stringifiedFavoriteIds = localStorage.getItem("favoriteIds");
        let favoriteIds = [];
    
        if (stringifiedFavoriteIds) {
          favoriteIds = JSON.parse(stringifiedFavoriteIds);
        }
    
        if (!favoriteIds.includes(vol.legs[0].id)) {
          favoriteIds.push(vol.legs[0].id);
          stringifiedFavoriteIds = JSON.stringify(favoriteIds);
          localStorage.setItem("favoriteIds", stringifiedFavoriteIds);
        }
      };

    return(
        <CardWrapper>
            <CardTop>
                {
                    <>
                    <Setup>{vol.legs[0].origin.name}</Setup>
                    <Delivery> {vol.legs[0].destination.name}</Delivery>
                    <Link to= {sza} >Voir + de details</Link>
                    
                    

                    </>
                }
        
            </CardTop>
            <CardBottom>
                <button onClick={handleFavoriteClick}>Ajouter au favoris</button>
            </CardBottom>
        </CardWrapper>

    )
}

export default AirportItem