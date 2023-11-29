import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

// const getAllProjectsQuery = gql`
//   query getAllProjects($idOrg: Float!) {
//     getAllProjects(id_org: $idOrg) {
//       id
//       name
//       type
//       areas
//       celebration_day
//       deadline
//       description
//       objGeneral
//       objSpecifics
//       budget
//       duration
//       software
//       state
//       leader_email
//       id_org
//     }
//   }
// `;

export const get_all_projects = async (idOrg : number) => {
  const { result } = useQuery(gql`
      query ($org_id: Int!) {
        getAllProjects(org_id: $org_id) {
          name
        }
      }`, () => ({
        org_id: idOrg
      })
  );

  return result;
}
