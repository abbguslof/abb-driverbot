<template>
  <div id="body" class="h-auto w-auto overflow: hidden;">
    <main id="container">
      <div id="terminal">
        <!-- Terminal Bar -->
        <section
          id="terminal_bar"
          class="flex w-full items-center"
          @keypress="handleKeyDown"
        >
          <p id="bar_user">Driverbot@controller: ~</p>
        </section>
        <!-- Terminal Body -->
        <section id="terminal_body">
          <TerminalLog v-for="obj of history" :text="obj.text" :key="obj.key" />

          <div id="terminal_prompt">
            <span id="terminal_prompt--user" class="gonemobile"
              >Driverbot@controller:</span
            >
            <span id="terminal_prompt--location">~</span>
            <span id="terminal_prompt--bling">$&nbsp;</span>
            <div>
              <span id="text"></span><span id="terminal_prompt--cursor"></span>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Ubuntu");
@import url("https://fonts.googleapis.com/css?family=Ubuntu+Mono");

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

#container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Ubuntu;
}

#terminal {
  width: 70vw;
  height: 65vh;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.5);
}

#terminal_bar {
  height: 30px;
  padding: 0 8px;
  box-sizing: border-box;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background: linear-gradient(#504b45 0%, #3c3b37 100%);
}
#bar_user {
  color: #d5d0ce;
  margin-left: 6px;
  font-size: 14px;
  line-height: 15px;
}
#terminal_body {
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  font-family: "Ubuntu Mono";
  height: auto;
  max-width: 70vw;
  overflow-x: hidden;
  overflow-y: auto;
  overflow-wrap: break-word;
  word-break: break-all;
  flex-direction: column;
  height: calc(100% - 30px);
  padding-top: 2px;
  margin-top: -1px;
}
#terminal_prompt {
  display: flex;
  padding: 0 15px;
  max-width: 70vw;
}
#terminal_prompt--user {
  color: #7eda28;
  word-break: normal;
}
#terminal_prompt--location {
  color: #4878c0;
  word-break: normal;
}
#terminal_prompt--bling {
  color: #dddddd;
  word-break: normal;
}
#text {
  color: #dddddd;
  font-family: Ubuntu;
  overflow-wrap: break-word;
  word-break: break-all;
}

#terminal_prompt--cursor {
  display: inline-block;
  position: relative;
  height: 17px;
  width: 8px;
  word-break: normal;
  margin-left: 3px;
  animation: blink 1200ms linear infinite;
}
@keyframes blink {
  0% {
    background: #ffffff;
  }
  49% {
    background: #ffffff;
  }
  60% {
    background: transparent;
  }
  99% {
    background: transparent;
  }
  100% {
    background: #ffffff;
  }
}
@media (max-width: 600px) {
  #terminal {
    max-height: 90%;
    width: 90%;
  }
}
</style>

<script>
import TerminalLog from "./TerminalLog";
import { run_command } from "../plugins/apihandler";

export default {
  components: { TerminalLog },
  data() {
    return {
      history: [],
      commandList: fetch("http://localhost:5000/api/commands/execute"),
    };
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeyDown);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.handleKeyDown);
  },
  methods: {
    handleKeyDown(event) {
      var i = String(event.key);
      const HTMLTextObejct = document.getElementById("text");
      const text = HTMLTextObejct.innerHTML.toLowerCase();
      const commandText = text.split(" ")[0];
      const commandv1 = text.split(" ")[1];
      const commandv2 = text.split(" ")[2];
      const AvailableCommands = ["help", "drive", "steer", "loop", "ping"];

      if (i.length === 1) {
        if (!event.ctrlKey) {
          HTMLTextObejct.innerHTML += `${event.key}`;
          document
            .getElementById("terminal_body")
            .scrollTo(0, document.body.scrollHeight);
        }
      } else if (i === "Backspace") {
        HTMLTextObejct.innerHTML = text.substring(0, text.length - 1);
        document
          .getElementById("terminal_body")
          .scrollTo(0, document.body.scrollHeight);
      } 

      if (i === "c" && event.ctrlKey) {
        HTMLTextObejct.innerHTML = ""
        this.history.push({
          text: "^c",
          key: this.history.length,
        });
        document
          .getElementById("terminal_body")
          .scrollTo(0, document.body.scrollHeight);
      }

      if (i === "Enter") {
        if (!text.length < 1) {
          const size = this.history.length;
        
        this.history.push({
            text: String(text),
            key: this.history.length,
          });

          if (AvailableCommands.includes(commandText)) {
            
            if(commandText === "help") {
              this.history[size].text="Use Drive X Y (X as Speed(0-1024) and Y as direction(0 or 1)) | Use Steer X (x as direction(0 = left, 90 = stationary, 180 = right.))";
            }

            if(commandText === "drive") {
                var drivingspeed = Number(text.split(" ")[1]);
                var drivingdirection = text.split(" ")[2];

              if(commandv2 === undefined && commandv1 === undefined) {
                this.history[size].text=("ERROR: The 'drive' command needs atleast a speed. Ex Drive 500");  
              } else if(commandv2 === undefined && commandv1 >= 0){
                if(drivingspeed > 1024) {drivingspeed = 1024}
                this.history[size].text=("Driving with Speed: " + drivingspeed);
              } else if (commandv1 < 0) { 
                this.history[size].text=("ERROR: The 'drive' command needs a speed between 0 and 1024.");  
              } else {
                if(drivingdirection === "1") { drivingdirection = "Backward" } else if (drivingdirection === "0") { drivingdirection = "Forward" } else { drivingdirection = "'" + drivingdirection +"'" + " is undefined."}

                this.history[size].text=("Driving with Speed: " + drivingspeed + " and Direction: " + drivingdirection);
              }
            } 

            if(commandText === "steer") {
              var steerdirection = Number(text.split(" ")[1]);
              
              if(commandv1 === undefined) {
                this.history[size].text=("ERROR: The 'steer' command needs a direction. Ex steer 0");  
              } else if(steerdirection > 180 || steerdirection < 0){
                this.history[size].text=("ERROR: The 'steer' command needs a direction value between 0 and 180 (0 = Right, 180 = left and 90 = stationary)");
              } else {
                if(steerdirection > 90){steerdirection = "Left"} else if(steerdirection < 90){steerdirection = "Right"} else if(steerdirection = 90){steerdirection = "stopped"};
                this.history[size].text="Steering " + steerdirection; 
              }
            }

            if(commandText === "loop" || commandText === "ping") { this.history[size].text="ERROR: Command '" + text + "' not yet implemented. Try using 'help'."; }
          } else { this.history[size].text="ERROR: Command '" + text + "' not found. Try using 'help'."; }

          // console.log(this.history);
          // console.log(commandv2);
          // console.log(commandv1);
          // console.log(commandText);

          const args = text.split(" ").filter((argument) => argument != "");
          const command_name = args.shift().toLowerCase();
          const res = run_command({ command_name: command_name, args: args });

          HTMLTextObejct.innerHTML = text.substring(
            0,
            text.length - text.length
          );

          document
          .getElementById("terminal_body")
          .scrollTo(0, document.body.scrollHeight);
        }
      }
    },
  },
};
</script>
