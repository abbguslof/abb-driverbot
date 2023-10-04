<template>
  <div class="container1 lg:text-6xl text-sm font-light">
    <h1>>
      <span class="typed-text">{{ typeValue }}</span>
      <span class="cursor" :class="{'typing': typeStatus}">&nbsp;</span>
    </h1>
  </div>
</template>

<style scoped>
  .container1 {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 2px;
  }
 
  @keyframes cursorBlink {
    49% { background-color: #fff; }
    50% { background-color: transparent; }
    99% { background-color: transparent; }
  }
</style>

<script>
import { setTimeout } from 'timers';
  export default {
    data: () => {
      return {
        typeValue: '',
        typeStatus: false,
        typeArray: ['Driverbot Project'],
        typingSpeed: 75,
        erasingSpeed: 10,
        newTextDelay: 1500,
        typeArrayIndex: 0,
        charIndex: 0
      } 
    },
    methods: {
      typeText2() {
        if(this.charIndex < this.typeArray[this.typeArrayIndex].length) {
          if(!this.typeStatus)
            this.typeStatus = true;
          this.typeValue += this.typeArray[this.typeArrayIndex].charAt(this.charIndex);
          this.charIndex += 1;
          setTimeout(this.typeText2, this.typingSpeed);
        }
        else {
          // this.typeStatus = false;
          // setTimeout(this.eraseText2, this.newTextDelay);
        }
      },
      eraseText2() {
        if(this.charIndex > 0) {
          if(!this.typeStatus)
            this.typeStatus = true;
          this.typeValue = this.typeArray[this.typeArrayIndex].substring(0, this.charIndex - 1);
          this.charIndex -= 1;
          setTimeout(this.eraseText2, this.erasingSpeed);
        }
        else {
          this.typeStatus = false;
          this.typeArrayIndex += 1;
          if(this.typeArrayIndex >= this.typeArray.length)
            this.typeArrayIndex = 0;
          setTimeout(this.typeText2, this.typingSpeed + 1000);
        }
      }
    },
    created() {
      this.typeText2()
    }
  }
</script>