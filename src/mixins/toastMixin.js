export default {
  methods: {
    makeToast(
      description,
      title,
      variant = "info",
      solid = true,
      autoHideDelay = 6000,
      toaster = "b-toaster-top-right"
    ) {
      this.$bvToast.toast(description, {
        title,
        variant,
        solid,
        autoHideDelay,
        toaster,
      });
    },
  },
};
