<template>
  <div class="contact">
    <md-card>
      <md-card-content>
        <md-list>
          <md-list-item>
            <md-icon>room</md-icon>
            <span
              class="md-list-item-text"
            >Institute of Information Technology, Floor 1., Room 107/B</span>
          </md-list-item>
          <md-list-item>
            <md-icon>phone</md-icon>
            <span class="md-list-item-text">+36-46-565-111 #1758</span>
          </md-list-item>
          <md-list-item href="mailto:alex.toth@iit.uni-miskolc.hu">
            <md-icon>email</md-icon>
            <span class="md-list-item-text">alex.toth@iit.uni-miskolc.hu</span>
          </md-list-item>
          <md-list-item @mouseover="showMobile = true" @mouseleave="showMobile = false">
            <md-icon>smartphone</md-icon>
            <span class="md-list-item-text" v-if="showMobile">Haha! Just kidding!</span>
            <span class="md-list-item-text" v-else>+36-**-***-**** Hover to reveal.</span>
          </md-list-item>
        </md-list>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    showMobile: false
  })
}
</script>
