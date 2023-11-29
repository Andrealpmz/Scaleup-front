import { defineStore } from 'pinia';

export default defineStore('dataProject', {
    state: () => ({ 
        id_org: 1,
        name: "",
        type: "",
        areas: [] as number[],
        celebration_day: "0000-01-01T00:00:00.000Z",
        deadline: "0000-01-01T00:00:00.000Z",
        leader_email: null,
        description: "",
        objGeneral: "",
        objSpecifics: [] as string[],
        budget: 0,
        software: "",
        state: "borrador",
        image: null,
    }),
    actions: {
        addObjSpecific(dataSpecific: string) {
            this.objSpecifics.push(dataSpecific);
        },

        addCelebrationDay(date: Date) {
            const isoDate = date.toISOString();
            this.celebration_day = isoDate;
        },

        addDeadline(date: Date) {
            const isoDate = date.toISOString();
            this.deadline = isoDate;
        }
    }
})