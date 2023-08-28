<script setup lang="ts">
  import usePageData from '../composables/usePageData'
  import { BlockType, ImageBlock, TextBlock } from '../types'

  const {
    activeBlockRef,
    exitEditMode,
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
  <div v-if="activeBlockRef" class="control-group mt-8">
    <h3 class="text-md">Edit {{activeBlockRef.type}} block</h3>
    <template v-if="activeBlockRef.type === BlockType.Image">
      <div class="mt-2">
        <label for="image-selector" class="block mb-2 text-sm font-medium text-gray-900">Choose image</label>
        <div id="image-selector" class="grid grid-cols-5 gap-1">
          <template v-for="url in imageOptions">
            <img :src="url" alt="" @click="selectImage(url)" class="outline-blue-600 cursor-pointer hover:outline hover:outline-2" :class="{'outline outline-2': url === activeBlockRef.value}">
          </template>
        </div>
      </div>
      <div class="mt-4">
        <label for="width" class="block mb-2 text-sm font-medium text-gray-900">width</label>
        <input id="width" type="range" min="100" max="800" v-model="(activeBlockRef as ImageBlock).width">
      </div>
      <div class="mt-4">
        <label for="opacity" class="block mb-2 text-sm font-medium text-gray-900">Opacity</label>
        <input id="opacity" type="range" min="0" max="1" step="0.01" v-model="(activeBlockRef as ImageBlock).opacity">
      </div>
    </template>
    <template v-else>
      <div class="mt-2">
        <textarea name="" id="" rows="3" v-model="activeBlockRef.value"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-600 focus:border-blue-600"></textarea>
      </div>
      <div class="mt-4">
        <label for="font-size" class="block mb-2 text-sm font-medium text-gray-900">Font size</label>
        <input id="font-size" class="w-full" type="range" min="6" max="36" v-model="(activeBlockRef as TextBlock).fontSize">
      </div>
      <div class="mt-4">
        <label for="font-weight" class="block mb-2 text-sm font-medium text-gray-900">Font weight</label>
        <input id="font-weight" class="w-full" type="range" min="100" max="900" step="100" v-model="(activeBlockRef as TextBlock).fontWeight">
      </div>
    </template>
    <div class="mt-4">
      <label for="align" class="block mb-2 text-sm font-medium text-gray-900">Position</label>
      <ul class="grid w-full md:grid-cols-3">
        <li v-for="(position, index) in ['left', 'center', 'right']">
            <input type="radio" :id="position" v-model="activeBlockRef.align" :value="position" class="hidden peer" required>
            <label :for="position" :class="{'rounded-l-lg': index === 0, 'rounded-r-lg': index === 2}"
                   class="inline-flex items-center justify-center w-full p-3 py-1 text-gray-500 bg-white border border-gray-200 cursor-pointer peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">                           
                <div class="block">
                  {{ position }}
                </div>
            </label>
        </li>
      </ul>
    </div>
    <div class="flex justify-center mt-4">
      <button class="btn mt-2" @click="exitEditMode()">Done</button>
    </div>
    
  </div>
</template>

<style scoped lang="scss">
</style>