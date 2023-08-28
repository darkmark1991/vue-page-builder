<script setup lang="ts">
  import { Ref, ref } from 'vue'
  import draggable from 'vuedraggable'
  import usePageData from '../composables/usePageData'
  import { Block, BlockType } from '../types'

  const {
    cloneBlock,
    getDataJson,
    setPageData
  } = usePageData()

  const availableBlocks: Ref<Block[]> = ref([
    {
      type: BlockType.Text,
      value: 'Lorem ipsum',
      fontSize: 14,
      fontWeight: 400,
      align: 'center'
    },
    {
      type: BlockType.Image,
      value: 'https://i.imgur.com/clDASIr.png',
      width: 400,
      opacity: 1,
      align: 'center'
    },
  ])

  const exportJson = () => {
    const dataStr = getDataJson()
    const a = document.createElement('a')
    a.setAttribute('href', dataStr)
    a.setAttribute('download', 'export.json')
    a.click()
  }

  const importJson = (event: any) => {
    const fr = new FileReader()
    fr.onload = (e) => {
      if (e.target?.result) {
        setPageData(e.target.result as string)
      }
    }
    fr.readAsText(event.target.files.item(0))
  }
</script>

<template>
  <div class="controls">
    <label class="button">
        <input type="file" @change="importJson"/>
        Open
    </label>
    <button class="button" @click="exportJson()">Save</button>
  </div>
  <div class="available-blocks">
    <h3>Available blocks</h3>
    <draggable class="drag-zone"
              :list="availableBlocks"
              :group="{ name: 'block', pull: 'clone', put: false, move: false }"
              :clone="cloneBlock"
              :sort="false"
              item-key="type">
      <template #item="{ element }">
        <div class="block" :class="`block--${element.type}`">
          <template v-if="element.type === BlockType.Image">
            <img src="../assets/image_placeholder.png" alt="">
          </template>
          <template v-else>
            Text
          </template>
        </div>
      </template>
    </draggable>
  </div>
</template>

<style scoped lang="scss">
  .controls {
    display: flex;

    input[type="file"] {
      display: none;
    }
    .button {
      margin-right: 5px;
    }
  }
  .block {
    text-align: center;
    padding: 5px;
    background-color: #fff;
    border: 1px dashed gray;
    margin-bottom: 1rem;
    cursor: pointer;

    &--image {
      padding: 20px;
      img {
        width: 80px;
      }
    }

    &:hover {
      opacity: 0.8;
      border-color: blue;
    }
    &--ghost {
      margin: 5px;
      background-color: lightblue;
    }
  }
</style>