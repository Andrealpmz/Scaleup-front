import { createRol } from "../../DB/api";
import Role from "../../interfaces/role";

export const newRole = async (customItem : string) => {
    const role: Role = {
        name: customItem,
        active: true,
    };

    await createRol(role);
}