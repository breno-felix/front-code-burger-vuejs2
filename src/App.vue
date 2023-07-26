<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>


<style>
* {
  font-family: 'Roboto', sans-serif;
}

html, body {
  height: 100%;
  min-height: 104vh;
}

#app{
  height: 100%;
}
</style>