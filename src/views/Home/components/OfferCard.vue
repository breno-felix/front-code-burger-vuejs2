<template>
    <div>
        <b-card no-body border-variant="light" tag="button" style="max-width: 20rem;" class="p-0">
            <b-card-img class="mb-2 card-img" :src="src" :alt="alt" bottom></b-card-img>
            <p>{{ nameText }}</p>
            <p>{{ priceText }}</p>
            <DefaultButton class="mt-2" :buttonText="buttonText" :pill="pill" :width="width"></DefaultButton>
        </b-card>
    </div>
</template>

<script>
import DefaultButton from '@/components/DefaultButton.vue'

export default {
    name: "CategoryCard",
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
        width: {
            type: String,
            default: "100%"
        }
    },
    components: {
        DefaultButton
    },
}
</script>

<style>
.card-img {
    width: 230px;
    height: 230px;
    border-radius: 10px;
}

.card {
    background-color: white;
}

p {
    margin-bottom: 0;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%;
}
</style>