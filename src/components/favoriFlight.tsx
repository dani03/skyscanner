import React, { useState} from "react"
import '../App.css';
import AirportItem from './details/volCard';
import { Vol } from "../types/typesVol"
import { Button, Form, Header, Row, Search, Wrapper } from './styled';
import axios from "axios";


const App: React.FC = () => {
  const [vols, setVol] = useState<Vol[]>([])





  const getVol = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    const options = {
    method: 'GET',
    url: 'https://skyscanner50.p.rapidapi.com/api/v1/searchFlights',
    params: {
        origin: 'LOND',
        destination: 'NYCA',
        date: '2023-01-12',

        adults: '1',
        currency: 'USD',
        countryCode: 'US',
        market: 'en-US'
    },
    headers: {
        'X-RapidAPI-Key': 'c2a4b54320msh39c2bd408379f9bp100c21jsnd83fb8c8efcf',
        'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com'
    }
    };

    axios.request(options).then(function (response) {
        const data = response.data;
        console.log(response.data);
        setVol(data.data);
    }).catch(function (error) {
        console.error(error);
    });
  }
  return (
    <div>
      <Wrapper>
        <Row>
          <Header >Mes vols favoris </Header>
        </Row>
        
        <div>
          { vols.length > 0 &&
            vols.map(vol => <AirportItem key={vol.legs[0].origin.name} vol={vol}/>)
          }
        </div>
      </Wrapper>
    </div>
  );
}

export default App;