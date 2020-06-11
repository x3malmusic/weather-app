const forecasts = [
  {
    temperature: 302,
    img: "clear",
  },
  {
    temperature: 302,
    img: "clear",
  },
  {
    temperature: 302,
    img: "clear",
  },
  {
    temperature: 302,
    img: "clear",
  },
  {
    temperature: 302,
    img: "clear",
  },
  {
    temperature: 302,
    img: "clear",
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
