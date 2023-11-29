<script lang="ts" setup>
    import { ref, defineEmits, computed } from 'vue';
    import AutoComplete from 'primevue/autocomplete';
    import gql from 'graphql-tag';
    import { useQuery } from '@vue/apollo-composable';
    import { newRole } from '@src/utils/graphql/mutations/newRol';
    import { CreateMemberU } from '@src/utils/graphql/mutations/create-memberU';

    const emit = defineEmits(['close']);

    const closePopConfirm = () => {
        emit('close', boolMemberOut.value = false);
    };

    const boolMemberOut = ref(false);
    const noResults = ref(false);
    const showAdd = ref(false);
    const showCustomInput = ref(false);
    const filteredItems = ref<string[]>([]);
    const customItem = ref('');
    const rol = ref('');
    const name = ref('');
    const last_name= ref('');
    const email = ref('');
    const value = ref("");

    const addCustomItem = (event: MouseEvent) => {
        showCustomInput.value = true;
        event.stopPropagation();
    };

    const { result: rolesResult, refetch } = useQuery(gql`
        query {
            getAllRoles {
                id
                name
            }
        }
    `);

    const roles = computed(() => {
        if (rolesResult.value && rolesResult.value.getAllRoles) {
            return rolesResult.value.getAllRoles;
        } else {
            return [];
        }
    });

    const search = (event: any) => {
        const query = event.query.toLowerCase();
        filteredItems.value = roles.value
            .filter((item: { name: string, id: number }) =>
                item.name.toLowerCase().includes(query)
            )
            .map((item: { name: string, id: number }) => item.name);

        if (filteredItems.value.length === 0) {
            noResults.value = true;
            filteredItems.value.push('');
        } else {
            noResults.value = false;
        }

        if (query !== '') {
            showAdd.value = true;
        }
    };

    const addItem = async () => {
        if (customItem.value !== '') {
            await newRole(customItem.value);
            await refetch();

            filteredItems.value = roles.value.map((item: any) => item.name);

            rol.value = customItem.value;
            showCustomInput.value = false;
        }
    };

    const ignoreAddItem = (event: MouseEvent) => {
        showAdd.value = true;
        showCustomInput.value = false;
        event.stopPropagation();
        customItem.value = '';
    }

    const handleSelect = (option: string) => {
        if (showAdd.value !== true) {
            value.value = option;
        }
    };

    const addMemberOut = async () => {
        const roleId = roles.value.find((item: any) => item.name === rol.value)?.id;
        await CreateMemberU(name.value, last_name.value, email.value, roleId);
        closePopConfirm();
    }
</script>

<template>
    <div class="popConfirm">
        <div class="dialogMember">
            <button @click="closePopConfirm" class="btnCloseDialogMember"><img class="btnDelete" draggable="false" src="@assets/svg/close.svg"></button>
            <div class="contentDialogMember">
                <div class="formMember">
                    <div class="titleMemberForm">
                        <h2 class="">Añadir miembro externo</h2>
                    </div>
                    <div class="colRow2Member">
                        <div class="data">
                            <label class="form-label">Nombre<span class="required">*</span></label>
                            <input v-model="name" type="text" class="inputFormMember">
                        </div>
                        <div class="data">
                            <label class="form-label">Apellido<span class="required">*</span></label>
                            <input v-model="last_name" type="text" class="inputFormMember">
                        </div>
                    </div>
                    <div class="data">
                        <label class="form-label">Email<span class="required">*</span></label>
                        <input v-model="email" type="email" class="inputFormMember">
                    </div>
                    <div class="data">
                        <label class="form-label">Rol<span class="required">*</span></label>
                        <AutoComplete id="rolAutocomplete" v-model="rol" :suggestions="filteredItems" @complete="search" @select="handleSelect" >
                            <template #option> 
                                <div v-if="noResults === true" class="custom-input-container p-disabled">
                                    <span class="no-results">No se encontraron resultados</span>
                                </div>
                            </template>
                            <template #footer>
                                <button v-if="showAdd === true && !showCustomInput" @click="addCustomItem" class="btnOpenInput">Agregar nuevo rol</button>
                                <div v-else-if="showCustomInput === true" class="inputAdd">
                                    <input v-model="customItem" placeholder="Escribe el rol" class="custom-input" />
                                    <button @click="ignoreAddItem" class="cancelAdd">cancelar</button>
                                    <button @click="addItem">Agregar</button>
                                </div>
                            </template>
                        </AutoComplete>
                    </div>
                    <div class="buttonMemberAdd">
                        <button @click="addMemberOut">Agregar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import url('./../NewProject.scss');
</style>