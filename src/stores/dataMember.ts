import { defineStore } from 'pinia';

export default defineStore('dataMember', {
    state: () => ({ 
        id_org: '',
        name: '',
        last_name: '',
        email: '',
        phone: '',
        country: 1,
        city: 1,
        password: '',
    })
})