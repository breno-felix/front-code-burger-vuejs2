<template>
    <div>
        <b-button class="submit-button w-100" pill type="submit" :style="buttonStyle">
            {{ buttonText }}
        </b-button>
    </div>
</template>
  
<script>
export default {
    name: 'DefaultButton',
    props: {
        backgroundColor: {
            type: String,
            default: '#9758A6'
        },
        minWidth: {
            type: String,
            default: '120px'
        },
        buttonText: {
            type: String,
        },
    },
    computed: {
        buttonStyle() {
            return {
                backgroundColor: this.backgroundColor,
                minWidth: this.minWidth,
                border: 'none',
            };
        }
    },
};
</script>
  
<style scoped>
.submit-button:hover {
    opacity: 0.8;
}

.submit-button:active {
    opacity: 0.6;
}
</style>