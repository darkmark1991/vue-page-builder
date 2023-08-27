<script setup lang="ts">
  import { Ref, ref } from 'vue'
  import draggable from 'vuedraggable'
  import { Block, BlockType, ImageBlock, TextBlock } from './types';

  const imageOptions: string[] = [
    'https://i.imgur.com/TOgy947.jpg',
    'https://i.imgur.com/0R14MHH.jpg',
    'https://i.imgur.com/jgdWjKL.jpg',
    'https://i.imgur.com/YCnz3Mk.jpg',
    'https://i.imgur.com/eRdGuFY.jpg'
  ]

  const activeBlockRef: Ref<Block | null> = ref(null)

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

  const pageRef: Ref<Block[]> = ref([])

  const idGen = (function() {
    let id = 0
    return () => id++
  })()

  // when a block is created it should get unique id
  const cloneBlock = (block: Block) => ({...block, id: idGen()})

  const exportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pageRef.value));
    const a = document.createElement('a')
    a.setAttribute('href', dataStr)
    a.setAttribute('download', 'export.json')
    a.click()
  }

  const editBlock = (block: Block) => {
    activeBlockRef.value = block
  }

  const duplicateBlock = (index: number, block: Block) => {
    pageRef.value.splice(index + 1, 0, cloneBlock(block))
  }

  const deleteBlock = (index: number) => {
    pageRef.value.splice(index, 1)
  }

  const selectImage = (url: string) => {
    if (activeBlockRef.value) {
      activeBlockRef.value.value = url
    }
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
                <img src="./assets/image_placeholder.png" alt="">
              </template>
              <template v-else>
                Text
              </template>
            </div>
          </template>
        </draggable>
      </div>
      <div v-if="activeBlockRef" class="details">
        <h3>Edit {{activeBlockRef.type}} block</h3>
        <template v-if="activeBlockRef.type === BlockType.Image">
          <div class="details--choose-image">
            <div>Image</div>
            <div class="details--image-selector">
              <template v-for="url in imageOptions">
                <img :src="url" alt="" @click="selectImage(url)">
              </template>
            </div>
          </div>
          <div class="details--width">
            <input type="range" min="100" max="800" v-model="(activeBlockRef as ImageBlock).width">
          </div>
          <div class="details--opacity">
            <input type="range" min="0" max="1" step="0.01" v-model="(activeBlockRef as ImageBlock).opacity">
          </div>
        </template>
        <template v-else>
          <div class="details--text">
            <div>Text</div>
            <textarea name="" id="" rows="5" v-model="activeBlockRef.value"></textarea>
          </div>
          <div class="details--font-size">
            <div>Font size</div>
            <input type="range" min="6" max="36" v-model="(activeBlockRef as TextBlock).fontSize">
          </div>
          <div class="details--font-weight">
            <div>Font weight</div>
            <input type="range" min="100" max="900" step="100" v-model="(activeBlockRef as TextBlock).fontWeight">
          </div>
        </template>
        <div class="details--align">
          <div>Position:</div>
          <input type="radio" id="left" value="Left" v-model="activeBlockRef.align" />
          <label for="left">Left</label>
          <input type="radio" id="center" value="center" v-model="activeBlockRef.align" />
          <label for="center">center</label>
          <input type="radio" id="right" value="right" v-model="activeBlockRef.align" />
          <label for="right">right</label>
        </div>
        <button @click="activeBlockRef = null">Done</button>
      </div>
    </div>
    <div class="page-builder">
      <h2>Drop zone</h2>
      <draggable class="drop-zone"
                :list="pageRef"
                group="block"
                item-key="id">
        <template #item="{ element, index }">
          <div class="block" :class="{'block--active': element.id === activeBlockRef?.id}">
            <div class="block--controls">
              <a @click="editBlock(element)">Edit </a>
              <a @click="duplicateBlock(index, element)">Duplicate </a>
              <a @click="deleteBlock(index)">Delete </a>
            </div>
            <div v-if="element.type === BlockType.Image" :style="{textAlign: element.align, opacity: element.opacity}">
              <img :src="element.value" alt="" :width="element.width">
            </div>
            <div v-else :style="{textAlign: element.align, fontSize: `${element.fontSize}px`, fontWeight: element.fontWeight, color: element.color}">
              {{ element.value }}
            </div>
          </div>
        </template>
      </draggable>
    </div>

    <div class="preview">
      <h2>JSON structure</h2>
      <pre>{{ JSON.stringify(pageRef, null, 2) }}</pre>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  display: grid;
  grid-template-columns: 300px 2fr 1fr;
}

.sidebar {
  background-color: lightblue;
  padding: 1rem 2rem;
  min-height: 100vh;
}
.preview {

  padding: 1rem 2rem;
}
.available-blocks {
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
  }
}

.page-builder {
  padding: 1rem 2rem;
  .drop-zone {
    min-height: 40px;
    border: 2px dashed gray;
    padding: 5px;

    .block {
      position: relative;
      padding: 10px;
      margin: 5px;
      border: 1px dashed gray;
      text-align: center;
      cursor: pointer;

      &--controls {
        visibility: hidden;
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
      }

      &:hover,
      &--active {
        background-color: lightblue;
        .block--controls {
          visibility: visible;
        }
      }
    }
  }
}
.details {
  textarea {
    width: 100%;
  }

  &--image-selector {
    img {
      width: 40px;
      margin-right: 5px;
      cursor: pointer;

      &:hover {
        outline: 2px solid blue;
      }
    }
  }
}
</style>
