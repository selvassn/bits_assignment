import { GraphQLClient, gql } from "graphql-request";
import { useQuery } from "react-query";
import React from 'react'
import { ICharacterFilter } from "../interface/ICharacters";

const url: string = "https://rickandmortyapi.com/graphql"; //process.env.API_URL!;

const graphQLClinent = new GraphQLClient(url);

const characterQuery = gql`
query MyQuery($search: String) {
  characters(filter: {name: $search}) {
    info {
      count
    }
    results {
      id
      name
      status
      image
      gender
      created
      episode {
        name
      }
      origin {
        id
        name
      }
    }
  }
}
`
const getCharacters = async(search: String) => {
  const variables = {
    search: search
  }
  const { characters } = await graphQLClinent.request(characterQuery, variables);
  return characters;
}

export function useGetCharacters(isEnabled: boolean, search: ICharacterFilter) {
  return useQuery(["get-characters", search], async () => getCharacters(search.name), {enabled: isEnabled});
}