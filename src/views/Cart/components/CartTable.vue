<template>
    <b-table :fields="fields" :items="cartProducts" borderless>
        <template #cell(urlPath)="data">
            <b-img :src="data.value" alt="product image"></b-img>
        </template>

        <template #cell(price)="data">
            {{ formatCurrency(data.value) }}
        </template>

        <template #cell(quantity)="data">
            <b-button size="sm" class="mr-1" @click="minusButtonClick(data.item._id)">
                -
            </b-button>
            {{ data.value }}
            <b-button size="sm" class="ml-1" @click="plusButtonClick(data.item)">
                +
            </b-button>
        </template>

        <template #cell(totalPrice)="data">
            {{ formatCurrency(data.item.price * data.item.quantity) }}
        </template>
    </b-table>
</template>

<script>
import { mapGetters } from 'vuex';
import formatCurrency from "@/utils/formatCurrency";

export default {
    name: "CartTable",
    data() {
        return {
            fields: [
                {
                    key: 'urlPath',
                    label: '',
                },
                {
                    key: 'name',
                    label: 'Item',
                },
                {
                    key: 'price',
                    label: 'Preço',
                },
                {
                    key: 'quantity',
                    label: 'Quantidade',
                },
                {
                    key: 'totalPrice',
                    label: 'Total',
                }
            ],
        }
    },
    computed: {
        ...mapGetters({
            cartProducts: 'getCartProducts',
        }),
    },
    methods: {
        formatCurrency(value) {
            return formatCurrency(value);
        },
        plusButtonClick(product) {
            this.$store.dispatch('putProductInCart', product);
        },
        minusButtonClick(productId) {
            this.$store.dispatch('decreaseProductFromCart', productId);
        }
    }
}
</script>

<style>
img {
    width: 120px;
    height: 120px;
    border-radius: 10px;
}

.table {
    border-radius: 20px;
    background-color: #FFFFFF;
    box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.03);
    width: max-content;
}

th {
    color: #9A9A9D;
    font-size: 17px;
    font-weight: 400;
    line-height: normal;
    border-bottom: 1px solid #B5B5B5 !important;
}

.btn-secondary {
    background-color: transparent;
    border-color: #9758A6;
    color: #9758A6;
    width: 30px;
}

.btn-secondary:active,
.btn-secondary:hover {
    background-color: #9758A6 !important;
    border-color: #9758A6 !important;
    color: #FFFFFF !important;
}

.btn-secondary:active {
    opacity: 0.7;
    box-shadow: none !important;
}

.btn-secondary:focus {
    background-color: transparent;
    border-color: #9758A6;
    color: #9758A6;
    box-shadow: none;
}
</style>