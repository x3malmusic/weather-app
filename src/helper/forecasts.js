import { niceForecastCreator } from "./forecastsMock";

const getDay = (num) => {
  if (num > 6) {
    num = num - 6;
  }

  switch (num) {
    case 0:
      return "Su";
    case 1:
      return "Mo";
    case 2:
      return "Tu";
    case 3:
      return "We";
    case 4:
      return "Th";
    case 5:
      return "Fr";
    case 6:
      return "Sa";
    default:
      return "Mo";
  }
};

export const getForecasts = (currentDay) => {
  const forecasts = niceForecastCreator();
  return [currentDay, ...forecasts].map((forecast, i) => {
    return {
      ...forecast,
      day: getDay(new Date().getDay() + i),
      img: forecast.img,
    };
  });
};
