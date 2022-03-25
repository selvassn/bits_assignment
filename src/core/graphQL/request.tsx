import { GraphQLClient, gql } from "graphql-request";
import { useQuery } from "react-query";

const url: string = "https://rickandmortyapi.com/graphql"; //process.env.API_URL!;

const graphQLClinent = new GraphQLClient(url);

export function useGetCharacters() {
  return useQuery("get-characters", async () => {
    const { characters } = await graphQLClinent.request(gql`
      query {
        characters {
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
    `);
    return characters;
  });
}
