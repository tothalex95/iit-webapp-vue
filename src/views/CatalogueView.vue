<template>
  <div class="catalogue">
    <md-card v-if="schoolYears">
      <md-card-content>
        <div class="md-layout md-alignment-center-center">
          <md-field>
            <label for="course">Course</label>
            <md-select v-model="course" name="course" id="course" @md-selected="fetchData()">
              <md-optgroup
                v-for="(sy, syIndex) in sortedSchoolYears"
                v-bind:key="syIndex"
                :label="sy.schoolYear"
              >
                <md-option
                  v-for="(c, cIndex) in sy.courses"
                  v-bind:key="cIndex"
                  :value="c.file"
                >{{ c.name }}</md-option>
              </md-optgroup>
            </md-select>
          </md-field>
        </div>
      </md-card-content>
    </md-card>
    <Error v-if="error"></Error>
    <Spinner v-else-if="course !== null && catalogue === null"></Spinner>
    <md-card v-else-if="catalogue !== null">
      <md-card-content>
        <Catalogue :catalogue="catalogue" :course="course.split('.')[0]"></Catalogue>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import Catalogue from '@/components/Catalogue.vue'
import Spinner from '@/components/Spinner.vue'
import Error from '@/components/Error.vue'
import Constant from '@/constant'
import axios from 'axios'
import _ from 'lodash'

export default {
  data: () => ({
    schoolYears: null,
    course: null,
    catalogue: null,
    error: false
  }),
  methods: {
    fetchCourses () {
      axios.get(Constant.JSON_BASE_URL + 'catalogue_courses.json').then(response => {
        this.schoolYears = response.data
      })
    },
    fetchData () {
      this.catalogue = null
      this.error = false

      axios
        .get(Constant.JSON_BASE_URL + this.course)
        .then(response => {
          this.catalogue = response.data
        })
        .catch(reason => {
          this.error = true
        })
    }
  },
  computed: {
    sortedSchoolYears () {
      return _.orderBy(this.schoolYears, 'schoolYear', 'desc')
    }
  },
  created () {
    this.fetchCourses()
  },
  components: {
    Catalogue,
    Spinner,
    Error
  }
}
</script>

<style lang="scss" scoped>
.md-field {
  width: 25%;
}
</style>
