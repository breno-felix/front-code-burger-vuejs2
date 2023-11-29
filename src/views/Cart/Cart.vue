<template>
  <b-container fluid class="container-wrapper w-100 p-0">
    <b-skeleton-img v-show="loadImg" no-aspect height="450px"></b-skeleton-img>
    <b-img v-show="!loadImg" @load="imageLoaded" class="w-100" :src="require('../../assets/cart-logo.svg')" fluid
      alt="image logo"></b-img>

    <CartTable></CartTable>
  </b-container>
</template>

<script>
import CartTable from './components/CartTable.vue'

export default {
  name: "Cart",
  components: {
    CartTable
  },
  data() {
    return {
      loadImg: true,
    }
  },
  methods: {
    imageLoaded() {
      this.loadImg = false;
    },
  },
};
</script>

<style >
.container-wrapper {
  background-color: #EFEFEF;
  min-height: 100%;
  max-height: max-content;
}
</style>