export enum BlockType {
  Text = 'text',
  Image = 'image'
}

interface BasicBlock {
  id?: number
  type: string,
  value: string,
}

export interface TextBlock extends BasicBlock {
  fontSize: number
  fontWeight: number
}

export interface ImageBlock extends BasicBlock {
  width: number | string
  opacity: number
}

export type Block = TextBlock | ImageBlock
