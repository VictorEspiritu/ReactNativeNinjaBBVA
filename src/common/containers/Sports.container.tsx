import React, { ReactType } from "react";
import { useFetch } from "../hooks/use-fetch.hook";

export interface Sport {
  idSport: string;
  strSportThumb: string; // Url de la imagen
  strSport: string;
}

interface Props {
  SportsView: ReactType;
}

interface Response {
  sports: Sport[];
}

export function SportsContainer({ SportsView }: Props) {
  const { data: response, status } = useFetch<Response>(
    { sports: [] },
    "https://www.thesportsdb.com/api/v1/json/1/all_sports.php"
  );

  return <SportsView {...{ sports: response.sports, isLoading: status.isLoading }} />;
}
