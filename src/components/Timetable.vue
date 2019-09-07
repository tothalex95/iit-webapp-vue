<template>
  <md-table class="md-scrollbar">
    <md-table-row>
      <md-table-head>#</md-table-head>
      <md-table-head>Monday</md-table-head>
      <md-table-head>Tuesday</md-table-head>
      <md-table-head>Wednesday</md-table-head>
      <md-table-head>Thursday</md-table-head>
      <md-table-head>Friday</md-table-head>
    </md-table-row>
    <md-table-row v-for="n in range(8, 18)" v-bind:key="n">
      <md-table-cell>{{ n | hour }}</md-table-cell>
      <md-table-cell>{{ subject({ "day": "monday", "from": n }) }}</md-table-cell>
      <md-table-cell>{{ subject({ "day": "tuesday", "from": n }) }}</md-table-cell>
      <md-table-cell>{{ subject({ "day": "wednesday", "from": n }) }}</md-table-cell>
      <md-table-cell>{{ subject({ "day": "thursday", "from": n }) }}</md-table-cell>
      <md-table-cell>{{ subject({ "day": "friday", "from": n }) }}</md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
export default {
  props: {
    details: Array
  },
  methods: {
    range (from, to) {
      return [...Array(to - from).keys()].map(i => i + from)
    },
    subject (occasion) {
      let result = this.details.find(s =>
        s.occasions
          .filter(o => o.day === occasion.day)
          .find(o => o.from <= occasion.from && o.to > occasion.from)
      )
      return result ? result.subject : null
    }
  },
  filters: {
    hour (value) {
      if (value < 1 || value > 23) {
        return '00:00'
      }
      if (value < 10) {
        return '0' + value + ':00'
      }
      return value + ':00'
    }
  }
}
</script>
