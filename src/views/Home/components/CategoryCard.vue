<template>
    <div>
        <b-card no-body border-variant="light" tag="button" style="max-width: 20rem;" class="p-0">
            <b-card-img class="mb-3 card-img" :src="src" alt="category image" bottom></b-card-img>
            <DefaultButton :buttonText="buttonText" :pill="pill" :width="width" @buttonClick="$emit('buttonClick')"></DefaultButton>
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

<style scoped>
.card-img {
    width: 230px;
    height: 230px;
    border-radius: 10px;
}

.card {
    background-color: #f1f1f1;
}
</style>