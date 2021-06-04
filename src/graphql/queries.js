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
export const listFictions = /* GraphQL */ `
  query ListFictions {
    listFictions {
      id
      sku
      name
      pcs
      ship
    }
  }
`;
export const searchProduct = /* GraphQL */ `
  query SearchProduct($title: String!) {
    searchProduct(title: $title) {
      id
      title
    }
  }
`;
export const searchProductPhrase = /* GraphQL */ `
  query SearchProductPhrase($title: String!) {
    searchProductPhrase(title: $title) {
      id
      title
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts {
    listProducts {
      id
      title
    }
  }
`;
export const searchBlogs = /* GraphQL */ `
  query SearchBlogs($input: WordInput) {
    searchBlogs(input: $input) {
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
export const getArticle = /* GraphQL */ `
  query GetArticle($id: String) {
    getArticle(id: $id) {
      id
      content
      date
      tags
      title
    }
  }
`;
export const listArticles = /* GraphQL */ `
  query ListArticles($limit: Int) {
    listArticles(limit: $limit) {
      id
      content
      date
      tags
      title
    }
  }
`;
export const searchArticles = /* GraphQL */ `
  query SearchArticles($word: String) {
    searchArticles(word: $word) {
      id
      content
      date
      tags
      title
    }
  }
`;
export const listMails = /* GraphQL */ `
  query ListMails {
    listMails {
      key
      modified
      size
    }
  }
`;
export const getMail = /* GraphQL */ `
  query GetMail($id: String) {
    getMail(id: $id)
  }
`;
export const getParams = /* GraphQL */ `
  query GetParams($content: String) {
    getParams(content: $content)
  }
`;
