import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

export const create_project_jira = async (name: string, key: string, desc: string, org_id: number, token: any, cloud_id: any) =>  {

    const { mutate: createProject } = useMutation(gql`
            mutation createProject($input: CreateProjectDTO!){
                createProject(input: $input){
                    name
                }
            }
        `, () => ({
            variables: {
                input: {
                    name: name,
                    key: key,
                    description: desc,
                    org_id: org_id,
                    token: token,
                    cloud_id: cloud_id
                }
            }
        })
    )

    try {
        const response = await createProject();
        console.log('Nuevo proyecto en jira:', response);
    } catch (error) {
        console.error('Error al crear el proyecto en jira:', error);
    }
}