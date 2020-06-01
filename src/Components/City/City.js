import React from "react";
import "./city.scss";

export const City = ({ name, country }) => {
  return (
    <div className="city">
      <h2>{name || "city name ,"}</h2>&nbsp;,
      <h2>{country || "country name"}</h2>
    </div>
  );
};
