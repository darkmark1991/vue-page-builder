<script setup lang="ts">
  import { Ref, ref } from 'vue'
  import draggable from 'vuedraggable'

  interface Block {
    type: string,
    value: string,
  }

  const availableBlocks: Ref<Block[]> = ref([
    {
      type: 'text',
      value: 'Text',
    },
    {
      type: 'image',
      value: 'Image',
    },
  ])

  const pageRef: Ref<Block[]> = ref([])

  const exportJson = () => {
    // Landing page data like text content, links to images, block order, etc.
    // should be exported to JSON format when the user clicks the “Save” button
  }

  const editBlock = (index: number) => {
    //
  }

  const duplicateBlock = (index: number) => {
    //
  }

  const deleteBlock = (index: number) => {
    //
  }
</script>

<template>
  <div class="page">
    <div class="sidebar">
      <h2>Page Builder</h2>
      <div class="controls">
        <button @click="exportJson()">Save</button>
      </div>
      <div class="available-blocks">
        <h2>Available blocks</h2>
        <draggable class="drag-zone"
                  :list="availableBlocks"
                  :group="{ name: 'tool', pull: 'clone', put: false, move: false }"
                  item-key="type">
          <template #item="{ element }">
            <div class="block" :class="`block--${element.type}`">
              {{ element.value }}
            </div>
          </template>
        </draggable>
      </div>
    </div>
    <div class="page-builder">
      <h2>Drop zone</h2>
      <draggable class="drop-zone"
                :list="pageRef"
                group="tool"
                item-key="type">
        <template #item="{ element }">
          <div class="block" :class="`block--${element.type}`">
            <div class="block--controls">
              <a @click="editBlock(index)">Edit </a>
              <a @click="duplicateBlock(index)">Duplicate </a>
              <a @click="deleteBlock(index)">Delete </a>
            </div>
            {{ element.value }}
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  display: grid;
  grid-template-columns: 400px auto;
}

.sidebar {
  background-color: lightblue;
  padding: 1rem 2rem;
}
.available-blocks {
  .block {
    text-align: center;
    padding: 5px;
    border: 1px dashed gray;
  }
}

.page-builder {
  padding: 1rem 2rem;
  .drop-zone {
    min-height: 40px;
    border: 1px dashed gray;
    padding: 5px;

    .block {
      padding: 5px;
      border: 1px dashed gray;
    }
  }
}
</style>
