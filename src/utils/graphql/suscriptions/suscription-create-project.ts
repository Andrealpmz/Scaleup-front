import gql from 'graphql-tag';
import { useQuery, useSubscription } from '@vue/apollo-composable';

export const subscription_project_created = async (name : string) => {
    const { result: resultSuscription } = useSubscription(gql`
        suscription ($name: String!) {
          projectCreated(name: $name) {
            type
            name
          }
        }`, () => ({
          name: name
        })
    );
  
    return resultSuscription;
}
