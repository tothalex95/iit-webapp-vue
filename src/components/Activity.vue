<template>
  <div class="activity">
    <md-card>
      <md-card-header>
        <md-list>
          <md-list-item>
            <md-icon>{{ icon }}</md-icon>
            <span class="md-list-item-text">{{ name }}</span>
          </md-list-item>
        </md-list>
      </md-card-header>

      <md-card-content>
        <md-table>
          <md-table-row v-for="(detail, index) in orderedDetails" v-bind:key="index">
            <md-table-cell>{{ detail.what }}</md-table-cell>
            <md-table-cell>{{ detail.where }}</md-table-cell>
            <md-table-cell>{{ detail | formatFromTo }}</md-table-cell>
          </md-table-row>
        </md-table>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    name: String,
    icon: String,
    details: Array
  },
  filters: {
    formatFromTo ({ from, to }) {
      let fromStr = new Date(from).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short'
      })
      let toStr = to
        ? new Date(to).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short'
        })
        : 'Present'
      return fromStr + ' - ' + toStr
    }
  },
  computed: {
    orderedDetails () {
      return _.orderBy(this.details, 'from', 'desc')
    }
  }
}
</script>
