<template>
  <div id="app">
    <Header v-if="showHeader()"></Header>
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "App",
  components: {
    Header,
  },
  methods: {
    showHeader() {
      return this.$route.path !== '/login' && this.$route.path !== '/registration';
    }
  }
};
</script>


<style>
* {
  font-family: 'Roboto', sans-serif;
}

html,
body {
  height: 100%;
  min-height: 104vh;
}

#app {
  height: 100%;
}
</style>