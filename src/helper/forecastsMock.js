const forecasts = [
  {
    temperature: 302,
    img: "partly_cloudy",
  },
  {
    temperature: 302,
    img: "partly_cloudy",
  },
  {
    temperature: 302,
    img: "partly_cloudy",
  },
  {
    temperature: 302,
    img: "partly_cloudy",
  },
  {
    temperature: 302,
    img: "partly_cloudy",
  },
  {
    temperature: 302,
    img: "partly_cloudy",
  },
];

export const niceForecastCreator = () => {
  return forecasts.map((forecast) => {
    return {
      ...forecast,
      temperature: randTemp(),
    };
  });
};

const randTemp = () => {
  return Math.random() * (306 - 298) + 298;
};
