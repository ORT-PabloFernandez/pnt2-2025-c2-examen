"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import AirbnbDetalle from "@/app/components/airbnb/AirbnbDetalle";

function DetalleAirbnb() {
  const { id } = useParams();
  
  return (
    <>
      <AirbnbDetalle id={id} />
    </>
  );
}

export default DetalleAirbnb;
