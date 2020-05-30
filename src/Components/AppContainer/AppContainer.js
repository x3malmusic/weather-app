import React from "react";
import { getData } from "../../helper/getData";
import { getForecasts } from "../../helper/forecasts";

import { City } from "../City/City";
import { Pagination } from "../Pagination/Pagination";
import Temperature from "../Temperature/Temperature";
import "./app-container.scss";

export default class AppContainer extends React.Component {
  state = {
    cityName: "",
    country: "",
    forecasts: [],
    pageNumber: 0,
  };

  async componentDidMount() {
    const { data } = await getData();
    const forecasts = getForecasts({ temperature: data.main.temp });
    console.log(data, forecasts);
    this.setState({
      cityName: data.name,
      country: data.sys.country,
      forecasts,
    });
  }

  setPage = (e, pageNumber) => {
    e.preventDefault();
    this.setState({
      pageNumber,
    });
  };

  render() {
    const { cityName, country, forecasts, pageNumber } = this.state;
    return (
      <div className="weather-container">
        <City name={cityName} country={country} />
        <Temperature
          temperature={
            forecasts[pageNumber] ? forecasts[pageNumber].temperature : 0
          }
        />
        <div className="pagination">
          {forecasts.length
            ? forecasts.map((forecast, i) => (
                <Pagination
                  setPage={this.setPage}
                  key={i}
                  pageNumber={i}
                  day={forecast.day}
                />
              ))
            : null}
        </div>
      </div>
    );
  }
}
