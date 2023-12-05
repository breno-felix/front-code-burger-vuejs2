<template>
  <b-container fluid class="h-100 w-100 p-0">
    <b-skeleton-img v-show="loadImg" no-aspect height="450px"></b-skeleton-img>
    <b-img v-show="!loadImg" @load="imageLoaded" class="w-100" :src="require('../../assets/home-logo.svg')" fluid
      alt="image logo"></b-img>

    <b-row class="container-category pb-5">
      <b-col class="p-0">
        <b-img class="my-5 category-img" :src="require('../../assets/CATEGORIAS.png')" center
          alt="category name image"></b-img>
        <CategoryCarousel :items="categories" :loading="loading" @buttonClick="categoryCarouselButtonClick">
        </CategoryCarousel>
      </b-col>
    </b-row>

    <b-row class="container-product pb-5">
      <b-col class="p-0">
        <b-img class="my-5 offer-img" :src="require('../../assets/OFERTAS.png')" center alt="offer name image"></b-img>
        <OfferCarousel :items="productsOffer" :loading="loading" @buttonClick="offerCarouselButtonClick">
        </OfferCarousel>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import CategoryCarousel from './components/CategoryCarousel'
import OfferCarousel from './components/OfferCarousel'
import ToastMixin from '@/mixins/toastMixin.js';

export default {
  name: "Home",
  mixins: [ToastMixin],
  components: {
    CategoryCarousel,
    OfferCarousel
  },
  async mounted() {
    try {
      this.loading = true
      this.categories = await this.$store.dispatch('listCategories');
      this.productsOffer = await this.$store.dispatch('listProductsOffer');
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
      productsOffer: [],
    }
  },

  methods: {
    imageLoaded() {
      this.loadImg = false;
    },
    categoryCarouselButtonClick(categoryId) {
      this.$router.push({ name: 'products', params: { categoryId } });
    },
    offerCarouselButtonClick(product) {
      this.$store.dispatch('putProductInCart', product);
      this.makeToast('O produto foi adicionado ao carrinho', 'Tudo certo!', 'success');
    }
  },
};
</script>

<style >
.container-category {
  background-color: #f1f1f1;
}

.category-img {
  width: 25%;
  min-width: 200px;
}

.container-product {
  background-color: white;
}

.offer-img {
  width: 18%;
  min-width: 145px;
}
</style>