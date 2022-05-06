<template>
  <main
    class="container"
    :class="toggle ? 'container__light' : 'container__dark'"
  >
    <div v-if="error" class="error-message">
      <h2>{{ error }}</h2>
    </div>
    <div v-if="data" class="wrapper-home">
      <form @submit.prevent="" class="search-form">
        <fa
          class="search-form__icon"
          :class="{ 'light-magnifying-glass': toggle }"
          icon="magnifying-glass"
        />
        <input
          type="text"
          placeholder="Search for a country..."
          v-model="search"
          :class="toggle ? 'light' : 'dark'"
        />
        <select
          aria-label="Filter by Region"
          v-model="region"
          :class="toggle ? 'light' : 'dark'"
        >
          <option disabled value="">Filter by Region</option>
          <option>All</option>
          <option>Africa</option>
          <option>Americas</option>
          <option>Asia</option>
          <option>Europe</option>
          <option>Oceania</option>
        </select>
      </form>
      <div v-if="match && search.length > 0" class="grid">
        <AsyncCountry
          v-for="country in match"
          :key="country.index"
          class="card"
          :class="toggle ? 'light' : 'dark'"
          :country="country"
        />
      </div>
      <div v-else-if="match && region && region != 'All'" class="grid">
        <AsyncCountry
          v-for="country in match"
          :key="country.index"
          class="card"
          :class="toggle ? 'light' : 'dark'"
          :country="country"
        />
      </div>
      <div v-else class="grid card">
        <AsyncCountry
          v-for="country in data.slice(0, loadMore)"
          :key="country.index"
          class="card"
          :class="toggle ? 'light' : 'dark'"
          :country="country"
        />
      </div>
      <div v-if="search.length < 1" class="load-more">
        <div
          class="btn"
          :class="toggle ? 'light' : 'dark'"
          @click="loadMore += 8"
        >
          Load More
        </div>
      </div>
    </div>
    <Loader v-if="isPending" :toggle="toggle"></Loader>
  </main>
</template>

<script>
import { ref, watch, inject, defineAsyncComponent } from "vue";
import Country from "@/components/Country.vue";
import Loader from "@/components/Loader.vue";
import getCountries from "@/composables/getCountries";
import useSearch from "@/composables/useSearch";
const AsyncCountry = defineAsyncComponent(() =>
  import("../components/Country.vue")
);
export default {
  name: "Home",
  components: { Country, Loader, AsyncCountry },
  setup() {
    const search = ref("");
    const region = ref("");
    const api = "https://restcountries.com/v2/all";
    const data = ref(null);
    const match = ref(null);
    const toggle = inject("toggle");
    const loadMore = ref(8);

    const { notFound, query } = useSearch();

    const { error, isPending, countries } = getCountries();

    const handleCountries = async () => {
      if (!data.value) {
        data.value = await countries(api);
      }
      // console.log(data.value);
    };

    handleCountries();

    watch(search, async () => {
      if (region && region.value === "All" && search.value.length > 0) {
        match.value = await query(search, data.value);
      } else {
        match.value = await query(search, data.value);
        if (match.value && region.value) {
          match.value = match.value.filter((country) => {
            return country.region === region.value;
          });
        }
      }
      if (!match.value) {
        region.value = "All";
      }
    });

    watch(region, async () => {
      if (region.value === "All") {
        if (search.value) {
          match.value = data.value.filter((country) => {
            return country.name
              .toLowerCase()
              .includes(search.value.toLowerCase());
          });
        } else {
          match.value = data.value;
        }
      } else {
        if (match.value && search.value.length > 1) {
          match.value = await query(search, data.value);
          if (match.value) {
            match.value = match.value.filter((country) => {
              return country.region === region.value;
            });
          }
        } else {
          match.value = data.value.filter((country) => {
            return country.region === region.value;
          });
        }
      }
    });

    return {
      search,
      region,
      error,
      isPending,
      data,
      match,
      notFound,
      toggle,
      loadMore,
      isPending,
      error,
    };
  },
};
</script>

<style lang="scss"  scoped>
@import "@/assets/_variables.scss";
.search-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3em 0;
  position: relative;
  &__icon {
    position: absolute;
    margin: 15px 30px;
  }
}
input[type="text"],
select {
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  outline: none;
  border: none;
}
input[type="text"] {
  width: 35%;
  padding: 15px 55px;
}
select {
  padding: 12px 20px;
}

.light-magnifying-glass {
  color: $light-mode-input !important;
}

.load-more {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
</style>
