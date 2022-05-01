<template>
  <div>
    <Nuxt-Link to="/button" id="fakebody" class="flex items-center justify-center h-screen w-screen z-10">
      <typewriter2 id="typewriter2">
      </typewriter2>
    </Nuxt-Link>
  </div>
</template>

<style scoped>
  .slide-out {
    animation: slide-out 0.5s forwards;
    -webkit-animation: slide-out 0.5s forwards;
}

  @keyframes slide-out {
    0% { transform: translateX(0%); }
    99% { transform: translateX(-100%); }
    100% { transform: translateX(-110%); display: none; }
  }

  @-webkit-keyframes slide-out {
    0% { transform: translateX(0%); }
    99% { transform: translateX(-100%); }
    100% { transform: translateX(-110%); display: none; }
  }
</style>

<script>
import Typewriter2 from '~/components/typewriter2.vue'
export default {
  components: {Typewriter2},
  methods: {
  },
  mounted() {
      setTimeout(() => {
          this.$nuxt._router.push({
          path: '/button'
          });
      }, 1500);

      setTimeout(() => {
          var element = document.getElementById("typewriter2");
          element.classList.add("slide-out");
      }, 1000);
    },
  destroyed() {
  }
}
</script>