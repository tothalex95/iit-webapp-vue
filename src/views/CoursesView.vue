<template>
  <div class="courses">
    <Error v-if="error"></Error>
    <Spinner v-else-if="courses === null"></Spinner>
    <md-card v-else>
      <md-card-content>
        <md-tabs class="md-transparent" md-alignment="fixed">
          <md-tab v-for="(course, index) in courses" v-bind:key="index" :md-label="course.title">
            <Course :lessons="course.lessons"></Course>
          </md-tab>
        </md-tabs>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import Course from '@/components/Course.vue'
import Spinner from '@/components/Spinner.vue'
import Error from '@/components/Error.vue'
import Constant from '@/constant'
import axios from 'axios'

export default {
  data: () => ({
    courses: null,
    error: false
  }),
  methods: {
    fetchData () {
      axios
        .get(Constant.JSON_BASE_URL + 'courses.json')
        .then(response => {
          this.courses = response.data
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
    Course,
    Spinner,
    Error
  }
}
</script>

<style>
</style>
