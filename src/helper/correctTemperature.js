const toFahrenheit = (temp) => {
  return (temp * 9) / 5 + 32;
};

const toCelsius = (temp) => {
  return ((temp - 32) * 5) / 9;
};

export const tempMode = (mode, temp) => {
  let res = temp - 273.15;
  if (mode === "f") {
    res = toFahrenheit(res);
  }
  return parseInt(res);
};
