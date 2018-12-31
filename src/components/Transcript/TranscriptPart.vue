<template>
  <div class="transcriptPart">
    <span class="speaker">{{speaker}}: </span>
    <span v-for="(word, index) in words" :key="index" class="word" :alt="word.startTime">{{word.word}} </span>
  </div>
</template>

<script>
export default {
  props: {
    speaker: String,
    words: Array,
  }
}
</script>

<style>
.transcriptPart {
  border: 1px solid black
}
.transcriptPart .speaker {
  font-weight: bold
}
</style>
