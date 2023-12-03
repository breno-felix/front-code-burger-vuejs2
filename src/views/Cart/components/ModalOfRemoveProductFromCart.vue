<template>
    <b-modal v-model="show" title="Deletar produto" ok-only>
        <b-container>
            <b-row>
                <p> Você tem certeza que deseja deletar este produto? </p>
            </b-row>
            <b-row>
                <b-col cols="5" class="pr-0">
                    <b-card-img class="modal-img" :src="productToRemove.urlPath" :alt="'modal image'"></b-card-img>
                </b-col>
                <b-col class="pl-0">
                    <p><b>{{ productToRemove.name }}</b></p>
                    <p>{{ formatCurrency(productToRemove.price) }}</p>
                </b-col>
            </b-row>

        </b-container>
        <template #modal-footer="{ cancel }">
            <b-button size="sm" variant="success" @click="removeProductFromCart(productToRemove._id)">
                Sim
            </b-button>
            <b-button size="sm" variant="danger" @click="cancel()">
                Não
            </b-button>
        </template>
    </b-modal>
</template>

<script>
import formatCurrency from "@/utils/formatCurrency";
import ToastMixin from '@/mixins/toastMixin.js';

export default {
    name: "ModalOfRemoveProductFromCart",
    mixins: [ToastMixin],
    props: {
        modalShow: {
            type: Boolean,
        },
        productToRemove: {
            type: Object,
        },
        quantityProductCart: {
            type: Number,
        }
    },
    computed: {
        show: {
            get() {
                return this.modalShow;
            },
            set(newValue) {
                this.$emit("changeModalShow", newValue);
            }
        }
    },
    methods: {
        formatCurrency(value) {
            return formatCurrency(value);
        },
        removeProductFromCart(productId) {
            this.$store.dispatch('removeProductFromCart', productId);
            this.makeToast('Produto removido com sucesso', 'Tudo certo!', 'success');
            this.show = false;
            if (this.quantityProductCart === 1) {
                this.$router.push({ name: 'products', params: { cartProducts: 'empty' } });
            }
        },
    }
}
</script>

<style>
.modal-img {
    width: 150px;
    height: 150px;
    border-radius: 10px;
}
</style>