import React from "react";
import { getData } from "../../helper/getData";
import { getForecasts } from "../../helper/forecasts";

import { City } from "../City/City";
import { Pagination } from "../Pagination/Pagination";
import { Temperature } from "../Temperature/Temperature";
import { Loader } from "../Loader/Loader";
import "./app-container.scss";

export default class AppContainer extends React.Component {
  state = {
    mode: "c",
    cityName: "",
    country: "",
    forecasts: [],
    pageNumber: 0,
    loaded: false,
  };

  async componentDidMount() {
    const { data } = await getData();
    const forecasts = getForecasts({
      temperature: data.main.temp,
      img: data.weather[0].main,
    });
    this.setState({
      cityName: data.name,
      country: data.sys.country,
      forecasts,
      loaded: true,
    });
  }

  setMode = (e, mode) => {
    e.preventDefault();
    this.setState({ mode });
  };

  setPage = (e, pageNumber) => {
    e.preventDefault();
    this.setState({
      pageNumber,
    });
  };

  render() {
    const {
      cityName,
      country,
      forecasts,
      pageNumber,
      mode,
      loaded,
    } = this.state;
    return (
      <div className="weather-container">
        {loaded ? (
          <>
            <City name={cityName} country={country} />
            <Temperature
              temperature={forecasts[pageNumber]?.temperature || 0}
              img={forecasts[pageNumber]?.img}
              setMode={this.setMode}
              mode={mode}
            />
            <div className="pagination">
              {forecasts.length
                ? forecasts.map((forecast, i) => (
                    <Pagination
                      setPage={this.setPage}
                      key={i}
                      pageNumber={i}
                      img={forecast.img}
                      day={forecast.day}
                      temperature={forecast.temperature}
                      mode={mode}
                      selected={pageNumber === i}
                    />
                  ))
                : null}
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}
