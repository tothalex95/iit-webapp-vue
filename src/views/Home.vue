<template>
  <div class="home">
    <Error v-if="error"></Error>
    <Spinner
      v-else-if="educationDetails === null || workExperienceDetails === null || quote == null"
    ></Spinner>
    <div v-else>
      <Activity name="Education" icon="school" :details="educationDetails"></Activity>
      <Activity name="Work experience" icon="work" :details="workExperienceDetails"></Activity>
      <Quote :quote="quote.quote" :author="quote.author" @want-more="randomQuote()"></Quote>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Activity from '@/components/Activity.vue'
import Spinner from '@/components/Spinner.vue'
import Quote from '@/components/Quote.vue'
import Error from '@/components/Error.vue'
import Constant from '@/constant'
import axios from 'axios'

export default {
  data: () => ({
    educationDetails: null,
    workExperienceDetails: null,
    quotes: null,
    quote: null,
    error: false
  }),
  methods: {
    fetchData () {
      axios
        .get(Constant.JSON_BASE_URL + 'education_info.json')
        .then(response => {
          this.educationDetails = response.data
        })
        .catch(reason => {
          this.error = true
        })
      axios
        .get(Constant.JSON_BASE_URL + 'experience_info.json')
        .then(response => {
          this.workExperienceDetails = response.data
        })
        .catch(reason => {
          this.error = true
        })
      axios
        .get(Constant.JSON_BASE_URL + 'quotes.json')
        .then(response => {
          this.quotes = response.data
          this.randomQuote()
        })
        .catch(reason => {
          this.error = true
        })
    },
    randomQuote () {
      this.quote = this.quotes[Math.trunc(Math.random() * this.quotes.length)]
    }
  },
  created () {
    this.fetchData()
  },
  components: {
    Activity,
    Spinner,
    Quote,
    Error
  }
}
</script>
