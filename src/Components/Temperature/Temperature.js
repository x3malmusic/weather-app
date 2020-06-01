import React from "react";
import "./temperature.scss";

import { tempMode } from "../../helper/correctTemperature";

export const Temperature = ({ temperature, setMode, img, mode }) => {
  const showTemperature = (mode) => {
    return tempMode(mode, temperature);
  };

  const getImg = () => {
    if (img) {
      const url = require(`../../assets/img/${img.toLowerCase()}.png`);
      return url;
    }
  };

  return (
    <div className="temperature">
      <h2>{showTemperature(mode)}&deg;</h2>
      <div className="temperature-degree">
        <a href="!#" onClick={(e) => setMode(e, "c")}>
          C
        </a>
        |
        <a href="!#" onClick={(e) => setMode(e, "f")}>
          F
        </a>
      </div>
      <img src={getImg()} alt="img" />
    </div>
  );
};
