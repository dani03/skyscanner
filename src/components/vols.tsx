import React, { useState } from "react";
import "../App.css";
import AirportItem from "./details/volCard";
import { Vol } from "../types/typesVol";
import { Button, Form, Header, Row, Search, Wrapper } from "./styled";
import axios from "axios";
import { Airport } from "../types/typesAirport";

const App: React.FC = () => {
  const [vols, setVol] = useState<Vol[]>([]);

  const [depart, setDepart] = useState<string>("");
  const [arrivee, setArrivee] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [departAirport, setdepartAirport] = useState<Airport>();
  const [arriveeAirport, setarriveeAirport] = useState<Airport>();

  const handleDepart = (e: React.ChangeEvent<HTMLInputElement>) => {
    //recupere le airport
    setDepart(e.target.value);
  };
  const handleArrivee = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArrivee(e.target.value);
  };
  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("date", e.target.value);
    setDate(e.target.value);
  };

  const getVol = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getAirportCode(e, depart, "depart");
    getAirportCode(e, arrivee, "arrivee");
    const options = {
      method: "GET",
      url: "https://skyscanner50.p.rapidapi.com/api/v1/searchFlights",
      params: {
        origin: depart,
        destination: arrivee,
        date: date,

        adults: "1",
        currency: "USD",
        countryCode: "US",
        market: "en-US",
      },
      headers: {
        "X-RapidAPI-Key": "c2a4b54320msh39c2bd408379f9bp100c21jsnd83fb8c8efcf",
        "X-RapidAPI-Host": "skyscanner50.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const data = response.data;
        console.log(response.data);
        setVol(data.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const getAirportCode = async (
    e: React.FormEvent<HTMLFormElement>,
    ville: string,
    sens: string
  ) => {
    e.preventDefault();
    const options = {
      method: "GET",
      url: "https://skyscanner50.p.rapidapi.com/api/v1/searchAirport",
      params: { query: ville },
      headers: {
        "X-RapidAPI-Key": "c2a4b54320msh39c2bd408379f9bp100c21jsnd83fb8c8efcf",
        "X-RapidAPI-Host": "skyscanner50.p.rapidapi.com",
      },
    };
    await axios.request(options).then((response) => {
      let allDatas = response.data;
      let dataFilter = allDatas.data.filter(
        (airport: Airport) =>
          airport.CityName.toLowerCase() === ville.toLowerCase()
      );
      console.log(dataFilter);
      sens.toLowerCase() === "depart"
        ? setdepartAirport(dataFilter[0])
        : setarriveeAirport(dataFilter[0]);
    });
  };

  return (
    <div>
      <Wrapper>
        <Row>
          <Header>Trouver un Aeroport </Header>
        </Row>
        <Form onSubmit={getVol}>
          <Search
            type="text"
            id="1"
            placeholder="ville Départ"
            value={depart}
            onChange={handleDepart}
          />

          <Search
            type="text"
            id="2"
            placeholder="ville arrivée"
            value={arrivee}
            onChange={handleArrivee}
          />

          <Search
            type="date"
            id="3"
            min="today"
            placeholder="Date (exemple : 2023-01-12)"
            value={date}
            onChange={handleDate}
          />

          <Button type="submit"> Rechercher </Button>
        </Form>
        <div>
          {vols.length > 0 &&
            vols.map((vol) => (
              <AirportItem key={vol.legs[0].origin.name} vol={vol} />
            ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default App;
