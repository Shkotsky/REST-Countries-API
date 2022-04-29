<template>
  <Navbar @toggleMode="darkMode" :toggle="toggle" />
  <router-view />
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { ref } from "@vue/reactivity";
import { provide } from "@vue/runtime-core";

export default {
  components: { Navbar },
  setup() {
    const toggle = ref(null);

    if (localStorage.darkMode && localStorage.darkMode === "dark") {
      toggle.value = false;
    } else {
      toggle.value = true;
    }

    const darkMode = () => {
      toggle.value = !toggle.value;

      if (toggle.value) {
        localStorage.setItem("darkMode", "light");
      } else {
        localStorage.setItem("darkMode", "dark");
      }

      console.log(localStorage);
    };

    provide("toggle", toggle);
    return { darkMode, toggle };
  },
};
</script>


<style lang="scss">
</style>
