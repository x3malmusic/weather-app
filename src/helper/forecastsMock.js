const forecasts = [
  {
    temperature: 302,
    img: "sunny",
  },
  {
    temperature: 302,
    img: "sunny",
  },
  {
    temperature: 302,
    img: "sunny",
  },
  {
    temperature: 302,
    img: "sunny",
  },
  {
    temperature: 302,
    img: "sunny",
  },
  {
    temperature: 302,
    img: "sunny",
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
