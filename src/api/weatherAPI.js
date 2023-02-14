import axios from "axios";

function getWeatherRequestString(latitude, longitude) {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.VUE_APP_WEATHER}&units=metric`;
}

function getWeatherForecastRequestString(cityId) {
  return `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${process.env.VUE_APP_WEATHER}&units=metric`;
}

export const getWeatherCardByIp = async () => {
  try {
    const ipResponse = await axios.get("https://ipapi.co/json/");
    const lat = ipResponse.data.latitude;
    const long = ipResponse.data.longitude;
    const weatherResponse = await axios.get(getWeatherRequestString(lat, long));
    const weatherForecastResponse = await axios.get(
      getWeatherForecastRequestString(weatherResponse.data.id)
    );
    const date = new Date();
    const currentDate = date.getUTCDate();
    const timeTempObjectsArray = Array(
      weatherForecastResponse.data.list
    )[0].filter((x) => new Date(x.dt_txt).getUTCDate() === currentDate);
    if (!timeTempObjectsArray.length) {
      throw new Error("No data for current day");
    }
    const times = timeTempObjectsArray.map((x) => x.dt_txt).slice(0, 9);
    const timeResult = times.map((time) => {
      return time.split(" ")[1].split(":").slice(0, 2).join(":");
    });
    weatherResponse.data.weatherTime = timeResult;
    const tempResult = timeTempObjectsArray
      .map((x) => Math.round(x.main.temp))
      .slice(0, 9);
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
    const times = timeTempObjectsArray.map((x) => x.dt_txt).slice(0, 9);
    const timeResult = times.map((date) => {
      return date.split(" ")[1].split(":").slice(0, 2).join(":");
    });
    weatherResponse.data.weatherTime = timeResult;
    const tempResult = timeTempObjectsArray
      .map((x) => Math.round(x.main.temp))
      .slice(0, 9);
    weatherResponse.data.weatherTemp = tempResult;
    return weatherResponse;
  } catch (error) {
    console.error(error);
  }
};
