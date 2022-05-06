<template>
  <TransitionGroup name="fade" appear :key="country.name" tag="span">
    <router-link
      :to="{
        name: 'CountryDetails',
        params: { code: country.alpha3Code, country: country },
      }"
      :key="country.name"
    >
      <img :src="country.flags.svg" alt="flag" />
      <div class="card__text">
        <h2>
          {{ country.name }}
        </h2>
        <p><span>Population: </span>{{ formatNum(country.population) }}</p>
        <p><span>Region: </span>{{ country.region }}</p>
        <p><span>Capital: </span>{{ country.capital }}</p>
      </div>
    </router-link>
  </TransitionGroup>
</template>

<script>
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

    return { formatNum };
  },
};
</script>

<style scoped>
img {
  width: 265px;
  height: 160px;
  object-fit: cover;
  border-radius: 7px 7px 0 0;
}
</style>