<template>
  <b-container fluid class="container-wrapper w-100 p-0">
    <b-skeleton-img v-show="loadImg" no-aspect height="450px"></b-skeleton-img>
    <b-img v-show="!loadImg" @load="imageLoaded" class="w-100" :src="require('../../assets/cart-logo.svg')" fluid
      alt="image logo"></b-img>
    <b-container class="py-5" fluid="lg">
      <b-row>
        <b-col order="1">
          <CartTable @showRemoveProductModal="modalShowHandler"></CartTable>
        </b-col>
        <b-col order-md="2">
          <CartResume></CartResume>
          <DefaultButton :buttonText="'Finalizar pedido'" :width="'100%'" class="mt-3" @buttonClick="submitOrder"
            :loading="loading"></DefaultButton>
        </b-col>
      </b-row>
    </b-container>

    <ModalOfRemoveProductFromCart :modalShow="modalShow" :productToRemove="productToRemove"
      :quantityProductCart="quantityProductCart" @changeModalShow="modalShow = $event"></ModalOfRemoveProductFromCart>
  </b-container>
</template>

<script>
import CartTable from './components/CartTable.vue'
import CartResume from './components/CartResume.vue'
import DefaultButton from '@/components/DefaultButton.vue'
import ModalOfRemoveProductFromCart from './components/ModalOfRemoveProductFromCart.vue'
import ToastMixin from '@/mixins/toastMixin.js';
import formatCurrency from "@/utils/formatCurrency";

export default {
  name: "Cart",
  mixins: [ToastMixin],
  components: {
    CartTable,
    CartResume,
    DefaultButton,
    ModalOfRemoveProductFromCart
  },
  data() {
    return {
      loadImg: true,
      loading: false,
      modalShow: false,
      productToRemove: {},
      quantityProductCart: null
    }
  },
  methods: {
    imageLoaded() {
      this.loadImg = false;
    },
    submitOrder() {
      this.loading = true
      this.$store.dispatch('submitOrder')
        .then((message) => {
          this.makeToast(message, 'Tudo certo!', 'success');
          setTimeout(() => {
            this.$router.push('/products');
            this.$store.dispatch('clearCart');
          }, 4000)
        }).catch(error => {
          this.makeToast(error, 'Mensagem de Erro!', 'warning')
        }).finally(() => {
          this.loading = false
        })
    },
    modalShowHandler({ productToRemove, quantityProductCart }) {
      this.productToRemove = productToRemove;
      this.quantityProductCart = quantityProductCart
      this.modalShow = true;
    },
    formatCurrency(value) {
      return formatCurrency(value);
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