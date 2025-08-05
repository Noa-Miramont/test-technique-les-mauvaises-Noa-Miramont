export const PROJET_QUERY = /* GraphQL */ `
  query Projets($filters: ProjetFiltersInput) {
    projets(filters: $filters) {
      title
      slug
      years
      description
      lastWord
      url
    }
  }
`;

export const PROJET_BY_TITLE = /* GraphQL */ `
  query Projets($filters: ProjetFiltersInput) {
    projets(filters: $filters) {
      title
      years
      description
      lastWord
      url
      colors_connection { nodes { title hex } }
      police_connection { nodes { title policeName } }
      tags { tag }
    }
  }
`;