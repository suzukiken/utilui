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
