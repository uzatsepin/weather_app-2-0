<template>
  <div class="weather__cards">
    <div class="weather__card-wrapper">
      <button
        class="weather__btn-delete weather__btn-delete-card"
        @click="openModal"
      >
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
    </div>
    <ModalComponent
      :isVisible="isModalVisible"
      :nameToDelete="weatherData.name"
      @close="closeModal"
      @cardDelete="deleteCartFromLocalStorage"
    />
    <WeatherDataComponent :weatherData="weatherData" />
  </div>
</template>

<script>
import WeatherDataComponent from "./WeatherDataComponent.vue";
import ModalComponent from "./ModalComponent.vue";
export default {
  data() {
    return {
      isModalVisible: false,
    };
  },
  props: {
    weatherData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteCartFromLocalStorage() {
      this.$emit("favouriteCardDelete", {
        latitude: this.weatherData.coord.lat,
        longitude: this.weatherData.coord.lon,
      });
    },
    openModal() {
      this.isModalVisible = true;
    },

    closeModal() {
      this.isModalVisible = false;
    },
  },
  components: { WeatherDataComponent, ModalComponent },
};
</script>

<style>
.weather__card-wrapper {
  position: relative;
}
.weather__btn-delete-card {
  position: absolute;
  right: 0;
}
</style>
