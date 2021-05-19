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
