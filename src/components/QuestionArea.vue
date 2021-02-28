<template>
    <div>
        <h1 v-html="currentQuestion.question"></h1>
        <button 
            v-for="(answer,index) in shuffledAnswersOfArray" 
            :key="index"
            @click="getIndexOfSelectedAnswer(index)"
            :class="[indexOfSelectedAnswer === index ? 'selected' : '']"
            v-html="answer">
        </button> 
        <hr/>
        <button @click="incrementIndexByOne()">Next</button>
        <hr/>
    </div>
</template>

<script>

import { getQuestions } from "../utils/apiConnector";

export default {
  data() {
    return {
        questions : [],
        combinedAnswers : [],
        index : 0,
        currentQuestion : null,
        indexOfSelectedAnswer : null,
        shuffledAnswersOfArray : [],
        resultScreenData : []
    };
  },
  created() {
    this.loadDataFromAPI();
  },
  methods: {
    async loadDataFromAPI() {
      this.questions = await getQuestions();
      this.getCurrentQuestion(this.index);
      this.shuffleArrayOfAnswers();
    },
    getAllAnswers(question){
      this.combinedAnswers = [question.correct_answer, ...question.incorrect_answers];
    },
    getCurrentQuestion(index){
      this.currentQuestion = this.questions[index];
    },
    incrementIndexByOne(){
      this.saveChoice();
      this.index++;
      if (this.index > 9) {
        this.$emit('questions-done', this.resultScreenData);
      }
      this.indexOfSelectedAnswer = null;
      this.getCurrentQuestion(this.index);
      this.shuffleArrayOfAnswers();
    },
    getIndexOfSelectedAnswer(index){
      this.indexOfSelectedAnswer = index;
      this.compareUserAnswerWithCorrectAnswer();
    },
    shuffleArrayOfAnswers(){
      this.getAllAnswers(this.questions[this.index]);
      this.shuffledAnswersOfArray = this.combinedAnswers.sort(() => Math.random() - 0.5);
    },
    saveChoice(){
      let choice = {};
      choice.answered = this.combinedAnswers[this.indexOfSelectedAnswer];
      choice.correct = this.currentQuestion.correct_answer;
      choice.question = this.currentQuestion.question;
      this.resultScreenData.push(choice);
    }
  }
};

</script>

<style scoped>
.selected {
  background-color: orange;
}
</style>
