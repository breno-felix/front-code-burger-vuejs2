<template>
    <b-container class="container-wrap">
        <b-row class="mx-0 mb-2">
            <h2>Resumo do pedido</h2>
        </b-row>
        <b-row class="mx-0">
            <b-col cols="8" lg="9" xl="10" class="p-0">
                <p>Itens</p> 
            </b-col>
            <b-col class="p-0">
                <p>{{ formatCurrency(cartPrice) }}</p> 
            </b-col>
        </b-row>
        <b-row class="mx-0 mb-5">
            <b-col cols="8" lg="9" xl="10" class="p-0">
                <p>Taxa de entrega</p> 
            </b-col>
            <b-col class="p-0">
                <p>{{ formatCurrency(deliveryFee) }}</p> 
            </b-col>
        </b-row>
        <b-row class="mx-0 mt-5">
            <b-col cols="8" lg="9" xl="10" class="p-0">Total</b-col>
            <b-col class="p-0">{{ formatCurrency(cartPrice + deliveryFee) }}</b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapGetters } from 'vuex';
import formatCurrency from "@/utils/formatCurrency";
import calculateCartPrice from "@/utils/calculateCartPrice";

export default {
    name: "CartResume",
    data() {
        return {
            deliveryFee: 5,
        }   
    },
    computed: {
        ...mapGetters({
            cartProducts: 'getCartProducts',
        }),
        cartPrice() {
            return calculateCartPrice(this.cartProducts);
        }
    },
    methods: {
        formatCurrency(value) {
            return formatCurrency(value);
        },
    },
}
</script>

<style scoped>
.container-wrap {
    border-radius: 20px;
    background: #FFF;
    box-shadow: 0px 10px 40px 0px rgba(0, 0, 0, 0.03);
    padding: 20px;
}

h2 {
    font-size: 20px;
    font-weight: 500;
}

p {
    font-size: 14px;
    font-weight: 300;
}
</style>