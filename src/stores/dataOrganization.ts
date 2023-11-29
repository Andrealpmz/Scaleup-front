import { defineStore } from 'pinia';

export default defineStore('dataOrganization', {
    state: () => ({ 
        nit: '',
        name_org: '',
        type: '',
        name: '',
        last_name: '',
        email: '',
        phone: '',
        country: 1,
        city: 1,
        password: '',
    })
})
