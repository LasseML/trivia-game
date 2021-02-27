<template>
    <div>
        <h1>{{currentQuestion.question}}</h1>

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
        <h1>{{combinedAnswers}}</h1>
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
        shuffledAnswersOfArray : [],
        resultScreenData : []
        //userCorrectAnswer : [],
        //userIncorrectAnswer : []
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
      console.log(this.combinedAnswers);
      //return [question.correct_answer, ...question.incorrect_answers];
    },
    getCurrentQuestion(index){
      this.currentQuestion = this.questions[index];
      //console.log(this.currentQuestion);
      //return this.currentQuestion;
    },
    incrementIndexByOne(){
      this.saveChoice();
      this.index++;
      this.indexOfSelectedAnswer = null;
      this.getCurrentQuestion(this.index);
      this.shuffleArrayOfAnswers();
    },
    getIndexOfSelectedAnswer(index){
      this.indexOfSelectedAnswer = index;
      this.compareUserAnswerWithCorrectAnswer();
      //console.log(this.indexOfSelectedAnswer);
    },
    shuffleArrayOfAnswers(){
      this.getAllAnswers(this.questions[this.index]);
      //let answers = this.getAllAnswers(this.questions[this.index]);
      //console.log(answers);
      this.shuffledAnswersOfArray = this.combinedAnswers.sort(() => Math.random() - 0.5);
      //console.log(this.shuffledAnswersOfArray);
      //return this.shuffledAnswersOfArray;
    },
    compareUserAnswerWithCorrectAnswer(){
      if (this.currentQuestion.correct_answer === this.combinedAnswers[this.indexOfSelectedAnswer]) {
        console.log('correct');
      } else {
        console.log('incorrect');
      }
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

//https://stackfame.com/5-ways-to-shuffle-an-array-using-moder-javascript-es6
// https://javascript.info/task/shuffle