<script setup lang="ts">
  import draggable from 'vuedraggable'
  import { TrashIcon, DocumentDuplicateIcon, PencilSquareIcon } from '@heroicons/vue/24/solid'
  import { BlockType } from '../types'
  import usePageData from '../composables/usePageData'

  const {
    pageRef,
    activeBlockRef,
    deleteBlock,
    duplicateBlock,
    enterEditMode,
  } = usePageData()
</script>

<template>
  <div class="page-builder shadow m-4">
    <draggable class="drop-zone"
              :list="pageRef"
              group="block"
              :options="{delay: 100}"
              ghost-class="tool-block--ghost"
              item-key="id">
      <template #item="{ element, index }">
        <div class="tool-block" :class="{'tool-block--active': element.id === activeBlockRef?.id}">
          <div class="tool-block--controls">
            <a @click="enterEditMode(element)"><PencilSquareIcon/></a>
            <a @click="duplicateBlock(index, element)"><DocumentDuplicateIcon/></a>
            <a @click="deleteBlock(index)"><TrashIcon/></a>
          </div>
          <div v-if="element.type === BlockType.Image" :style="{display: 'flex', justifyContent: element.align, opacity: element.opacity}">
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
  .builder-wrapper {
    background-color: rgb(231, 231, 231);
  }
  .page-builder {
    background-color: #fff;
    padding: 2rem;
    height: fit-content;
    margin: 2rem;

    .drop-zone {
      min-height: 60px;
      border: 2px dashed gray;
      padding: 10px;
      border-radius: 2px;

      .tool-block {
        position: relative;
        padding: 10px;
        border: 1px dashed rgba(128, 128, 128, 0.329);
        margin-bottom: -1px;
        text-align: center;
        cursor: pointer;

        &--controls {
          visibility: hidden;
          position: absolute;
          top: -14px;
          right: -50px;
          padding: 10px 10px 10px 20px;
          cursor: pointer;
          z-index: 1;
          transition: all 0.05s ease-in-out;
        }

        &--active {
          background-color: lightblue;
        }

        &:hover {
          background-color: lightblue;
          .tool-block--controls {
            visibility: visible;
          }
        }

        a {
          display: block;
          height: 20px;
          width: 20px;
          color: #7cc2d9;
          margin-bottom: 5px;
          cursor: pointer;
          transition: all 0.05s ease-in-out;

          &:hover {
            transform: scale(1.1);
          }
        }
      }
    }
  }
</style>