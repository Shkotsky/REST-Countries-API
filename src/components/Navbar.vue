<template>
  <div class="navbar" :class="toggle ? 'light' : 'dark'">
    <div class="wrapper-nav">
      <router-link :to="{ name: 'Home' }">
        <h3>Where in the world?</h3>
      </router-link>
      <div @click="toggleMode" class="navbar__button--mode">
        <fa icon="moon" v-if="currentMode == 'Dark'" />
        <fa icon="sun" v-else />
        <span class="font-weight-bold">{{ currentMode }} Mode</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  props: ["toggle"],
  setup(props, context) {
    const toggle = ref(null);
    const currentMode = ref(null);
    toggle.value = props.toggle;

    if (!localStorage.darkMode) {
      currentMode.value = "Dark";
    } else {
      currentMode.value = localStorage.darkMode;
    }

    const toggleMode = () => {
      context.emit("toggleMode");

      currentMode.value = localStorage.darkMode;
    };
    return {
      toggleMode,
      currentMode,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/_variables.scss";

.navbar {
  display: inline-block;
  width: 100%;
  padding: 0 7em;
  text-decoration: none;
}

.wrapper-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: $nav-height;
}

.navbar__button--mode {
  cursor: pointer;
  svg {
    margin-right: 10px;
  }
}
</style>