<template>
  <div class="information">
    <md-tabs class="md-transparent" md-alignment="fixed" md-sync-route>
      <md-tab md-icon="contacts" md-label="Contact" :to="{ name: 'contact' }"></md-tab>
      <md-tab md-icon="access_time" md-label="Timetable" :to="{ name: 'timetable' }"></md-tab>
      <md-tab md-icon="star" md-label="Ratings" :to="{ name: 'ratings' }"></md-tab>
    </md-tabs>
    <router-view />
  </div>
</template>
