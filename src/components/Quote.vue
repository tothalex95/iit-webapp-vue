<template>
  <md-card>
    <md-card-content>
      <md-empty-state md-icon="format_quote" :md-label="author" :md-description="quote">
        <md-button class="md-primary md-raised" @click="$emit('want-more')">I want more!</md-button>
      </md-empty-state>
    </md-card-content>
  </md-card>
</template>

<script>
export default {
  props: {
    quote: String,
    author: String
  }
}
</script>
