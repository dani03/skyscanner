
import axios from "axios";
import { CardBottom, Button, CardTop, CardWrapper, Delivery, Setup } from "./styled";
import {Link , useParams} from "react-router-dom"
import React, { useState} from "react"
import '../App.css';
import { Details } from "../types/typesDetails"
import {  Form, Header, Row, Search, Wrapper } from './styled';





const App: React.FC = () => {
  const [details, setDetail] = useState<Details[]>([])


  const test = useParams();
  // console.log( test.id );

  const options = {
    method: 'GET',
    url: 'https://skyscanner50.p.rapidapi.com/api/v1/getFlightDetails',
    params: {
      itineraryId: test.id,
      legs: '[{"origin":"LOND","destination":"NYCA","date":"2023-01-12"}]',
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
    setDetail(data)
    console.log(details);
    // console.log(details);
  }).catch(function (error) {
    console.error(error);
  });





  
  return (
    <div>
      <Wrapper>
        <Row>
          <Header > Detail du vol </Header>
        </Row>
      </Wrapper>
      <CardWrapper>
            <CardTop>
                {
                    <>
                    <Setup></Setup>
                    <Delivery> {}</Delivery>
                    </>
                }
        
            </CardTop>
            <CardBottom>
                <p>{}</p>
            </CardBottom>
        </CardWrapper>
    </div>
  );
}

export default App;