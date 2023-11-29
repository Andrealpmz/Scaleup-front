import { defineStore } from 'pinia';

export default defineStore('dataProjectOut', {
    state: () => ({ 
        booleanBudget: '',
        booleanArea: '',
        booleanCelebration: '',
        booleanDeadline: '',
        team: [] as { user_id: number, role_id: number }[]
    })
})