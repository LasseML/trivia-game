<template>
    <div>
<!--         <h1 v-for="question of questions"
        :key="question.ID"
        >{{question.question}}</h1> -->
        <h1>{{questions[0].question}}</h1>
        <h1 v-for="answer of questions[0].incorrect_answers"
        :key="answer"
        >{{answer}}</h1>
        <h1>{{questions[0].correct_answer}}</h1>
    </div>
</template>

<script>

import { getQuestions } from "../utils/apiConnector";

export default {
  components: {
    
  },
  data() {
    return {
        questions: []
    };
  },
  created() {
    this.loadDataFromAPI();
  },
  methods: {
    async loadDataFromAPI() {
      //load from api call
      this.questions = await getQuestions();
    },
  },
};

</script>