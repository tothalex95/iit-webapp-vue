<template>
  <div class="timetable">
    <Error v-if="error"></Error>
    <Spinner v-else-if="timetable === null"></Spinner>
    <md-card v-else>
      <md-card-content>
        <Timetable :details="timetable"></Timetable>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import Timetable from '@/components/Timetable.vue'
import Spinner from '@/components/Spinner.vue'
import Error from '@/components/Error.vue'
import Constant from '@/constant'
import axios from 'axios'

export default {
  data: () => ({
    timetable: null,
    error: false
  }),
  methods: {
    fetchData () {
      axios
        .get(Constant.JSON_BASE_URL + 'timetable.json')
        .then(response => {
          this.timetable = response.data
        })
        .catch(reason => {
          this.error = true
        })
    }
  },
  created () {
    this.fetchData()
  },
  components: {
    Timetable,
    Spinner,
    Error
  }
}
</script>

<style>
</style>
