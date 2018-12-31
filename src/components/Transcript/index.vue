<template>
  <div class="transcript">
    <TranscriptPart v-for="(part, index) in transcriptParts" :key="index" :speaker="part.speaker" :words="part.words" />
  </div>
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
      let parts = []
      let part = null
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

          part.words.push({
            word: transcriptWord['word'],
            startTime: this.parseTime(transcriptWord['startTime']),
            endTime: this.parseTime(transcriptWord['endTime']),
            confidence: transcriptWord['confidence']
          })

          if (transcriptWord['word'].endsWith('.') || transcriptWord['word'].endsWith('!') || transcriptWord['word'].endsWith('?')) {
            parts.push(part)
            part = { speaker, words: [] }
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
