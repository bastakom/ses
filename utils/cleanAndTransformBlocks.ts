import { v4 as uuid } from 'uuid'

export const cleanAndTransformBlocks = (blocksJSON) => {
  if (!blocksJSON) {
    return []
  }

  const blocks = JSON.parse(blocksJSON)

  const assignID = (b) => {
    b.forEach((block) => {
      block.id = uuid()
      if (block.innerBlocks?.length) {
        assignID(block.innerBlocks)
      }
    })
  }
  assignID(blocks)

  return blocks
}

export const cleanAndTransformACFBlocks = (Builder) => {
  if (!Builder) {
    return []
  }

  return Builder.map((obj) => {
    return Object.assign({}, obj, { id: uuid() })
  })
}

export const cleanAndTransoformACFColumn = (Column) => {
  if (!Column) {
    return []
  }

  return Column.map((obj) => {
    return Object.assign({}, obj, { id: uuid() })
  })
}


