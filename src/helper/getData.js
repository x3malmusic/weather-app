import axios from "axios";

const getPosition = async () => {
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
};

export const getData = async () => {
  try {
    const pos = await getPosition(() => {});
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const data = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
    );
    return data;
  } catch (e) {
    return {
      error: e,
    };
  }
};
