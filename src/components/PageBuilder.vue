<script setup lang="ts">
  import draggable from 'vuedraggable'
  import { BlockType } from '../types'
  import usePageData from '../composables/usePageData'

  const {
    pageRef,
    activeBlockRef,
    deleteBlock,
    duplicateBlock,
    editBlock,
  } = usePageData()
</script>

<template>
  <div class="page-builder">
    <h2>Drop zone</h2>
    <draggable class="drop-zone"
              :list="pageRef"
              group="block"
              :options="{delay: 100}"
              ghost-class="block--ghost"
              item-key="id">
      <template #item="{ element, index }">
        <div class="block" :class="{'block--active': element.id === activeBlockRef?.id}">
          <div class="block--controls">
            <a @click="editBlock(element)">Edit </a>
            <a @click="duplicateBlock(index, element)">Duplicate </a>
            <a @click="deleteBlock(index)">Delete</a>
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
</template>

<style scoped lang="scss">
  .page-builder {
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
          z-index: 1;
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
</style>