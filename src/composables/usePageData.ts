import { Ref, ref } from 'vue'
import { Block } from '../types'

const pageRef: Ref<Block[]> = ref([])
const activeBlockRef: Ref<Block | null> = ref(null)

const idGen = (function() {
  let id = 0
  return () => ++id
})()

export default function usePageData() {
  // when a block is created it should get unique id
  const cloneBlock = (block: Block) => ({...block, id: idGen()})

  const addBlock = (block: Block) => {
    pageRef.value.push(cloneBlock(block))
  }
  const editBlock = (block: Block) => {
    activeBlockRef.value = block
  }

  const duplicateBlock = (index: number, block: Block) => {
    const newBlock = cloneBlock(block)
    console.log('>>>', newBlock)
    pageRef.value.splice(index + 1, 0, newBlock)
  }

  const deleteBlock = (index: number) => {
    pageRef.value.splice(index, 1)
  }

  const getDataJson = () => {
    return 'data:text/json;charset=utf-8' + encodeURIComponent(JSON.stringify(pageRef.value))
  }

  const setPageData = (data: Block[]) => {
    pageRef.value = data
  }

  return {
    pageRef,
    activeBlockRef,
    cloneBlock,
    addBlock,
    editBlock,
    duplicateBlock,
    deleteBlock,
    getDataJson,
    setPageData
  }
}