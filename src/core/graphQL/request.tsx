import { GraphQLClient, gql } from "graphql-request";
import { useQuery } from "react-query";
import APP_CONST from "../constants/app-constants";
import { ICharacterFilter } from "../interface/ICharacters";

const url: string = APP_CONST.URL;

const graphQLClinent = new GraphQLClient(url);

const characterQuery = gql`
  query MyQuery($name: String, $gender: String) {
    characters(filter: { name: $name, gender: $gender }) {
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
`;

const characterDetailsQuery = gql`
  query MyQuery($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      image
      gender
      type
      location {
      name
    }
      episode {
        id
        name
      }
    }
  }
`;

const getCharacters = async (search: ICharacterFilter) => {
  const variables = {
    name: search.name,
    gender: search.gender,
  };
  const { characters } = await graphQLClinent.request(
    characterQuery,
    variables
  );
  return characters;
};

const getCharacterDetails = async (id: number) => {
  const variables = {
    id: id,
  };
  const { character } = await graphQLClinent.request(
    characterDetailsQuery,
    variables
  );
  return character;
};

export function useGetCharacters(isEnabled: boolean, search: ICharacterFilter) {
  return useQuery(
    ["get-characters", search],
    async () => getCharacters(search),
    { enabled: isEnabled, cacheTime:0 }
  );
}

export function useGetCharacterDetails(id: number) {
  return useQuery(["get-characters", id], async () => getCharacterDetails(id));
}
