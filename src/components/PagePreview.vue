<script setup lang="ts">
  import usePageData from '../composables/usePageData'

  const {
    pageRef
  } = usePageData()
</script>

<template>
  <div class="preview">
    <h2>JSON structure</h2>
    <pre>{{ JSON.stringify(pageRef, null, 2) }}</pre>
  </div>
</template>

<style scoped lang="scss">
</style>