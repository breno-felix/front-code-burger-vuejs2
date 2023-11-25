<template>
  <b-container fluid class="container-wrapper w-100 p-0">
    <b-skeleton-img v-show="loadImg" no-aspect height="450px"></b-skeleton-img>
    <b-img v-show="!loadImg" @load="imageLoaded" class="w-100" :src="require('../../assets/products-logo.svg')" fluid
      alt="image products logo"></b-img>

    <b-nav align="center mb-5">
      <b-nav-item v-for="(category, index) in this.categories" :key="index" @click="changeCategory(category._id)"
        :active="(category._id === activeCategory)">{{
          category.name }}</b-nav-item>
    </b-nav>

  <b-container fluid="xl">
    <b-row cols="1" cols-md="2" cols-xl="3">
      <b-col class="mb-3 col-card" v-for="(product, index) in this.productsByCategory" :key="index" >
        <ProductCard :src="product.urlPath" :buttonText="'Adicionar'"
          :nameText="product.name" :priceText="product.formatedPrice" :alt="'product image'" :pill="true"></ProductCard>
      </b-col>
    </b-row>
  </b-container>


  </b-container>
</template>

<script>
import ToastMixin from '@/mixins/toastMixin.js';
import ProductCard from './components/ProductCard.vue'


export default {
  name: "Products",
  mixins: [ToastMixin],
  components: {
    ProductCard
  },
  async mounted() {
    const category_id = this.$route.params.categoryId
    try {
      await this.getCategories()
      await this.getProducts()
      if (category_id) {
        this.changeCategory(category_id)
      }
    } catch (error) {
      this.makeToast(error, 'Mensagem de Erro!', 'warning')
    }
  },
  data() {
    return {
      loadProduct: true,
      loadImg: true,
      categories: [],
      activeCategory: '0',
      products: [],
      productsByCategory: []
    }
  },
  methods: {
    imageLoaded() {
      this.loadImg = false;
    },
    changeCategory(categoryId) {
      this.activeCategory = categoryId
      this.getProductsByCategory(categoryId)
    },
    getProductsByCategory(categoryId) {
      this.loadProduct = true;
      if(categoryId !== '0'){
        this.productsByCategory = this.products.filter(product => product.category_id === categoryId)
      } else {
        this.productsByCategory = this.products;
      }
      this.loadProduct = false;
    },
    async getProducts() {
      this.loadProduct = true;
      this.products = await this.$store.dispatch('listProducts');
      this.productsByCategory = this.products;
      this.loadProduct = false;
    },
    async getCategories() {
      const allCategories = await this.$store.dispatch('listCategories');
      this.categories = [{ _id: '0', name: 'Todos' }, ...allCategories]
    }
  },
};
</script>

<style >
.nav-link {
  color: #9A9A9D;
  font-size: 17px;
}

.active {
  color: #9758A6 !important;
  text-decoration: underline !important;
}

.container-wrapper {
  background-color: #EFEFEF;
  min-height: 100%; 
  max-height: max-content;
}

.col-card {
  display: flex;
  justify-content: center;
}
</style>