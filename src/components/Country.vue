<template>
  <router-link
    :to="{
      name: 'CountryDetails',
      params: { code: country.alpha3Code, country:country },
    }"
  >
    <img :src="country.flags.svg" alt="flag" />
    <div class="card__text">
      <h3>
        {{ country.name }}
      </h3>
      <p><span>Population: </span>{{ formatNum(country.population) }}</p>
      <p><span>Region: </span>{{ country.region }}</p>
      <p><span>Capital: </span>{{ country.capital }}</p>
    </div>
  </router-link>
</template>

<script>
import gsap from "gsap";
import { onMounted, onUpdated } from "@vue/runtime-core";
export default {
  props: {
    country: Object,
  },
  setup() {
    const formatNum = (num) => {
      if (num) {
        return num.toLocaleString("en-US");
      }
    };

    // onMounted(() => {
    //   console.log("KUR");
    //   gsap.from(".bla", {
    //     duration: 0.1,
    //     opacity: 0,
    //     scale: 0,
    //     y: 100,
    //     stagger: 0.1,
    //   });
    // });
    return { formatNum };
  },
};
</script>

<style scoped>
img {
  width: 248px;
  height: 160px;
  object-fit: cover;
  border-radius: 7px 7px 0 0;
}
</style>