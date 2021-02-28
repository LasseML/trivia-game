<template>
  <div id="app">
    <StartScreen v-if="this.gameStarted != true" @start="startGame"></StartScreen>
    <div v-if="this.gameStarted == true">
      <QuestionArea @questions-done="displayResult" v-if="displayResults == null"></QuestionArea>
      <ResultScreen v-if="displayResults != null" v-bind:displayResults="displayResults"></ResultScreen>
    </div>  
  </div>
</template>

<script>
import QuestionArea from './components/QuestionArea.vue'
import ResultScreen from './components/ResultScreen.vue'
import StartScreen from './components/StartScreen.vue'

export default {
  name: 'App',
  components: {
    QuestionArea,
    ResultScreen,
    StartScreen
  },
  methods:{
    displayResult(result){
      this.displayResults = result;
    },
    startGame(){
      this.gameStarted = true;
    }
  },
  data() {
    return {
      displayResults : null,
      gameStarted : false
    };
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
