<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Transcript :transcripts="transcripts"/>
  </div>
</template>

<script>
import transcript from '../podcast1.json'
import Transcript from './components/Transcript'

export default {
  name: 'app',
  computed: {
    transcripts: function() {
      return transcript['results']
    }
  },
  components: {
    Transcript
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
