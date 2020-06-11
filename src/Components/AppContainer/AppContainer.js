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
    loading: true,
    width: null,
    error: "",
  };

  async componentDidMount() {
    const data = await getData();
    if (!data.error) {
      const forecasts = getForecasts({
        temperature: data.data.main.temp,
        img: data.data.weather[0].main,
      });
      this.setState({
        cityName: data.data.name,
        country: data.data.sys.country,
        forecasts,
        loading: false,
        width: window.innerWidth,
      });
      window.addEventListener("resize", this.updateWidth());
    } else {
      this.setState({
        error: data.error.message,
        loading: false,
      });
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
      loading,
      width,
      error,
    } = this.state;
    return (
      <div className="weather-container">
        {loading ? (
          <Loader />
        ) : error ? (
          <h3 className="error-message">{error}</h3>
        ) : (
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
                  setPage={this.setPage}
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
        )}
      </div>
    );
  }
}
