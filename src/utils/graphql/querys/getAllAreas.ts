import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';

export const get_all_areas = async (type : string) => {
    const { result: resultAreas } = useQuery(gql`
        query ($type: String!) {
          getAllAreas(type: $type) {
            id
            name
          }
        }`, () => ({
          type: type
        })
    );
  
    return resultAreas;
}
