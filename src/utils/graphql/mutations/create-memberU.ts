import { getAllUsers, insertUser } from "../../DB/api";

export const CreateMemberU = async (name: string, last_name: string, email: string, role_id: number) => {
    const Allusers = await getAllUsers();
    const maxId = Math.max(...Allusers.map((user : any) => user.id));
    const data = {
        id: maxId + 1,
        name,
        last_name,
        email,
        role_id
    };

    try {
        const newUser = await insertUser(data);
        console.log('Nuevo usuario creado:', newUser);
    } catch (error) {
        console.error('Error al crear el usuario:', error);
    }
}