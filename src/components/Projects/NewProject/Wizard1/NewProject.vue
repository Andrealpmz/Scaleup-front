<script setup lang="ts">
    import { ref, defineEmits, onMounted, watch, watchEffect, nextTick } from 'vue';
    import ProjectStore from '@src/stores/dataProject';
    import ProjectOutStore from '@src/stores/dataProjectTeam';
    import Calendar from 'primevue/calendar';
    import AutoComplete from 'primevue/autocomplete';
    import CascadeSelect from 'primevue/cascadeselect';
    import InputNumber from 'primevue/inputnumber';
    import { useRouter } from 'vue-router';
    import { CreateProject } from '@src/utils/graphql/mutations/createProject';
    import { newArea } from '@src/utils/graphql/mutations/newArea';
    import Area from '@src/utils/interfaces/area';
    import { gql } from '@apollo/client/core';
    import { useQuery } from '@vue/apollo-composable';

    import "primevue/resources/primevue.min.css";
    import "primevue/resources/themes/lara-light-indigo/theme.css";  

    const idOrg = ref<number>(1);

    const { result } = useQuery(gql`
        query ($org_id: Int!) {
            getAllProjects(org_id: $org_id) {
                name
            }
        }`, () => ({
            org_id: idOrg.value
        })
    );
    
    const projects = result.value?.data?.getAllProjects || [];

    const { result: resultAreas, refetch } = useQuery(gql`
        query {
            getAllAreas(type: "Project") {
                id
                name
            }
        }
    `);

    const router = useRouter();
    const areas = ref<Area[]>([]);
    const autoComplete = ref();
    const dateCelebration = ref<Date | undefined>(undefined);
    const dateDeadline = ref<Date | undefined>(undefined);
    const captureArea = ref<string[]>([]);
    const selectedAreaIds = ref<(number | null)[]>([]);
    const dataProject = ProjectStore();
    const dataProjectOut = ProjectOutStore();
    const submitted = ref(false);
    const minDate = new Date();
    const fechaSelected = ref(false);
    const minDate2 = ref<Date>();
    const wizardStep = ref(1);
    const selectType = ref();
    const divisa = ref('COP');
    const value = ref("");
    const filteredItems = ref<string[]>([]);
    const noResults = ref(false);
    const showAdd = ref(false);
    const showCustomInput = ref(false);
    const customItem = ref('');
    const booleanCancel = ref(false);

    watchEffect(async () => {
        if (resultAreas.value && resultAreas.value.getAllAreas) {
            areas.value = resultAreas.value.getAllAreas.map((item: { id: number, name: string }) => ({ name: item.name, id: item.id }));
        }
    });

    const emit = defineEmits(['StepActual']);

    watchEffect(() => {
        if (selectType.value) {
            dataProject.type = selectType.value.value;
        }
    });

    watchEffect(() => {
        const selectedAreaNames = Array.isArray(captureArea.value) ? captureArea.value : [captureArea.value];
        selectedAreaIds.value = selectedAreaNames.map((name: string) => {
            const selectedArea = areas.value.find((area) => area.name === name);
            return selectedArea ? selectedArea.id : null;
        });
    });

    watchEffect(() => {
        dataProject.areas = selectedAreaIds.value.filter((id) => id !== null) as number[];
    });

    onMounted(() => {
        if (dataProject.celebration_day && dataProject.deadline !== "0000-01-01T00:00:00.000Z") {
            dateCelebration.value = new Date(dataProject.celebration_day);
            dateDeadline.value = new Date(dataProject.deadline);
        }

        if (dataProject.celebration_day === '0000-01-01T00:00:00.000Z') {
            minDate2.value = new Date();
        }

        dataProject.areas.forEach(areaId => {
            const selectedArea = areas.value.find(area => area.id === areaId);
            if (selectedArea) {
                handleSelect(selectedArea.name);
                autoComplete.value.select(selectedArea.name);
            }
        });

        selectType.value = dataProject.type;
    });

    const createDraft = async () => {
        if (dataProject.name.trim() !== '' &&
        dataProject.type.trim() !== '' &&
        dataProject.description.trim() !== '' &&
        dataProject.description.length >= 10 &&
        !isProjectNameDuplicate(dataProject.name)) {
            CreateProject();
        }

        router.push('/projects');
    };

    const create = () => {
        submitted.value = true;
        if (dataProject.areas.length === 0) {
            dataProject.areas.push(1);
        } else if (
            dataProject.name.trim() !== '' &&
            dataProject.type.trim() !== '' &&
            dataProject.description.trim() !== '' &&
            dataProject.description.length >= 10 &&
            !isProjectNameDuplicate(dataProject.name)
        ) {
            wizardStep.value = 2;
            emit('StepActual', wizardStep.value);
        }
    };

    function ajustarMinFecha2() {
        dateDeadline.value = undefined;
        minDate2.value = dateCelebration.value;

        fechaSelected.value = true;

        if (dateCelebration.value) {
            dataProject.addCelebrationDay(dateCelebration.value);
        }
    }

    function selectCalendar2(){
        if (!dateDeadline.value) {
            alert('Seleccione primero la fecha de celebración');
        } else {
            dataProject.addDeadline(dateDeadline.value);
        }
    }

    function isProjectNameDuplicate(name: string) {
        return projects.some((project: Record<string, any>) => project.name.replace(/\s/g, '').toLowerCase() === name.replace(/\s/g, '').toLowerCase());
    }

    const search = (event: any) => {
        const query = event.query.toLowerCase();
        filteredItems.value = areas.value
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

    const addCustomItem = (event: MouseEvent) => {
        showCustomInput.value = true;
        event.stopPropagation();
    };

    const addItem = async () => {
        if (customItem.value !== '') {
            await newArea(customItem.value);
            await refetch();
            const selectedArea = areas.value.find((item) => item.name === customItem.value);
            const selectedId = selectedArea ? selectedArea.id : null;

            // Actualizar la lista de áreas filtradas
            filteredItems.value = areas.value.map((item) => item.name);

            if (selectedId) {
                if (!dataProject.areas.includes(selectedId)) {
                    dataProject.areas.push(selectedId);
                }
            }

            nextTick(() => {
                showAdd.value = true;
                
                // Seleccionar automáticamente el nuevo item en el AutoComplete
                captureArea.value.push(customItem.value);// Pasar el valor del área personalizada aquí
                showCustomInput.value = false;
                customItem.value = '';
            });
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
            const selectedArea: any = areas.value.find(
            (item: { name: string; id: number }) => item.name === option);

            if (selectedArea) {
                const selectedId = selectedArea.id;
                if (!dataProject.areas.includes(selectedId)) {
                    dataProject.areas.push(selectedId);
                }
            }

            value.value = option;
        }
    };

    const typeOptions = ref([
        {
            name: "Gestionado por el equipo",
            value: "Gestionado por el equipo"
        },
        {
            name: "Gestionado para un cliente",
            value: "Gestionado para un cliente",
            clients: [
                { name: "Oscar Rodriguez", value: "Oscar Rodriguez" },
                { name: "Esteban Sosa", value: "Esteban Sosa" },
                { name: "César Castellanos", value: "César Castellanos" }
            ]
        }
    ]);
</script>

<template>
    <article class="panel-NP">
        <div v-if="booleanCancel === true" class="popConfirm">
            <div class="dialog">
                <button @click="booleanCancel = false" class="btnCloseDialog"><img class="btnDelete" draggable="false" src="@assets/svg/close.svg"></button>
                <h2>¿Estás seguro de que deseas cancelar este proyecto?</h2>
                <div class="flexButtons">
                    <router-link to="/projects">
                        <button>Cancelar</button>
                    </router-link>
                    <button v-if="(dataProject.name && dataProject.type && dataProject.description) != '' && !isProjectNameDuplicate(dataProject.name)" @click="createDraft">Guardar como borrador</button>
                </div>
            </div>
        </div>
        <div class="left">
            <div class="form">
                <div class="TituloBox">
                    <h1 class="title">Crear un proyecto</h1>
                    <p class="sub-title">Crea un proyecto para dar la mejor organización y distribución de tu información.</p>
                </div>
                <div class="data">
                    <label class="form-label">Nombre <span class="required">*</span></label>
                    <input :class="{'p-invalid': (dataProject.name === '' || isProjectNameDuplicate(dataProject.name)) && submitted === true}" v-model="dataProject.name" class="inputForm" type="text">
                    <small v-if="dataProject.name === '' && submitted === true" class="p-error">El nombre del proyecto es requerido</small>
                    <small v-else-if="isProjectNameDuplicate(dataProject.name) && submitted === true" class="p-error">Este nombre de proyecto ya exite</small>
                </div>
                <div class="colRow2">
                    <div class="dataManagement">
                        <label class="form-label">Tipo de proyecto <span class="required">*</span></label>
                        <CascadeSelect :class="{'p-invalid':dataProject.type === '' && submitted === true}" v-model="selectType" :options="typeOptions" placeholder="Seleccione un tipo de proyecto" optionLabel="name" optionGroupLabel="name" class="Cascade"
                            :optionGroupChildren="['clients']" style="min-width: 14rem" />
                            <small v-if="dataProject.type === '' && submitted === true" class="p-error cascade-error">El tipo de proyecto es requerido</small>
                    </div>
                    <div class="dataManagement" v-if="dataProjectOut.booleanBudget != 'si'">
                        <label class="form-label">¿Asignar presupuesto?<span class="required">*</span></label>
                        <select :class="{'p-invalid': dataProjectOut.booleanBudget === '' && submitted === true}" v-model="dataProjectOut.booleanBudget" class="inputForm">
                            <option value="" disabled>Seleccione una opción</option>
                            <option value="si">Sí</option>
                            <option value="no">No</option>
                        </select>
                        <small v-if="dataProjectOut.booleanBudget === '' && submitted === true" class="p-error">Ésta pregunta es requerida</small>
                    </div>
                    <div class="dataManagement" v-if="dataProjectOut.booleanBudget === 'si'">
                        <label class="form-label">Presupuesto</label>
                        <div class="estimacion">
                            <InputNumber v-if="divisa === 'COP'" :class="{'p-invalid':dataProject.budget === 0 && submitted === true}" id="inputBudget" class="inputManagement" v-model="dataProject.budget" inputId="integeronly" :min="0"/>
                            <InputNumber v-if="divisa === 'USD'" :class="{'p-invalid':dataProject.budget === 0 && submitted === true}" id="inputBudget" class="inputManagement" v-model="dataProject.budget" inputId="currency-us" mode="currency" currency="USD" locale="en-US" :min="0"/>
                            <InputNumber v-if="divisa === 'EUR'" :class="{'p-invalid':dataProject.budget === 0 && submitted === true}" id="inputBudget" class="inputManagement" v-model="dataProject.budget" inputId="currency-germany" mode="currency" currency="EUR" locale="de-DE" :min="0" />
                            <select v-model="divisa" class="inputForm selectDivisa">
                                <option value="COP">COP</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="data" v-if="dataProjectOut.booleanArea != 'si'">
                    <label class="form-label">¿Desea asignar área(s)?<span class="required">*</span></label>
                    <select :class="{'p-invalid': dataProjectOut.booleanArea === '' && submitted === true}" v-model="dataProjectOut.booleanArea" class="inputForm">
                        <option value="" disabled>Seleccione una opción</option>
                        <option value="si">Sí</option>
                        <option value="no">No</option>
                    </select>
                    <small v-if="dataProjectOut.booleanArea === '' && submitted === true" class="p-error">Ésta pregunta es requerida</small>
                </div>
                <div class="data" v-if="dataProjectOut.booleanArea === 'si'">
                    <label class="form-label">Área <span class="required"></span></label>
                    <AutoComplete multiple id="inputAutocomplete" v-model="captureArea" :suggestions="filteredItems" @complete="search" @select="handleSelect" ref="autoComplete">
                        <template #option> 
                            <div v-if="noResults === true" class="custom-input-container p-disabled">
                                <span class="no-results">No se encontraron resultados</span>
                            </div>
                        </template>
                        <template #footer>
                            <button v-if="showAdd === true && showCustomInput === false" @click="addCustomItem" class="btnOpenInput">Agregar un área personalizada</button>
                            <div v-else-if="showCustomInput === true" class="inputAdd">
                                <input v-model="customItem" placeholder="Escribe el área" class="custom-input" />
                                <button @click="ignoreAddItem" class="cancelAdd">cancelar</button>
                                <button @click="addItem">Agregar</button>
                            </div>
                        </template>
                    </AutoComplete>
                </div>
                <div class="colRow2">
                    <div class="dataManagement" v-if="dataProjectOut.booleanCelebration != 'si'">
                        <label class="form-label">¿Fecha de inicio estimado?<span class="required">*</span></label>
                        <select :class="{'p-invalid': dataProjectOut.booleanCelebration === '' && submitted === true}" v-model="dataProjectOut.booleanCelebration" class="inputForm">
                            <option value="" disabled>Seleccione una opción</option>
                            <option value="si">Sí</option>
                            <option value="Indefinida">Indefinida</option>
                        </select>
                        <small v-if="dataProjectOut.booleanCelebration === '' && submitted === true" class="p-error">Ésta pregunta es requerida</small>
                    </div>
                    <div class="dataManagement" v-if="dataProjectOut.booleanCelebration === 'si'">
                        <label class="form-label">Fecha de inicio estimado</label>
                        <Calendar 
                            v-model="dateCelebration" 
                            dateFormat="dd/mm/yy" 
                            :class="{'p-invalidCalendar': dateCelebration === new Date('0000-01-01T00:00:00.000Z') && submitted === true}"
                            id="inputCalendar"
                            :minDate="minDate" 
                            @date-select="ajustarMinFecha2"
                            placeholder="dd/mm/aaaa"
                            showIcon/>
                    </div>
                    <div class="dataManagement" v-if="dataProjectOut.booleanDeadline != 'si'">
                        <label class="form-label">¿Fecha de cierre estimado?<span class="required">*</span></label>
                        <select :class="{'p-invalid': dataProjectOut.booleanDeadline === '' && submitted === true}" v-model="dataProjectOut.booleanDeadline" class="inputForm">
                            <option value="" disabled>Seleccione una opción</option>
                            <option value="si">Sí</option>
                            <option value="Indefinida">Indefinida</option>
                        </select>
                        <small v-if="dataProjectOut.booleanDeadline === '' && submitted === true" class="p-error">Ésta pregunta es requerida</small>
                    </div>
                    <div class="dataManagement" v-if="dataProjectOut.booleanDeadline === 'si'">
                        <label class="form-label">Fecha de cierre estimado</label>
                        <Calendar
                            v-model="dateDeadline"
                            dateFormat="dd/mm/yy"
                            :class="{'p-invalidCalendar': dateDeadline === new Date('0000-01-01T00:00:00.000Z') && submitted === true}"
                            id="inputCalendar"
                            :minDate="minDate2"
                            placeholder="dd/mm/aaaa"
                            @date-select="selectCalendar2"
                            showIcon
                            />
                    </div>
                </div>
                <div class="data">
                    <label class="form-label">Descripción <span class="required">*</span></label>
                    <textarea 
                        :class="{'p-invalid':dataProject.description.length < 10 && submitted === true}" 
                        v-model="dataProject.description" 
                        placeholder="Describe el proyecto" 
                        class="inputForm descProject"
                        rows="4"/>
                    <small v-if="dataProject.description === '' && submitted === true" class="p-error">La descripción del proyecto es requerida</small>
                    <small v-else-if="dataProject.description.length < 10 && submitted === true" class="p-error">La descripción es demasiado corta</small>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="infoRight">
                <img draggable="false" class="imageRight" src="@assets/svg/Projects/vector-Projects.svg">
                <div class="buttons">
                    <div class="buttonsBox">
                        <button class="cancel" @click="booleanCancel = true">cancelar</button>
                        <button class="create" @click="create">continuar</button>
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>

<style scoped>
    @import url('../NewProject.scss');
</style>