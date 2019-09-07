<template>
  <div class="education">
    <md-tabs class="md-transparent" md-alignment="fixed" md-sync-route>
      <md-tab md-icon="book" md-label="Catalogue" :to="{ name: 'catalogue' }"></md-tab>
      <md-tab md-icon="table_chart" md-label="Courses" :to="{ name: 'courses' }"></md-tab>
    </md-tabs>
    <router-view />
  </div>
</template>
