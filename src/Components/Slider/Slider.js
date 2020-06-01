import React from "react";

import "./slider.scss";

export default class Slider extends React.Component {
  state = {
    slideIndex: 0,
  };

  itemWrapper = () => {
    const { slideIndex } = this.state;
    const { children, active } = this.props;

    if (active) {
      return React.Children.map(children, (child) => {
        return (
          <div
            className={
              parseInt(child.key) === slideIndex ? "showSlide" : "mySlides"
            }
          >
            {child}
          </div>
        );
      });
    } else {
      return React.Children.map(children, (child) => {
        return child;
      });
    }
  };

  plusSlides = (e, n) => {
    const { slideIndex } = this.state;
    const { children } = this.props;
    e.preventDefault();

    const slide = slideIndex + n;

    if (slide > children.length - 1) {
      this.setState({
        slideIndex: 0,
      });
      return;
    } else if (slide < 0) {
      this.setState({
        slideIndex: children.length - 1,
      });
      return;
    } else
      this.setState({
        slideIndex: slide,
      });
  };

  render() {
    const { active } = this.props;
    return (
      <div className="slider-container">
        {this.itemWrapper()}
        {active ? (
          <>
            <a
              href="!#"
              className="prev"
              onClick={(e) => this.plusSlides(e, -1)}
            >
              &#10094;
            </a>
            <a
              href="!#"
              className="next"
              onClick={(e) => this.plusSlides(e, 1)}
            >
              &#10095;
            </a>
          </>
        ) : null}
      </div>
    );
  }
}
