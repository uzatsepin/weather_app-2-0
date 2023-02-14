<template>
  <div class="input-weather">
    <input
      class="input-weather__input"
      type="text"
      @input="updateMessage"
      v-model="inputValue"
    />
    <ul
      v-if="isActive && inputValue.length > 0"
      class="input-weather-results"
      :class="{ hide: !isActive }"
    >
      <li v-if="isLoading" class="input-weather__empty">
        <img src="../assets/img/Spinner-1s-200px.svg" alt="Loading" />
      </li>
      <li
        v-if="
          !this.isLoading &&
          this.citiesList.length == 0 &&
          this.inputValue.length > 0
        "
        class="input-weather__empty"
      >
        Нічого не знайдено, повторіть спробу
      </li>
      <li
        class="input-weather-result"
        v-for="city in citiesList"
        :key="city.name"
        @click="selectCity(city)"
      >
        <span>{{ city.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import { getCitiesByInput } from "@/api/citiesAPI.js";
export default {
  data() {
    return {
      inputValue: "",
      isActive: false,
      citiesList: [],
      isLoading: false,
    };
  },
  methods: {
    ...mapActions(["GET_CITY_FROM_API", "GET_WEATHER_BY_CITY_FROM_INPUT"]),
    async updateMessage() {
      if (this.inputValue.length > 2) {
        this.isLoading = true;
        await this.getCitiesList();
        this.isLoading = false;
      }
    },
    async getCitiesList() {
      this.isActive = true;
      this.citiesList = await getCitiesByInput(this.inputValue);
    },
    selectCity(city) {
      this.$emit("citySelected", city);
      this.citiesList = [];
      this.isActive = false;
    },
  },
};
</script>

<style>
@import "../assets/styles/stylesComponent/inputWeatherStyle.css";
</style>
