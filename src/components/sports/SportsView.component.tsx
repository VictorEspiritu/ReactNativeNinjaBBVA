import React from "react";
import {
  Sport,
  SportsContainer
} from "../../common/containers/Sports.container";
import "./sports.css";

interface Props {
  isLoading: boolean;
  sports: Sport[];
}

export function Sports(): JSX.Element {
  return <SportsContainer SportsView={SportsView} />;
}

export function SportsView({ isLoading, sports }: Props): JSX.Element {
  console.log("Deportes cargando del mod: ", sports);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="sports-container">
      {sports.map((sport) => (
        <div key={sport.idSport} className="sport">
          <img alt="Un deporte" src={sport.strSportThumb}></img>
          <div>
            {sport.strSport} <p>{sport.idSport}</p>{" "}
          </div>
        </div>
      ))}
    </div>
  );
}
