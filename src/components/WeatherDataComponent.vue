<template>
  <div class="weather__ip-card">
    <h3 class="weather__title">
      <!-- for such kind of checks it's better to create sepparate methods or computed prop  -->
      {{ weatherData ? weatherData.name : null }},

      {{ weatherData && weatherData.sys ? weatherData.sys.country : null }}
    </h3>
    <div class="weather__it-card-wrapper">
      <img
        :src="`http://openweathermap.org/img/wn/${
          weatherData && weatherData.weather
            ? weatherData.weather[0].icon
            : null
        }@4x.png`"
        alt="img"
      />
      <div class="weather__temp">
        <p class="weather__temp-item">
          {{
            Math.round(
              weatherData && weatherData.main ? weatherData.main.temp : null
            )
          }}&deg;
        </p>
        <p class="weather__temp-descr">
          {{
            weatherData && weatherData.weather
              ? weatherData.weather[0].description
              : null
          }}
        </p>
      </div>
    </div>
    <div class="weather__info">
      <div class="weather__info-item">
        <img
          class="weather__info-img"
          src="../assets/img/temperature.svg"
          alt="wind img"
        />
        <p class="weather__info-descr">
          <span>Відчувається як:</span>
          {{
            Math.round(
              weatherData && weatherData.main
                ? weatherData.main.feels_like
                : null
            )
          }}
          &deg;
        </p>
      </div>
      <div class="weather__info-item">
        <img
          class="weather__info-img"
          src="../assets/img/wind.svg"
          alt="wind img"
        />
        <p class="weather__info-descr">
          <span>Швидість вітру km/h</span>

          {{ weatherData && weatherData.wind ? weatherData.wind.speed : null }}
        </p>
      </div>
      <div class="weather__info-item">
        <img
          class="weather__info-img"
          src="../assets/img/humidity.svg"
          alt="wind img"
        />
        <p class="weather__info-descr">
          <span>Вологість</span>
          {{
            weatherData && weatherData.main ? weatherData.main.humidity : null
          }}
          %
        </p>
      </div>
      <div class="weather__info-item">
        <img
          class="weather__info-img"
          src="../assets/img/weather-overcast.svg"
          alt="wind img"
        />
        <p class="weather__info-descr">
          <span>Видимість</span
          >{{ weatherData ? weatherData.visibility : null }}
          м.
        </p>
      </div>
    </div>
    <div class="weather__bar">
      <BarComponent
        :time="weatherData.weatherTime"
        :temp="weatherData.weatherTemp"
      />
    </div>
  </div>
</template>

<script>
import BarComponent from "./BarComponent.vue";
export default {
  name: "WeatherComponent",
  components: { BarComponent },
  data() {
    return {
      isModalVisible: false,
      isLoading: true,
      selectedCity: {},
      isCitySelected: false,
    };
  },
  props: {
    weatherData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
@import "../assets/styles/styles.css";
@import "../assets/styles/stylesComponent/weatherStyle.css";
</style>
