<template>
  <div class="z-2">
    <div class="gonemobile absolute top-1/2 right-1/2 h-[12px]">
      <p id="text"></p>
    </div>

    <joystick class="gonedesktop"></joystick>

    <div class="gonemobile fadein absolute right-0 bottom-0 p-5 text-center lg:text-6xl text-sm font-light">
      <p id="arrow"></p>
    </div>

    <div class="slide-in messagecontainer gonemobile z-5 flex h-screen w-screen p-5 items-end justify-start text-center lg:text-6xl text-sm font-light">
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
import Joystick from '~/components/joystick.vue';
import { run_command } from "../plugins/apihandler";
export default {
  components: {Joystick},
  methods: {
  },
  mounted() {
    
    let drive = "drive 0 0"
    let steer = "steer 90"
    let speedboost = false;
    let press = false;
    var logtext = document.getElementById('text');
    var keypressed = document.getElementById('message');
    var arrow = document.getElementById('arrow');

    window.addEventListener('keydown', function (e) {
      press = true;

      var i = String(e.key);

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

    window.addEventListener('keyup', function (e) {
      press = false;
      drive = "drive 0 0"
      steer = "steer 90"
    }, false);

    // global gamepad object
    let gamepadIndex;
    window.addEventListener('gamepadconnected', (event) => {
        gamepadIndex = event.gamepad.index;
    });

      setInterval(() => {
        if(gamepadIndex !== undefined) {
          // a gamepad is connected and has an index
          const myGamepad = navigator.getGamepads()[gamepadIndex];
              
          myGamepad.buttons.map(e => e.pressed).forEach((isPressed, buttonIndex) => {  
            if(isPressed) {
            // button is pressed; indicate this on the page
            // console.log({buttonIndex});
              if ({buttonIndex}.buttonIndex == 1 ) {
                keypressed.innerHTML = `You pressed 'A'`;
                press = true;
              } else if  ({buttonIndex}.buttonIndex == 0) {
                keypressed.innerHTML = `You pressed 'B'`;
                press = true;
              } else if ({buttonIndex}.buttonIndex == 9) {
                keypressed.innerHTML = `You pressed 'Start'`;
                drive = "drive 0 0"
                press = true;
              } else if ({buttonIndex}.buttonIndex == 8) {
                keypressed.innerHTML = `You pressed 'Select'`;
                press = true;
              } else {
              }
            }
          })
        }
      }, 50) // print axes 10 times per second

      setInterval(() => {
        if(gamepadIndex !== undefined) {
          // a gamepad is connected and has an index
          const myGamepad = navigator.getGamepads()[gamepadIndex];

          if (myGamepad.axes[1] >= -2 && myGamepad.axes[1] <= -0.8) {
            drive = "drive 250 0"
            arrow.innerHTML = "&uarr;";
            keypressed.innerHTML = `You pressed 'Axis Up'`;
            press = true;
          } else if (myGamepad.axes[1] >= 0.8 && myGamepad.axes[1] <= 2) {
            drive = "drive 250 1"
            arrow.innerHTML = "&darr;";
            keypressed.innerHTML = `You pressed 'Axis Down'`;
            press = true;
          } else if (myGamepad.axes[0] >= 0.8 && myGamepad.axes[0] <= 2) {
            arrow.innerHTML = "&rarr;";
            keypressed.innerHTML = `You pressed 'Axis Right'`;
            press = true;
            steer = "steer 0" 
            drive = "drive 0 0"
          } else if (myGamepad.axes[0] >= -2 && myGamepad.axes[0] <= -0.8) {
            arrow.innerHTML = "&larr;";
            keypressed.innerHTML = `You pressed 'Axis Left'`;
            press = true;
            steer = "steer 180"
            drive = "drive 0 0"
          } else {
            drive = "drive 0 0"
            steer = "steer 90"
            speedboost = false; 
            press = false;
          }
          
          if (myGamepad.buttons[1].value == 1) {
            speedboost = true;
          } else { speedboost = false; }
        }   
      }, 50)

      setInterval(() => {
        window.addEventListener('keydown', function (e) {
            press = true;
            var i = String(e.key);
            if (i == "w" || i == "ArrowUp" || i == "W") {
              steer = "steer 90"
              drive = "drive 1023 0"
            } else if (i == "s" || i == "ArrowDown" || i == "S") {
              steer = "steer 90"
              drive = "drive 1023 1"
            } else if (i == "a" || i == "ArrowLeft" || i == "A") {
              steer = "steer 180"
              drive = "drive 0 0"
            } else if (i == "d" || i == "ArrowRight" || i == "D") {
              steer = "steer 0"
              drive = "drive 0 0"
            } else {
              steer = "steer 90"
              drive = "drive 0 0"
            }
          }, false);

          window.addEventListener('keyup', function (e) {
            drive = "drive 0 0"
            steer = "steer 90"
          }, false);
        }, 50)


      if (press){
        setInterval(() => {
          
          if (speedboost && press) {
            var arr = drive.split(" ");
            arr[1] = "1023"
            drive = arr.join(" ");
          }

          const args = drive.split(" ").filter((argument) => argument != "");
          const command_name = args.shift().toLowerCase();
          const res = run_command({ command_name: command_name, args: args });

          const args1 = steer.split(" ").filter((argument) => argument != "");
          const command_name1 = args1.shift().toLowerCase();
          const res1 = run_command({ command_name: command_name1, args: args1 });
        }, 200)
      }

      setInterval(() => {
        if (!press) {
          arrow.innerHTML = "";
        }
      }, 1500)

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