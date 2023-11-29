
import { createProject } from "../../DB/api";
import ProjectStore from '@src/stores/dataProject';
const dataProject = ProjectStore();

export const CreateProject = async () => {
    const celebration_day = new Date(dataProject.celebration_day);
    const deadline = new Date(dataProject.deadline);

    const data = {
        ...dataProject,
        celebration_day,
        deadline
    };

    if (dataProject.areas.length === 0) {
        dataProject.areas.push(1);
    }

    try {
        const newProject = await createProject(data);
        console.log('Nuevo proyecto creado:', newProject);
    } catch (error) {
        console.error('Error al crear el proyecto:', error);
    }
};