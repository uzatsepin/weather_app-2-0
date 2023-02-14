<template>
  <div class="container">
    <div class="logo">
      <p class="logo__text">WeatherApp v2.0 ☀️</p>
    </div>
    <nav class="nav">
      <router-link class="nav__link" to="/">Головна</router-link>
      <router-link class="nav__link" to="/favourites"
        >Обране <span></span
      ></router-link>
    </nav>
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["GET_WEATHER_CART_BY_ID"]),
  },
};
</script>

<style>
@import "./assets/styles/styles.css";
</style>
