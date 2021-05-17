/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const get = /* GraphQL */ `
  query Get($id: String) {
    get(id: $id)
  }
`;
export const listCrossStackReferences = /* GraphQL */ `
  query ListCrossStackReferences {
    listCrossStackReferences {
      stack
      name
      value
      imports
    }
  }
`;
export const parseJwt = /* GraphQL */ `
  query ParseJwt {
    parseJwt {
      at_hash
      sub
      cognito_groups
      email_verified
      iss
      cognito_username
      aud
      identities {
        userId
        providerName
        providerType
        issuer
        primary
        dateCreated
      }
      token_use
      auth_time
      exp
      iat
      email
    }
  }
`;
