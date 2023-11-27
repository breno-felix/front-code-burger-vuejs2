<template>
    <b-card img-left no-body border-variant="light" tag="div">
        <b-card-img class="card-img" :src="src" :alt="alt"></b-card-img>
        <div class="card-right w-100">
            <p class="name-text">{{ nameText }}</p>
            <p class="price-text">{{ priceText }}</p>
            <DefaultButton class="mt-2" :buttonText="buttonText" :pill="pill" :width="'100%'" :minWidth="'false'"
                @buttonClick="$emit('buttonClick')"></DefaultButton>
        </div>
    </b-card>
</template>

<script>
import DefaultButton from '@/components/DefaultButton.vue'

export default {
    name: "ProductCard",
    props: {
        src: {
            type: String,
        },
        alt: {
            type: String,
        },
        nameText: {
            type: String,
        },
        priceText: {
            type: String,
        },
        buttonText: {
            type: String,
        },
        pill: {
            type: Boolean,
            default: false
        },
    },
    components: {
        DefaultButton
    },
}
</script>

<style scoped>
.card-img {
    width: 150px;
    height: 150px;
    border-radius: 10px;
}

.card {
    background-color: white;
    border-radius: 30px;
    box-shadow: 0px 30px 60px 0px rgba(57, 57, 57, 0.10);
    gap: 12px;
    padding: 16px;
    width: 100%;
    max-width: 390px;
}

.card-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

p {
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 0;
}

.price-text {
    font-weight: 500;
    margin-top: 30px;
}
</style>