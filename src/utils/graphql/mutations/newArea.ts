import { assignArea, getAllArea } from "../../DB/api";
import Area from "../../interfaces/area";

export const newArea = async (customItem : string) => {
    const Allareas = await getAllArea("Project");
    const maxId = Math.max(...Allareas.map((area : any) => area.id));
    const area: Area = {
        id: maxId + 1,
        type: "Project",
        name: customItem,
    };

    await assignArea(area);
}