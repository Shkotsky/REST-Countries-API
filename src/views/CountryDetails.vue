<template>
  <div
    class="container"
    :class="toggle ? 'container__light' : 'container__dark'"
  >
    <div v-if="data" class="wrapper-details">
      <div
        @click="handleBack"
        class="btn back-btn"
        :class="toggle ? 'light' : 'dark'"
      >
        <fa icon="arrow-left" /> <span> Back </span>
      </div>
      <div v-if="data" class="country">
        <div class="country__image">
          <img :src="data.flag" alt="flag" />
        </div>
        <div class="country__text">
          <h2>{{ data.name }}</h2>
          <div class="country__text__details">
            <div>
              <p>
                <span class="font-weight-bold">Native Name: </span>
                {{ data.nativeName }}
              </p>
              <p>
                <span class="font-weight-bold">Population: </span
                >{{ formatNum(data.population) }}
              </p>
              <p>
                <span class="font-weight-bold">Region: </span>{{ data.region }}
              </p>
              <p>
                <span class="font-weight-bold">Capital: </span
                >{{ data.capital }}
              </p>
            </div>
            <div>
              <p>
                <span class="font-weight-bold">Top Level Domain: </span
                >{{ data.topLevelDomain[0] }}
              </p>
              <p>
                <span class="font-weight-bold">Currency: </span>
                <span
                  v-for="(currency, index) in data.currencies"
                  :key="currency"
                >
                  {{ currency.name }}
                  <span v-if="index + 1 < data.currencies.length">,</span>
                </span>
              </p>
              <p>
                <span class="font-weight-bold">Languages: </span>
                <span
                  v-for="(language, index) in data.languages"
                  :key="language"
                >
                  {{ language.name }}
                  <span v-if="index + 1 < data.languages.length">,</span>
                </span>
              </p>
            </div>
          </div>
          <div class="borders" v-if="borderCountry">
            <span class="borders__title">Border Countries: </span>
            <div v-for="border in borderCountry" :key="border">
              <div
                class="btn border-btn"
                :class="toggle ? 'light' : 'dark'"
                @click="handleBorder(border.alpha3Code)"
              >
                {{ border.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loader v-else :toggle="toggle"></Loader>
  </div>
</template>

<script>
import { inject, ref, watch } from "vue";
import getCountries from "@/composables/getCountries";
import router from "@/router";
import { useRoute } from "vue-router";
import Loader from "@/components/Loader.vue";

export default {
  props: ["code", "country"],
  components: { Loader },
  setup(props) {
    const data = ref(null);
    const { error, isPending, countries } = getCountries();
    const code = ref(props.code);
    const route = useRoute();
    const borderCountry = ref(null);
    const toggle = inject("toggle");

    console.log(props.country);
    const handleCountries = async (code) => {
      let dataResponse = await countries(
        `https://restcountries.com/v2/alpha/${code}`
      );

      if (await dataResponse.borders) {
        borderCountry.value = await Promise.all(
          dataResponse.borders.map(async (border) => {
            const response = await fetch(
              `https://restcountries.com/v2/alpha/${border}`
            );
            return await response.json();
          })
        );
      }

      data.value = await dataResponse;
    };

    handleCountries(code.value);

    const handleBorder = async (code) => {
      await handleCountries(code);
      await router.push({ name: "CountryDetails", params: { code: code } });
    };

    const handleBack = () => {
      router.go(-1);
    };

    watch(route, () => {
      if (route.params.code) {
        handleCountries(route.params.code);
      }
    });

    const formatNum = (num) => {
      if (num) {
        return num.toLocaleString("en-US");
      }
    };

    return {
      handleCountries,
      data,
      handleBack,
      handleBorder,
      formatNum,
      borderCountry,
      toggle,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/_variables.scss";

.wrapper-details {
  padding: 0 7em;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  font-size: 16px;
  flex-wrap: wrap;
  & button {
    align-self: flex-start;
  }
}

.country {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__image {
    img {
      width: 500px;
      max-height: 470px;
    }
  }
  &__text {
    display: flex;
    flex-direction: column;
    margin-left: 6em;
    min-width: 550px;
    &__details {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }
}

.borders {
  display: flex;
  margin: 50px 0;
  align-items: center;
  flex-wrap: wrap;
  &__title {
    white-space: nowrap;
    font-weight: bold;
  }
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px;
}

.back-btn {
  width: 125px;
  height: 40px;
  margin: 70px 0;
  span {
    padding: 0 10px;
  }
}

.border-btn {
  min-width: 90px;
  height: 30px;
  margin: 5px;
  padding: 0 1em;
}
</style>