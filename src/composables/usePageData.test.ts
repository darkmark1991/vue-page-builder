import { describe, expect, test } from 'vitest'
import usePageData from './usePageData'
import { BlockType } from '../types'

const {
  pageRef,
  activeBlockRef,
  addBlock,
  editBlock,
  duplicateBlock,
  deleteBlock,
  setPageData
} = usePageData()

describe('Test usePageData composable', () => {
  test('Set data from json', () => {
    setPageData(`[{"type":"text","value":"Imported text","fontSize":14,"fontWeight":400,"align":"center","id":1},{"type":"image","value":"https://i.imgur.com/clDASIr.png","width":400,"opacity":1,"align":"center","id":2}]`)

    expect(pageRef.value?.length).toEqual(2)
    expect(pageRef.value?.[0].value).toEqual('Imported text')
    expect(pageRef.value?.[0].id).toEqual(1)
    expect(pageRef.value?.[0].type).toEqual(BlockType.Text)
    expect(pageRef.value?.[1].id).toEqual(2)
    expect(pageRef.value?.[1].type).toEqual(BlockType.Image)
  })

  test('Add text block', () => {
    addBlock({
      type: BlockType.Text,
      value: 'Block added by addBlock',
      fontSize: 14,
      fontWeight: 400,
      align: 'center'
    })

    expect(pageRef.value?.length).toEqual(3)
    expect(pageRef.value?.[pageRef.value?.length - 1].id).toEqual(3)
    expect(pageRef.value?.[pageRef.value?.length - 1].value).toEqual('Block added by addBlock')
    expect(pageRef.value?.[pageRef.value?.length - 1].type).toEqual(BlockType.Text)
  })

  test('Add image block', () => {
    addBlock({
      type: BlockType.Image,
      value: 'https://i.imgur.com/clDASIr.png',
      width: 400,
      opacity: 1,
      align: 'center'
    })

    expect(pageRef.value?.length).toEqual(4)
    expect(pageRef.value?.[pageRef.value?.length - 1].id).toEqual(4)
    expect(pageRef.value?.[pageRef.value?.length - 1].type).toEqual(BlockType.Image)
  })

  test('Edit block', () => {
    editBlock(pageRef.value?.[2])

    expect(activeBlockRef.value?.id).toEqual(pageRef.value?.[2].id)
    expect(activeBlockRef.value?.value).toEqual(pageRef.value?.[2].value)

    activeBlockRef.value && (activeBlockRef.value.value = 'this has been doctored with')
    expect(pageRef.value?.[2].value).toEqual('this has been doctored with')
  })

  test('Duplicate block', () => {
    duplicateBlock(1, pageRef.value?.[1])

    expect(pageRef.value?.length).toEqual(5)
    expect(pageRef.value?.[2].value).toEqual(pageRef.value?.[1].value)
    expect(pageRef.value?.[2].id).to.not.equal((pageRef.value?.[1].id))
  })

  test('Delete block', () => {
    deleteBlock(2)

    expect(pageRef.value?.length).toEqual(4)
  })
})