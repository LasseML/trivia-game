<template>
    <div>
        <h1>Total score: <span>{{calculateScore()}} out of 100.</span></h1>
        <ul     
        v-for="(displayResult,index) in displayResults"
        :key="index">
            <li>Question: <span v-html="displayResult.question"></span></li>
            <li>User answer: <span v-html="displayResult.answered"></span></li>
            <li>Correct answer: <span v-html="displayResult.correct"></span></li><br>
        </ul>
    </div>
</template>

<script>

export default {
    props: ['displayResults'],
    methods: {
        calculateScore(){
            let score = 0;
            for (let index = 0; index < this.displayResults.length; index++) {
                if (this.displayResults[index].answered === this.displayResults[index].correct) {
                    score+=10;
                }   
            }
            return score;
        }
    }
};
</script>

<style scoped>
    ul {
        list-style-type:none;
        text-align: left;
    }
</style>
