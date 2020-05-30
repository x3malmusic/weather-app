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

export const getForecasts = (temperature) => {
  const forecasts = [
    {
      temperature: 302,
    },
    {
      temperature: 302,
    },
    {
      temperature: 302,
    },
    {
      temperature: 302,
    },
    {
      temperature: 302,
    },
    {
      temperature: 302,
    },
  ];

  return [temperature, ...forecasts].map((forecast, i) => {
    const day = new Date();
    return {
      ...forecast,
      day: getDay(day.getDay() + i),
    };
  }, 0);
};
