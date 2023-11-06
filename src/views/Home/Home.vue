<template>
  <b-container fluid class="h-100 w-100 p-0">
    <b-skeleton-img v-show="loadImg" no-aspect height="450px"></b-skeleton-img>
    <b-img v-show="!loadImg" @load="imageLoaded" class="w-100" :src="require('../../assets/home-logo.svg')" fluid alt="image logo"></b-img>

    <b-row class="container-category">
      <b-col class="p-0">
        <b-img class="my-5 w-25 category-img" :src="require('../../assets/CATEGORIAS.png')" center
          alt="image category name"></b-img>
        <HomeCarousel :categories="categories" :loading="loading"></HomeCarousel>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import HomeCarousel from './components/HomeCarousel.vue';
import ToastMixin from '@/mixins/toastMixin.js';

export default {
  name: "Home",
  mixins: [ToastMixin],
  components: {
    HomeCarousel
  },
  async mounted() {
    try {
      this.loading = true
      this.categories = await this.$store.dispatch('listCategories');
      this.loading = false
    } catch (error) {
      this.makeToast(error, 'Mensagem de Erro!', 'warning')
    }
  },
  data() {
    return {
      loading: true,
      loadImg: true,
      categories: [],
    }
  },

  methods: {
    imageLoaded() {
      this.loadImg = false;
      console.log("Imagem carregada");
    },
  },
};
</script>

<style >
.container-category {
  background-color: #f1f1f1;
}

.category-img {
  min-width: 200px;
}
</style>