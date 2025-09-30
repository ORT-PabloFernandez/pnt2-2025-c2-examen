"use client";

import React, { useState, useEffect, use } from "react";
import AirbnbCard from "./AirbnbCard";

const AirbnbList = ({ airbnbs, sigPagina, prevPagina }) => {


  return (
  <>
  {airbnbs? 
  <p>token invalido</p>
  :
  <>
  <ul>
      {airbnbs.map((airbnb) => (
        <li key={airbnb._id}>
          <AirbnbCard airbnb={airbnb} />
        </li>
      ))}
    </ul>
    <button onClick={prevPagina}>
        anterior
    </button>

    <button onClick={sigPagina}>
        siguiente
    </button></>
  }
    
    </>
  );
};

export default AirbnbList;
