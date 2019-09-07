<template>
  <md-empty-state class="md-accent" md-icon="error" md-label="Something went wrong."></md-empty-state>
</template>

<script>
export default {
  props: {
    message: String
  }
}
</script>
