import ProjectStoreOut from '@src/stores/dataProjectTeam';
import ProjectStore from '@src/stores/dataProject';
import { AssignTeam } from '../../DB/api';
const dataProject = ProjectStore();
const dataProjectOut = ProjectStoreOut();
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

export const CreateTeam = async () => {
    const organization_id = dataProject.id_org;
    const users = dataProjectOut.team;
    const nameProject = dataProject.name;
    const { result } = useQuery(gql`query { getAllProjects(id_org: 1) { id name id_org } }`);
    const project_id = result.value?.getAllProjects.find((project : any) => project.name === nameProject)?.id;
    
    const dataList = users.map((user) => {
        return {
            project_id,
            organization_id,
            user_id: user.user_id,
            role_id: user.role_id,
            status: true,
        };
    });

    for (const data of dataList) {
        try {
            const newProject = await AssignTeam(data);
            console.log('Nuevo proyecto creado:', newProject);
        } catch (error) {
            console.error('Error al crear el proyecto:', error);
        }
    }
}