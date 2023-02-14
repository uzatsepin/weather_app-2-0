<template>
  <div class="weather__cards">
    <WeatherDataComponent :weatherData="weatherData" />
    <h3 class="weather__item-descr">
      *Інформація про погоду взята на основі вашої IP-адерси
    </h3>
  </div>
</template>

<script>
import WeatherDataComponent from "./WeatherDataComponent.vue";

export default {
  components: {
    WeatherDataComponent,
  },
  props: {
    weatherData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
