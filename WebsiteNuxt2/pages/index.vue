<template>
  <div>
    <div @click="link()" id="fakebody" class="flex cursor-pointer items-center justify-center h-screen w-screen z-10">
      <typewriter id="typewriter"></typewriter>
    </div>
  </div>
</template>

<style scoped>
  .hide {
    display: none;
  }

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
import Typewriter from '~/components/typewriter.vue'
export default {
  components: {Typewriter},
  methods: {
    link() {

      var element = document.getElementById("typewriter");
      element.classList.add("slide-out");

      setTimeout(() => {
        this.$nuxt._router.push({
          path: '/w' });
        }, 500);

    }
  },
  mounted() {
      var timetext = false;
      setTimeout(() => {
        timetext = true;
      }, 3500);

      window.addEventListener('keydown', function (e) {
        if(timetext) {
          // slide out typewriter text
          var element = document.getElementById("typewriter");
          element.classList.add("slide-out");
          
          setTimeout(() => {
            this.$nuxt._router.push({
              path: '/w'
            });
          }, 250);

        }
      }, false);
    

    window.addEventListener("gamepadconnected", (event) => {
  console.log("A gamepad connected:");
  // console.log(event.gamepad);
});

window.addEventListener("gamepaddisconnected", (event) => {
  console.log("A gamepad disconnected:");
  // console.log(event.gamepad);
});

    },
  destroyed() {
  }
}
</script>