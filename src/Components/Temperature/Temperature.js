import React from "react";
import "./temperature.scss";

import { tempMode } from "../../helper/correctTemperature";

export default class Temperature extends React.Component {
  state = {
    mode: "c",
  };

  setMode = (e, mode) => {
    e.preventDefault();
    this.setState({ mode });
  };

  showTemperature = (mode) => {
    const { temperature } = this.props;
    return tempMode(mode, temperature);
  };

  render() {
    const { mode } = this.state;
    return (
      <div className="temperature">
        <h2>{this.showTemperature(mode)}&deg;</h2>
        <a href="!#" onClick={(e) => this.setMode(e, "c")}>
          C
        </a>
        |
        <a href="!#" onClick={(e) => this.setMode(e, "f")}>
          F
        </a>
      </div>
    );
  }
}
