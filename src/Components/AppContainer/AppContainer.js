import React from "react";
import { debounce } from "lodash";

import { getData } from "../../helper/getData";
import { getForecasts } from "../../helper/forecasts";
import { City } from "../City/City";
import { Pagination } from "../Pagination/Pagination";
import { Temperature } from "../Temperature/Temperature";
import { Loader } from "../Loader/Loader";
import Slider from "../Slider/Slider";
import "./app-container.scss";

export default class AppContainer extends React.Component {
  state = {
    mode: "c",
    cityName: "",
    country: "",
    forecasts: [],
    pageNumber: 0,
    loaded: false,
    width: null,
  };

  async componentDidMount() {
    const { data } = await getData();
    if (data) {
      const forecasts = getForecasts({
        temperature: data.main.temp,
        img: data.weather[0].main,
      });
      this.setState({
        cityName: data.name,
        country: data.sys.country,
        forecasts,
        loaded: true,
        width: window.innerWidth,
      });
      window.addEventListener("resize", this.updateWidth());
    }
  }

  updateWidth = () => {
    return debounce(() => {
      this.setState({
        width: window.innerWidth,
      });
    }, 50);
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
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
      width,
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
              {width < 550 ? (
                <Slider
                  active={true}
                  children={
                    forecasts.length
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
                      : null
                  }
                />
              ) : forecasts.length ? (
                forecasts.map((forecast, i) => (
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
              ) : null}
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}
