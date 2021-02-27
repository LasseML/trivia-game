<template>
    <div>
        <h1>{{getCurrentQuestion(index)}}</h1>

        <button 
            v-for="(answer,index) in shuffledAnswersOfArray" 
            :key="index"
            @click="getIndexOfSelectedAnswer(index)"
            :class="[indexOfSelectedAnswer === index ? 'selected' : '']"
            >
            {{ answer }}
        </button> 
        <hr/>
        <button @click="incrementIndexByOne()">Next</button>
        <hr/>
    </div>
</template>

<script>

import { getQuestions } from "../utils/apiConnector";

export default {
  components: {
    
  },
  data() {
    return {
        questions : [],
        combinedAnswers : [],
        index : 0,
        currentQuestion : null,
        indexOfSelectedAnswer : null,
        shuffledAnswersOfArray : []
    };
  },
  created() {
    this.loadDataFromAPI();
    //this.shuffleArrayOfAnswers();
  },
  methods: {
    async loadDataFromAPI() {
      this.questions = await getQuestions();
      this.getCurrentQuestion(this.index);
    },
    getAllAnswers(question){
      this.combinedAnswers = [question.correct_answer, ...question.incorrect_answers];
      return [question.correct_answer, ...question.incorrect_answers];
    },
    getCurrentQuestion(index){
      this.currentQuestion = this.questions[index].question;
      console.log(this.currentQuestion);
      return this.currentQuestion;
    },
    incrementIndexByOne(){
      this.index++;
      this.indexOfSelectedAnswer = null;
      this.shuffleArrayOfAnswers();
    },
    getIndexOfSelectedAnswer(index){
      this.indexOfSelectedAnswer = index;
      console.log(this.indexOfSelectedAnswer);
    },
    shuffleArrayOfAnswers(){
      console.log(this.getAllAnswers(this.questions[this.index]));
      let answers = this.getAllAnswers(this.questions[this.index]);
      console.log(answers);
      this.shuffledAnswersOfArray = answers.sort(() => Math.random() - 0.5);
      console.log(this.shuffledAnswersOfArray);
      return this.shuffledAnswersOfArray;
    } 
  }
};

</script>

<style scoped>

.selected {
  background-color: orange;
}

</style>

//https://stackfame.com/5-ways-to-shuffle-an-array-using-moder-javascript-es6
// https://javascript.info/task/shuffle