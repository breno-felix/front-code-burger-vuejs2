<template>
    <div class="w-100">
        <b-overlay :show="loading" :rounded="rounded" opacity="0.6" spinner-small spinner-variant="primary"
            class="d-inline-block width" @hidden="onHidden">
            <b-button ref="button" :disabled="loading" class="submit-button w-100" :pill="pill" type="submit"
                :style="buttonStyle" @click="$emit('buttonClick')">
                {{ buttonText }}
            </b-button>
        </b-overlay>
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
        loading: {
            type: Boolean,
            default: false
        },
        rounded: {
            type: String,
            default: "pill"
        },
        pill: {
            type: Boolean,
            default: true
        },
        width: {
            type: String,
            default: "50%"
        }
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
    methods: {
        onHidden() {
            this.$refs.button.focus();
        },
    }
};
</script>
  
<style scoped>
.submit-button:hover {
    opacity: 0.8;
}

.submit-button:active {
    opacity: 0.6;
}

.width {
    width: v-bind(width);
}
</style>