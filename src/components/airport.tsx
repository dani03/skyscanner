import React, { useState } from "react";
import "../App.css";
import AirportItem from "./details/airportCard";
import { Airport } from "../types/typesAirport";
import { Button, Form, Header, Row, Search, Wrapper } from "./styled";
import axios from "axios";

const App: React.FC = () => {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleVille = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      setSearch(e.target.value);
    } else {
      setSearch("paris");
    }
  };

  const getAirport = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const options = {
      method: "GET",
      url: "https://skyscanner50.p.rapidapi.com/api/v1/searchAirport",
      params: { query: search },
      headers: {
        "X-RapidAPI-Key": "c2a4b54320msh39c2bd408379f9bp100c21jsnd83fb8c8efcf",
        "X-RapidAPI-Host": "skyscanner50.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const data = response.data;

        if (data.error) {
          setError(true);
          setMessage(data.message);
          setAirports([]);
        } else {
          setError(false);
          //on filtre les aeroports dont la ville est le nom donner
          let allDatas = data.data;

          let dataFilter = allDatas.filter(
            (airport: Airport) => airport.CityName.toLowerCase() === search
          );
          setAirports(dataFilter);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
    setSearch("");
    console.log(airports);
  };

  return (
    <div>
      <Wrapper>
        <Row>
          <Header>Trouver un Aeroport </Header>
        </Row>
        <Form onSubmit={getAirport}>
          <Search
            type="text"
            placeholder="entrer une ville"
            value={search}
            onChange={handleVille}
          />

          <Button type="submit"> Rechercher </Button>
        </Form>
        <div className="">
          {airports.length <= 0 ? (
            <div className="card">
              <h6 className="card-header p-2">aucun resultat </h6>
            </div>
          ) : (
            ""
          )}
          {airports.length > 0 &&
            airports.map((airport) => (
              <AirportItem key={airport.cityId} airport={airport} />
            ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default App;
