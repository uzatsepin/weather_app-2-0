<template>
  <div class="weather">
    <button class="weather-add-card-btn" @click="addAnEmptyCard">
      Додати місто
    </button>
    <div class="weather__wrapper">
      <div v-if="isWeatherByIpLoading">
        <img src="../assets/img/Spinner-1s-200px.svg" alt="#" />
      </div>
      <PersonalWeatherComponent v-else :weatherData="weatherDataByIp" />
      <div
        class="weather__cards"
        v-for="card in GET_WEATHER_CARDS"
        :key="card.id"
      >
        <DefaultWeatherComponent
          :weatherData="card.weatherData"
          :cardId="card.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PersonalWeatherComponent from "@/components/PersonalWeatherComponent.vue";
import { getWeatherCardByIp } from "../api/weatherAPI.js";
import { mapGetters } from "vuex";
import DefaultWeatherComponent from "@/components/DefaultWeatherComponent.vue";
export default {
  data() {
    return {
      weatherDataByIp: {},
      isWeatherByIpLoading: true,
    };
  },
  name: "HomeView",
  components: {
    PersonalWeatherComponent,
    DefaultWeatherComponent,
  },
  async created() {
    this.weatherDataByIp = (await getWeatherCardByIp()).data;
    this.isWeatherByIpLoading = false;
  },
  methods: {
    addAnEmptyCard() {
      if (this.GET_CARDS_COUNT == this.GET_MAX_CARDS_COUNT) {
        alert("Ви додали забагато міст. Видаліть щось. Максимум 5 міст.");
      }
      this.$store.commit("ADD_WEATHER_CARD", { weatherData: {} });
    },
  },
  computed: {
    ...mapGetters([
      "GET_WEATHER_CARDS",
      "GET_MAX_CARDS_COUNT",
      "GET_CARDS_COUNT",
    ]),
  },
};
</script>
<style>
@import "../assets/styles/styles.css";
.weather__inner {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 0 30px;
}
.weather__item {
  width: 45%;
}

.weather__item-title {
  text-align: center;
}
.weather-add-card-btn {
  padding: 15px 20px;
  background-color: var(--btn-color);
  color: #ffffff;
  border: none;
  border-radius: 1rem;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  cursor: pointer;
}

.weather-add-card-btn:active {
  transition: 0.3s;
  transform: translateY(-3px);
}

.weather-add-card-btn:hover {
  background-color: var(--btn-color-hover);
  transition: 0.3s;
}
.weather__item-descr {
  font-size: 14px;
  margin-top: 20px;
  font-weight: normal;
  text-align: center;
}

@media (max-width: 390px) {
  .weather-add-card-btn {
    width: 160px;
    margin: 0 auto;
    display: block;
  }
}
</style>
