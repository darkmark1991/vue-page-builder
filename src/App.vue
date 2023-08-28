<script setup lang="ts">
  import { HomeModernIcon } from '@heroicons/vue/24/solid'
  import ToolBox from './components/ToolBox.vue'
  import BlockDetails from './components/BlockDetails.vue'
  import PageBuilder from './components/PageBuilder.vue'
  import PagePreview from './components/PagePreview.vue'
</script>

<template>
  <div class="page">
    <div class="sidebar">
      <h2 class="title">
        <HomeModernIcon class="title--icon"/>
        <div class="title--text">
          <div>Page</div>
          <div>Builder</div>
        </div>
      </h2>
      <ToolBox />
      <BlockDetails/>
    </div>

    <div class="wrapper shadow-inner">
      <PageBuilder />
      <PagePreview />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .title {
    display: flex;
    font-family: 'Varela Round', sans-serif;
    font-weight: 600;
    font-size: 40px;
    line-height: 42px;
    align-items: end;

    &--icon {
      width: 100px;
    }
    &--text {
      margin-bottom: 2px;
    }
  }
  .page {
    display: grid;
    width: 100%;
    grid-template-columns: 300px auto;

    & > div {
    }
  }

  .sidebar {
    background-color: lightblue;
    min-height: 100vh;
    padding: 1rem 2rem;
  }

  .wrapper {
    background-color: rgb(226, 226, 226);
    display: grid;
    grid-template-columns: 2fr 1fr;

    @media (max-width: 1024px) {
      display: flex;
      flex-direction: column;
    }
  }
</style>