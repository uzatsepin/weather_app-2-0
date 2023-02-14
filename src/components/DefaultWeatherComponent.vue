<template>
  <div class="weather__btns">
    <button class="weather__btn-delete" @click="openModal">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </button>
    <button
      class="weather__favourite-btn"
      @click="onFavouriteClick"
      v-if="!isFavourite"
    >
      Зберегти
    </button>
  </div>
  <div>
    <InputCityComponent @citySelected="onCitySelected" />
  </div>
  <div v-if="isWeatherDataVisible()">
    <ModalComponent
      :isVisible="isModalVisible"
      :nameToDelete="weatherData.name"
      @close="closeModal"
      @cardDelete="onCardDelete"
    />
    <div>
      <div v-if="isLoading">
        <img src="../assets/img/Spinner-1s-200px.svg" alt="Loading" />
      </div>
      <WeatherDataComponent v-else :weatherData="weatherData" />
    </div>
  </div>
</template>

<script>
import InputCityComponent from "./InputCityComponent.vue";
import ModalComponent from "./ModalComponent.vue";
import WeatherDataComponent from "./WeatherDataComponent.vue";
import { getWeatherByCityFromInput } from "@/api/weatherAPI";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isModalVisible: false,
      isLoading: false,
      selectedCity: {},
      isFavourite: false,
    };
  },
  props: {
    weatherData: {
      type: Object,
      required: true,
    },
    cardId: {
      type: Number,
    },
  },
  components: { InputCityComponent, WeatherDataComponent, ModalComponent },
  computed: {
    ...mapGetters(["GET_MAX_CARDS_COUNT", "GET_SAVED_CARDS_COUNT"]),
  },
  methods: {
    onCardDelete() {
      this.$store.commit("REMOVE_CARD", { cardId: this.cardId });
    },

    async onCitySelected(selectedCity) {
      this.isLoading = true;
      this.selectedCity = selectedCity;
      this.isFavourite = false;
      let weatherData = (
        await getWeatherByCityFromInput(
          selectedCity.latitude,
          selectedCity.longitude
        )
      ).data;
      this.isLoading = false;
      this.$store.commit("SET_WEATHER_BY_CARD_ID", {
        cardId: this.cardId,
        updatedWeatherData: weatherData,
      });
    },

    onFavouriteClick() {
      if (this.GET_SAVED_CARDS_COUNT == this.GET_MAX_CARDS_COUNT) {
        alert("Ви зберегли забагато міст. Видаліть щось. Максимум 5 міст.");
      }
      const coordinates = {
        latitude: this.selectedCity.latitude,
        longitude: this.selectedCity.longitude,
      };
      this.isFavourite = true;
      if (localStorage.getItem("citiesCoord") === null) {
        const tempArr = [];
        tempArr.push(coordinates);
        localStorage.setItem("citiesCoord", JSON.stringify(tempArr));
      } else {
        let localStorageCoord = localStorage.getItem("citiesCoord");
        let localStorageCoordArray = JSON.parse(localStorageCoord);
        localStorageCoordArray.push(coordinates);
        localStorage.setItem(
          "citiesCoord",
          JSON.stringify(localStorageCoordArray)
        );
      }
      this.$store.commit("SET_SAVED_CARDS_COUNT");
    },

    isWeatherDataVisible() {
      return !(JSON.stringify(this.weatherData) == "{}");
    },

    openModal() {
      this.isModalVisible = true;
    },

    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style></style>
