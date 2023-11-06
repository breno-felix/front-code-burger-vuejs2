<template>
    <b-container fluid>
        <b-row align-h="center">
            <b-col cols="10">
                <b-skeleton-wrapper :loading="loading">
                    <template #loading>
                        <b-card>
                            <b-skeleton-img no-aspect height="150px"></b-skeleton-img>
                        </b-card>
                    </template>

                    <VueSlickCarousel v-bind="settings">
                        <HomeCard v-for="(category, index) in this.categories" :key="index" :src="category.urlPath"
                            :buttonText="category.name" alt="category image"></HomeCard>
                    </VueSlickCarousel>
                </b-skeleton-wrapper>
            </b-col>
        </b-row>
    </b-container>
</template>
  
<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import HomeCard from './HomeCard.vue';

export default {
    name: "HomeCarousel",
    props: {
        categories: {
            type: Array,
        },
        loading: {
            type: Boolean,
            default: true
        }
    },
    components: { VueSlickCarousel, HomeCard },
    data() {
        return {
            settings: {
                dots: true,
                centerMode: true,
                centerPadding: "20px",
                focusOnSelect: true,
                slidesToShow: 4,
                lazyLoad: 'ondemand',
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 3,
                        },
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                        },
                    },
                    {
                        breakpoint: 376,
                        settings: {
                            slidesToShow: 2,
                            centerMode: false,
                        },
                    },
                ],
            }
        }
    }
};
</script>
  
<style >
.slick-prev:before,
.slick-next:before {
    color: #874e96;
}
</style>