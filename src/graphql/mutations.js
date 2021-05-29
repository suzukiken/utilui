/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateFiction = /* GraphQL */ `
  mutation UpdateFiction($input: FictionInput) {
    updateFiction(input: $input) {
      id
      sku
      name
      pcs
      ship
    }
  }
`;
export const deleteFiction = /* GraphQL */ `
  mutation DeleteFiction($id: String) {
    deleteFiction(id: $id) {
      id
      sku
      name
      pcs
      ship
    }
  }
`;
export const batchDeleteFictions = /* GraphQL */ `
  mutation BatchDeleteFictions($ids: [String]) {
    batchDeleteFictions(ids: $ids) {
      id
    }
  }
`;
export const batchPutFictions = /* GraphQL */ `
  mutation BatchPutFictions($fictions: [FictionInput]) {
    batchPutFictions(fictions: $fictions) {
      id
      sku
      name
      pcs
      ship
    }
  }
`;
export const putEvent = /* GraphQL */ `
  mutation PutEvent($message: String) {
    putEvent(message: $message) {
      message
    }
  }
`;
export const updateBlogLank = /* GraphQL */ `
  mutation UpdateBlogLank($input: LankInput) {
    updateBlogLank(input: $input) {
      id
      title
      content
      category
      tags
      date
      lank
      highlight {
        title
        content
        category
        tags
      }
    }
  }
`;
