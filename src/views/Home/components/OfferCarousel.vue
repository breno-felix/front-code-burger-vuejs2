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
                        <OfferCard v-for="(item, index) in this.items" :key="index" :src="item.urlPath"
                            :buttonText="'Peça Agora'" :nameText="item.name" :priceText="item.formatedPrice"
                            :alt="'item image'" @buttonClick="$emit('buttonClick', item)"></OfferCard>
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
import OfferCard from './OfferCard';

export default {
    name: "OfferCarousel",
    props: {
        items: {
            type: Array,
        },
        loading: {
            type: Boolean,
            default: true
        }
    },
    components: { VueSlickCarousel, OfferCard },
    data() {
        return {
            settings: {
                dots: false,
                centerMode: true,
                centerPadding: "20px",
                focusOnSelect: true,
                slidesToShow: 4,
                lazyLoad: 'ondemand',
                responsive: [
                    {
                        breakpoint: 1150,
                        settings: {
                            slidesToShow: 3,
                        },
                    },
                    {
                        breakpoint: 890,
                        settings: {
                            slidesToShow: 2,
                        },
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            centerMode: false,
                        },
                    },
                    {
                        breakpoint: 560,
                        settings: {
                            slidesToShow: 1,
                            centerPadding: "30px",
                        },
                    },
                    {
                        breakpoint: 360,
                        settings: {
                            slidesToShow: 1,
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