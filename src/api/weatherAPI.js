import axios from "axios";

function getWeatherRequestString(latitude, longitude) {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.VUE_APP_WEATHER}&units=metric`;
}

function getWeatherForecastRequestString(cityId) {
  return `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${process.env.VUE_APP_WEATHER}&units=metric`;
}

//it will be great to move common logic to sepparate methods;

export const getWeatherCardByIp = async () => {
  try {
    const ipResponse = await axios.get("https://ipapi.co/json/");
    const lat = ipResponse.data.latitude;
    const long = ipResponse.data.longitude;
    const weatherResponse = await axios.get(getWeatherRequestString(lat, long));
    const weatherForecastResponse = await axios.get(
      getWeatherForecastRequestString(weatherResponse.data.id)
    );
    const timeTempObjectsArray = Array(weatherForecastResponse.data.list)[0];
    if (!timeTempObjectsArray.length) {
      throw new Error("No data for current day");
    }
    // it API returns values starting from the current time (for example if i decide to split by current date, it's possible to have one or two dot's in graph,
    // so i decided to show data for 5 days)
    const times = timeTempObjectsArray.map((x) => x.dt_txt);
    const timeResult = times.map((time) => {
      const date = time
        .split(" ")[0]
        .split("-")
        .reverse()
        .slice(0, 2)
        .join(".");
      const hours = time.split(" ")[1].split(":").slice(0, 2).join(":");
      return `${date} ${hours}`;
    });
    weatherResponse.data.weatherTime = timeResult;
    const tempResult = timeTempObjectsArray.map((x) => Math.round(x.main.temp));
    weatherResponse.data.weatherTemp = tempResult;
    return weatherResponse;
  } catch (error) {
    console.error(error);
  }
};

export const getWeatherByCityFromInput = async (latitude, longitude) => {
  try {
    const weatherResponse = await axios.get(
      getWeatherRequestString(latitude, longitude)
    );
    const weatherForecastResponse = await axios.get(
      getWeatherForecastRequestString(weatherResponse.data.id)
    );
    const timeTempObjectsArray = Array(weatherForecastResponse.data.list)[0];
    const times = timeTempObjectsArray.map((x) => x.dt_txt);
    const timeResult = times.map((time) => {
      const date = time
        .split(" ")[0]
        .split("-")
        .reverse()
        .slice(0, 2)
        .join(".");
      const hours = time.split(" ")[1].split(":").slice(0, 2).join(":");
      return `${date} ${hours}`;
    });
    weatherResponse.data.weatherTime = timeResult;
    const tempResult = timeTempObjectsArray.map((x) => Math.round(x.main.temp));
    weatherResponse.data.weatherTemp = tempResult;
    return weatherResponse;
  } catch (error) {
    console.error(error);
  }
};
