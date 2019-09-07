<template>
  <div class="ratings">
    <Error v-if="error"></Error>
    <Spinner v-else-if="ratings === null"></Spinner>
    <md-card v-else>
      <md-card-content>
        <md-table v-model="ratings" class="md-scrollbar">
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Semester">{{ item.semester }}</md-table-cell>
            <md-table-cell md-label="Subject">{{ item.subject }}</md-table-cell>
            <md-table-cell md-label="Usefulness">{{ item.usefulness | round }}</md-table-cell>
            <md-table-cell md-label="Feasibility">{{ item.feasibility | round }}</md-table-cell>
            <md-table-cell md-label="Diction">{{ item.diction | round }}</md-table-cell>
            <md-table-cell md-label="Preparedness">{{ item.preparedness | round }}</md-table-cell>
            <md-table-cell md-label="Helpfulness">{{ item.helpfulness | round }}</md-table-cell>
            <md-table-cell md-label="Number of votes">{{ item.raters }}</md-table-cell>
          </md-table-row>
        </md-table>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue'
import Error from '@/components/Error.vue'
import Constant from '@/constant'
import axios from 'axios'

export default {
  data: () => ({
    ratings: null,
    error: false
  }),
  methods: {
    fetchData () {
      axios
        .get(Constant.JSON_BASE_URL + 'ratings.json')
        .then(response => {
          this.ratings = response.data

          let overall = {
            semester: 'Overall',
            usefulness: 0,
            feasibility: 0,
            diction: 0,
            preparedness: 0,
            helpfulness: 0,
            raters: 0
          }

          this.ratings.forEach(rating => {
            overall.raters += rating.raters
          })

          this.ratings.forEach(rating => {
            overall.usefulness +=
              (rating.usefulness * rating.raters) / overall.raters
            overall.feasibility +=
              (rating.feasibility * rating.raters) / overall.raters
            overall.diction +=
              (rating.diction * rating.raters) / overall.raters
            overall.preparedness +=
              (rating.preparedness * rating.raters) / overall.raters
            overall.helpfulness +=
              (rating.helpfulness * rating.raters) / overall.raters
          })

          this.ratings.push(overall)
        })
        .catch(reason => {
          this.error = true
        })
    }
  },
  filters: {
    round (value) {
      return value.toFixed(2)
    }
  },
  created () {
    this.fetchData()
  },
  components: {
    Spinner,
    Error
  }
}
</script>
