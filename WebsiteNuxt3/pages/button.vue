<template>
  <div>

    <div class="gonemobile absolute top-1/2 right-1/2 h-[12px]">
      <p id="text"></p>
    </div>

    <joystick class="gonedesktop" />

    <div class="gonemobile fadein absolute right-0 bottom-0 p-5 text-center lg:text-6xl text-sm font-light">
      <p id="arrow"></p>
    </div>

    <div class="slide-in messagecontainer gonemobile z-10 flex h-screen w-screen p-5 items-end justify-start text-center lg:text-6xl text-sm font-light">
        <h1>></h1><h1 id="message"></h1>
    </div>
  </div>
</template>

<style scoped>
  .gonemobile {
    @media all and (max-width: 640px) {
      display: none;
      visibility: hidden;
    }
  }

  .gonedesktop {
    @media all and (min-width: 640px) {
      display: none;
      visibility: hidden;
    }
  }

  .messagecontainer {
    letter-spacing: 2px;
  }

  .fadein {
    -webkit-animation: fadein 0.5s;
    animation: fadein 0.5s;
}

  @keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
  }

  @-webkit-keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
  }

  .slide-in {
    transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
    animation: slide-in 1s forwards;
    -webkit-animation: slide-in 1s forwards;
  }
    
  @keyframes slide-in {
    100% { transform: translateX(0%); }
  }

  @-webkit-keyframes slide-in {
    100% { -webkit-transform: translateX(0%); }
  }
</style>

<script>
export default {
  methods: {
  },
  mounted() {
    window.addEventListener('keydown', function (e) {

      var i = String(e.key);


      var logtext = document.getElementById('text');
      var keypressed = document.getElementById('message');
      var arrow = document.getElementById('arrow');

      if (i.length == 1) {
        logtext.innerHTML += `${e.key}`;
      } else if (i == "Backspace") {
        logtext.innerHTML = logtext.innerHTML.substring(0, logtext.innerHTML.length - 1);
        console.log(logtext.innerHTML.length)
        }


      if (e.code != "Space") {
        keypressed.innerHTML = `You pressed '${e.key}'`;
      } else {
        keypressed.innerHTML = `You pressed 'Space'`;
      }

      if (i == "w" || i == "ArrowUp" || i == "W") {
        arrow.innerHTML = "&uarr;";
      } else if (i == "s" || i == "ArrowDown" || i == "S") {
        arrow.innerHTML = "&darr;";
      } else if (i == "a" || i == "ArrowLeft" || i == "A") {
        arrow.innerHTML = "&larr;";
      } else if (i == "d" || i == "ArrowRight" || i == "D") {
        arrow.innerHTML = "&rarr;";
      } else {
        arrow.innerHTML = "";
      }
      
    }, false);

    setTimeout(() => {
        this.$nuxt.refresh()
      }, 750);
  },
  destroyed() {
  window.removeEventListener('keydown', function (e) {
  }, false);
  }
}
</script>