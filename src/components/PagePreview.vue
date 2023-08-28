<script setup lang="ts">
  import usePageData from '../composables/usePageData'

  const {
    pageRef
  } = usePageData()
</script>

<template>
  <div class="preview shadow m-8 mt-0 lg:m-0 h-100">
    <h2 class="text-lg">JSON Preview</h2>
    <pre>{{ JSON.stringify(pageRef, null, 2) }}</pre>
  </div>
</template>

<style scoped lang="scss">
  .preview {
    background-color: #fff;
    padding: 2rem;
  }
</style>