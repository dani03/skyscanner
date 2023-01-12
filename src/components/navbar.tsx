import React from "react";
import '../App.css';
import {Link} from "react-router-dom"

export default function Vols() {
    return(
        
        <nav>
            <Link id="navbutton" to="/">Acceuil</Link>
            &ensp; &ensp;
            <Link id="navbutton" to="/airport">Les aeroports</Link>
            &ensp; &ensp;
            <Link id="navbutton" to="/vols">Les vols</Link>
            &ensp; &ensp;
            <Link id="navbutton" to="/favoriAirport">Mes favoris Airport</Link>
            &ensp; &ensp;
            <Link id="navbutton" to="/favoriFlight">Mes favoris Flight</Link>
        </nav>

    )
}

