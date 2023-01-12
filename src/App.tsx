import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import Vols from "./components/vols";
import Navbar from "./components/navbar";
import Airport from "./components/airport";
import Details from "./components/details";
import FavoriAirport from "./components/favoriAirport";
import FavoriFlight from "./components/favoriFlight";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/airport" element={<Airport />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/:testvalue" element={<Details />} />
        <Route path="/vols" element={<Vols />} />
        <Route path="/favoriAirport" element={<FavoriAirport />} />
        <Route path="/favoriFlight" element={<FavoriFlight />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
