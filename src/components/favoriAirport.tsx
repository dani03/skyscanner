import React, { useState, useEffect } from "react";
import "../App.css";

import { Airport } from "../types/typesAirport";
import { Button, Form, Header, Row, Search, Wrapper } from "./styled";
import axios from "axios";
import AirportItem from "./details/airportCard";

const App: React.FC = () => {
  const [favAirports, setFavAirports] = useState<Airport[]>([]);

  const deleteFav = (airportGeoId: string) => {
    const airportInLocalStorage = localStorage.getItem("airports");

    let arr: Airport[] = airportInLocalStorage
      ? JSON.parse(airportInLocalStorage)
      : [];
   
    //parcourt du tableau
    arr.map((airport) => {
      if (airport.GeoId === airportGeoId) {
        let indexOfElement = arr.indexOf(airport);
         arr.splice(indexOfElement, 1);
        localStorage.setItem("airports", JSON.stringify(arr));
         setFavAirports(arr);
      }
    });
  };
  useEffect(() => {
    const stringifiedFavoriteIds = localStorage.getItem("airports");
    if (stringifiedFavoriteIds != null) {
      let favoris = JSON.parse(stringifiedFavoriteIds);
      setFavAirports(favoris);
    }
  }, []);

  const options = {
    method: "GET",
    url: "https://skyscanner50.p.rapidapi.com/api/v1/searchAirport",
    params: { query: "london" },
    headers: {
      "X-RapidAPI-Key": "c2a4b54320msh39c2bd408379f9bp100c21jsnd83fb8c8efcf",
      "X-RapidAPI-Host": "skyscanner50.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      // console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });

  return (
    <div>
      <Wrapper>
        <Row>
          <Header>Mes aeroports favoris </Header>
        </Row>

        <div
          style={{
            display: "flex",
            justifyContent: "start",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          {favAirports.length > 0 &&
            favAirports.map((airport) => (
              // <AirportItem key={airport.cityId} airport={airport} />
              <div className="card m-4 col-md-3">
                <div className="card-header">
                  <h5>{airport.CityName}</h5>
                  <button
                    onClick={() => deleteFav(airport.GeoId)}
                    className=" float-end btn btn-sm btn-danger"
                  >
                    supprimer
                  </button>
                </div>

                <div className="card-body">
                  <h5 className="card-title">{airport.CityName}</h5>
                  <p className="card-text">{airport.ResultingPhrase}</p>
                </div>
              </div>
            ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default App;
