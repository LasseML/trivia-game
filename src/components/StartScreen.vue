<template>
    <div>
      <h1>Are you ready to play Trivia Quiz?</h1>
      <h4>Press Start to start the game</h4>
      <button v-on:click="$emit('start')">Start</button>
    </div>
</template>



