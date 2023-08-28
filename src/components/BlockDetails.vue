<script setup lang="ts">
  import usePageData from '../composables/usePageData'
  import { BlockType, ImageBlock, TextBlock } from '../types'

  const {
    activeBlockRef,
  } = usePageData()

  const imageOptions: string[] = [
    'https://i.imgur.com/TOgy947.jpg',
    'https://i.imgur.com/0R14MHH.jpg',
    'https://i.imgur.com/jgdWjKL.jpg',
    'https://i.imgur.com/YCnz3Mk.jpg',
    'https://i.imgur.com/eRdGuFY.jpg'
  ]

  const selectImage = (url: string) => {
    if (activeBlockRef.value) {
      activeBlockRef.value.value = url
    }
  }
</script>

<template>
  <div v-if="activeBlockRef" class="details">
    <h3>Edit {{activeBlockRef.type}} block</h3>
    <template v-if="activeBlockRef.type === BlockType.Image">
      <div class="details--choose-image">
        <div>Image</div>
        <div class="details--image-selector">
          <template v-for="url in imageOptions">
            <img :src="url" alt="" @click="selectImage(url)" class="image" :class="{'image--active': url === activeBlockRef.value}">
          </template>
        </div>
      </div>
      <div class="details--width">
        <div>Width</div>
        <input type="range" min="100" max="800" v-model="(activeBlockRef as ImageBlock).width">
      </div>
      <div class="details--opacity">
        <div>Opacity</div>
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
      <div>Position</div>
      <input type="radio" id="left" value="Left" v-model="activeBlockRef.align" />
      <label for="left">Left</label>
      <input type="radio" id="center" value="center" v-model="activeBlockRef.align" />
      <label for="center">center</label>
      <input type="radio" id="right" value="right" v-model="activeBlockRef.align" />
      <label for="right">right</label>
    </div>
    <button class="button" @click="activeBlockRef = null">Done</button>
  </div>
</template>

<style scoped lang="scss">
  .details {
    textarea {
      width: 100%;
    }

    &--image-selector {
      .image {
        width: 40px;
        margin-right: 5px;
        cursor: pointer;

        &:hover,
        &--active {
          outline: 2px solid blue;
        }
      }
    }
  }
</style>