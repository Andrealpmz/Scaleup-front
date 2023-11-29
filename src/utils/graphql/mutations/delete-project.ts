import { deleteProject } from "../../DB/api";

export const delete_project = async (id: number) => {
    try {
        await deleteProject(id);
    } catch (error) {
        console.error('Error al eliminar el proyecto:', error);
    }
}