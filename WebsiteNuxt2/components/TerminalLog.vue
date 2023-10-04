<template>
    <div>
        <div id="terminal_prompt2">
            <span id="terminal_prompt--user" class="gonemobile">Driverbot@controller:</span>            
            <span id="terminal_prompt--location">~</span>
            <span id="terminal_prompt--bling">$&nbsp;</span>
            <span id="terminal_prompt--command">{{ text }}</span>
        </div>      
    </div>
</template>

<script>
export default {
    props: ['text'],
    data() {
        return {
        };
    },
    methods: {
    },
    watch: {
    },
    mounted() {
    }
}
</script>

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

#terminal_prompt2 {  
  display: flex;
  padding: 0 15px;  
  max-width: 70vw; 
  word-break: normal;
}
#terminal_prompt--command {
  color: #dddddd;
  font-family: Ubuntu;
  overflow-x: hidden;
  overflow-y: auto;
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
</style>>