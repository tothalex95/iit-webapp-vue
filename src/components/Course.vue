<template>
  <md-table v-model="lessons" class="md-scrollbar">
    <md-table-row slot="md-table-row" slot-scope="{ item, index }">
      <md-table-cell md-label="Lesson">{{ index + 1 + '.' }}</md-table-cell>
      <md-table-cell md-label="Title">{{ item.description }}</md-table-cell>
      <md-table-cell md-label="Utils">
        <md-list>
          <md-list-item
            v-for="(util, key) in item.utils"
            v-bind:key="key"
            :href="util.url"
          >{{ util.name }}</md-list-item>
        </md-list>
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
export default {
  props: {
    lessons: Array
  }
}
</script>

<style lang="scss" scoped>
.md-table-row:hover:not(.md-header-row) .md-table-cell {
  background: unset !important;
}
</style>
