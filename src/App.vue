<script setup lang="ts">
  import ToolBox from './components/ToolBox.vue'
  import BlockDetails from './components/BlockDetails.vue'
  import PageBuilder from './components/PageBuilder.vue'
  import PagePreview from './components/PagePreview.vue'
</script>

<template>
  <div class="page">
    <div class="sidebar">
      <h2>Page Builder</h2>
      <ToolBox />
      <BlockDetails/>
    </div>

    <PageBuilder />
  
    <PagePreview />
  </div>
</template>

<style scoped lang="scss">
  .page {
    display: grid;
    grid-template-columns: 300px 2fr 1fr;

    & > div {
      padding: 1rem 2rem;
    }
  }

  .sidebar {
    background-color: lightblue;
    min-height: 100vh;
  }
</style>