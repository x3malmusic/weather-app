import React from "react";

import "./pagination.scss";
import { tempMode } from "../../helper/correctTemperature";

export const Pagination = ({
  img,
  setPage,
  pageNumber,
  day,
  temperature,
  mode,
  selected,
}) => {
  const getImg = () => {
    if (img) {
      const url = require(`../../assets/img/${img.toLowerCase()}.png`);
      return url;
    }
  };

  const showTemperature = (mode) => {
    return tempMode(mode, temperature);
  };

  return (
    <div
      className={
        selected
          ? "pagination-wrapper pagination-wrapper-selected"
          : "pagination-wrapper"
      }
      onClick={(e) => setPage(e, pageNumber)}
    >
      <p>{day}</p>
      <img src={getImg()} alt="img" />
      <p>{showTemperature(mode, temperature)}&deg;</p>
    </div>
  );
};
