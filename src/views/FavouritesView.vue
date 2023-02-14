<template>
  <div class="favourites">
    <h2 class="favourites__title">Тут ваші будуть обрані картки з погодою</h2>
    <div class="favourites__inner">
      <FavouriteWeatherComponent
        v-for="data in weatherData"
        :weatherData="data"
        :key="data.name"
        @favouriteCardDelete="onFavouriteCardDeleted"
      />
    </div>
  </div>
</template>

<script>
import { getWeatherByCityFromInput } from "@/api/weatherAPI";
import FavouriteWeatherComponent from "@/components/FavouriteWeatherComponent.vue";

export default {
  data() {
    return {
      coordinatesList: [],
      weatherData: [],
    };
  },
  name: "AboutView",
  components: {
    FavouriteWeatherComponent,
  },

  methods: {
    onFavouriteCardDeleted(payload) {
      let coordinatesList = this.getCoorinatesList();
      let coordinatesToDelete = {
        latitude: payload.latitude,
        longitude: payload.longitude,
      };
      this.coordinatesList = coordinatesList.filter(
        (x) =>
          x.latitude != coordinatesToDelete.latitude &&
          x.longitude != coordinatesToDelete.latitude
      );
      localStorage.setItem("citiesCoord", JSON.stringify(this.coordinatesList));
      this.$store.commit("DELETE_SAVED_CARDS_COUNT");
      window.location.href = "favourites";
    },
    getCoorinatesList() {
      return JSON.parse(localStorage.getItem("citiesCoord"));
    },
  },

  async mounted() {
    this.coordinatesList = this.getCoorinatesList();

    this.coordinatesList?.forEach(async (coorinates) => {
      this.weatherData.push(
        (
          await getWeatherByCityFromInput(
            coorinates.latitude,
            coorinates.longitude
          )
        ).data
      );
    });
  },
};
</script>
<style>
.favourites__inner {
  display: flex;
  justify-content: center;
  gap: 0 20px;
  flex-wrap: wrap;
}
.favourites__title {
  text-align: center;
  margin: 20px 0;
}
</style>
