<template>
  <table class="transcript">
    <TranscriptPart v-for="(part, index) in transcriptParts" :key="index" :speaker="part.speaker" :words="part.words" />
  </table>
</template>

<script>
import TranscriptPart from './TranscriptPart'
export default {
  props: {
    transcripts: Array
  },
  data: function() {
    return {
      speakers: {
        '1': 'Chauncy',
        '2': 'John',
      }
    }
  },
  components: {
    TranscriptPart
  },
  computed: {
    transcriptParts: function() {
      let part = null
      let parts = []
      for (let transcript of this.transcripts.map(this.topAlternative)) {
        for (let transcriptWord of transcript['words']) {
          if (!transcriptWord['speakerTag']) {
            continue
          }
          
          let speaker = this.speakers[transcriptWord['speakerTag']]

          if (!part) {
            part = { speaker, words: [] }
          } else if (speaker != part.speaker) {
            parts.push(part)
            part = { speaker, words: [] }
          }

          let word = {
            word: transcriptWord['word'],
            startTime: this.parseTime(transcriptWord['startTime']),
            endTime: this.parseTime(transcriptWord['endTime']),
            confidence: transcriptWord['confidence']
          }
          part.words.push(word)

          // Start a new part after 30 seconds.
          if ((word.startTime - part.words[0].startTime) > 30) {
            // Wait until a sentence break, though!
            if (word.word.endsWith('.') || word.word.endsWith('!') || word.word.endsWith('?')) {
              parts.push(part)
              part = { speaker, words: [] }
            }
          }
        }
      }

      // Push the very last result
      if (part) {
        parts.push(part)
      }

      return parts
    },
  },
  methods: {
    topAlternative: function(transcript) {
      let result = null
      for (let alternative of transcript['alternatives']) {
        if (result == null || alternative['confidence'] > result['confidence']) {
          result = alternative
        }
      }
      return result
    },
    parseTime: function(time) {
      return parseFloat(time.substring(0, time.length - 1))
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.transcript {
  border: 1px solid black
}
</style>
