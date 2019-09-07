<template>
  <div id="app">
    <md-app md-mode="fixed" class="page-container md-layout-column">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Alex Toth's Website</span>

        <div class="md-toolbar-section-end" v-if="!menuVisible">
          <md-button class="md-icon-button" to="/">
            <md-icon>home</md-icon>
          </md-button>
          <md-button class="md-icon-button" to="/information">
            <md-icon>info</md-icon>
          </md-button>
          <md-button class="md-icon-button" to="/education">
            <md-icon>school</md-icon>
          </md-button>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="full" class="md-scrollbar">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>Navigation</span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
          <md-list-item :to="{ name: 'home' }">
            <md-icon>home</md-icon>
            <span class="md-list-item-text">Home</span>
          </md-list-item>

          <md-list-item md-expand>
            <md-icon>info</md-icon>
            <span class="md-list-item-text">Information</span>

            <md-list slot="md-expand">
              <md-list-item class="md-inset" :to="{ name: 'contact' }">
                <md-icon>contacts</md-icon>
                <span class="md-list-item-text">Contact</span>
              </md-list-item>
              <md-list-item class="md-inset" :to="{ name: 'timetable' }">
                <md-icon>access_time</md-icon>
                <span class="md-list-item-text">Timetable</span>
              </md-list-item>
              <md-list-item class="md-inset" :to="{ name: 'ratings' }">
                <md-icon>star</md-icon>
                <span class="md-list-item-text">Ratings</span>
              </md-list-item>
            </md-list>
          </md-list-item>

          <md-list-item md-expand>
            <md-icon>school</md-icon>
            <span class="md-list-item-text">Education</span>

            <md-list slot="md-expand">
              <md-list-item class="md-inset" :to="{ name: 'catalogue' }">
                <md-icon>book</md-icon>
                <span class="md-list-item-text">Catalogue</span>
              </md-list-item>
              <md-list-item class="md-inset" :to="{ name: 'courses' }">
                <md-icon>table_chart</md-icon>
                <span class="md-list-item-text">Courses</span>
              </md-list-item>
            </md-list>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view />
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    menuVisible: false
  }),
  methods: {
    toggleMenu () {
      this.menuVisible = !this.menuVisible
    }
  }
}
</script>

<style lang="scss" scoped>
.md-app {
  height: 100vh;
}
</style>
