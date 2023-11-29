<script setup lang="ts">
    import { ref, defineEmits, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import ProjectStore from '@src/stores/dataProject';
    import { createProject } from '@src/utils/DB/api';
    import gql from 'graphql-tag';
    import { useQuery } from '@vue/apollo-composable';
    import { CreateTeam } from '@src/utils/graphql/mutations/createTeam';
    import Area from '@src/utils/interfaces/area';
    import { create_project_jira } from '@src/utils/graphql/mutations/create-project-jira';

    import "primevue/resources/primevue.min.css";
    import "primevue/resources/themes/lara-light-indigo/theme.css";  

    const dataProject = ProjectStore();
    const router = useRouter();
    const submitted = ref(false);
    const wizardStep = ref(4);
    const selectedAreaNames = ref<string[]>([]);

    const { result } = useQuery(gql`
        query {
            getAllAreas(type: "Project") {
                id
                name
            }
        }
    `);

    const emit = defineEmits(['StepActual']);

    const create = async () => {
        submitted.value = true;
        dataProject.state = "creado";
        if (dataProject.software && dataProject.objGeneral !== '' && dataProject.state === "creado" && dataProject.objSpecifics.length != 0) {
            const celebration_day = new Date(dataProject.celebration_day);
            const deadline = new Date(dataProject.deadline);

            const data = {
                ...dataProject,
                celebration_day,
                deadline
            };

            if (dataProject.areas.length === 0) {
                dataProject.areas.push(1);
            }

            try {
                await createProject(data);
                // await create_project_jira(data.name, data.description);
                await CreateTeam();
            } catch (error) {
                console.error('Error al crear el proyecto:', error);
            }

            router.push('/projects');
        }
    }

    function back(){
        wizardStep.value = 3;
        emit('StepActual', wizardStep.value);
    }

    onMounted(() => {
        if (dataProject.areas.length > 0) {
            selectedAreaNames.value = dataProject.areas.map((areaId) => {
                const selectedArea = result.value.getAllAreas.find((area: Area) => area.id === areaId);
                return selectedArea ? selectedArea.name : '';
            })
        }
    })
</script>

<template>
    <article class="panel-NP ManagementCont">
        <div class="tituloMaster">
            <h1 class="title__ProjectInit">Gestión de proyecto</h1>
        </div>
        <div class="TwoColumns">
            <img class="imageManagement" draggable="false" src="@assets/svg/Projects/simProjectManagment.svg">
            <div class="cardManagement">
                <div class="contentForm">
                    <div class="dataSummary" v-if="dataProject.name != ''">
                        <label class="form-label">Nombre</label>
                        <span class="inputForm">{{ dataProject.name }}</span>
                    </div>
                    <div class="dataSummary"  v-if="dataProject.type != ''">
                        <label class="form-label">Tipo de Proyecto</label>
                        <span class="inputForm">{{ dataProject.type }}</span>
                    </div>
                    <div class="dataSummary" v-if="dataProject.budget != 0">
                        <label class="form-label">Presupuesto</label>
                        <span class="inputForm">{{ dataProject.budget }}</span>
                    </div>
                    <div class="dataSummary" v-if="dataProject.areas.length != 0">
                        <label class="form-label">Áreas</label>
                        <span class="overflowX">
                            <span class="SpecificsAreas" v-for="(area, index) in selectedAreaNames">{{ area }}</span>
                        </span>
                    </div>
                    <div class="dataSummary" >
                        <label class="form-label">Fecha de inicio estimado</label>
                        <span class="inputForm" v-if="dataProject.deadline != '0000-01-01T00:00:00.000Z'">{{ dataProject.celebration_day }}</span>
                        <span class="inputForm" v-else-if="dataProject.deadline === '0000-01-01T00:00:00.000Z'">Indefinida</span>
                    </div>
                    <div class="dataSummary">
                        <label class="form-label">Fecha de cierre estimado</label>
                        <span class="inputForm" v-if="dataProject.deadline != '0000-01-01T00:00:00.000Z'">{{ dataProject.deadline }}</span>
                        <span class="inputForm" v-else-if="dataProject.deadline === '0000-01-01T00:00:00.000Z'">Indefinida</span>
                    </div>
                    <div class="dataSummary">
                        <label class="form-label" v-if="dataProject.objGeneral != ''">Objetivo General</label>
                        <span class="overflowX">
                            <span class="Specifics">{{ dataProject.objGeneral }}</span>
                        </span>
                    </div>
                    <div class="dataSummary">
                        <label class="form-label" v-if="dataProject.objSpecifics.length != 0">Objetivos específicos</label>
                        <span class="overflowX">
                            <span id="Specifics" v-for="(specifics, index) in dataProject.objSpecifics">{{ index + 1 }}. {{ specifics }}</span>
                        </span>
                    </div>
                    <div class="dataSummary">
                        <label class="form-label">Software</label>
                        <select :class="{'p-invalid':dataProject.software === '' && submitted === true}" v-model="dataProject.software" class="inputForm inputManagement">
                            <option class="select-option" value="" disabled>Seleccione un software</option>
                            <option class="select-option" value="Jira Software">Jira Software</option>
                            <option class="select-option" value="Trello">Trello</option>
                        </select>
                        <small v-if="dataProject.software === '' && submitted === true" class="p-error">El software es requerido</small>
                    </div>    
                </div>
            </div>
        </div>
        <div class="buttons controls">
            <div class="buttonsBox">
                <button class="cancel" @click="back">Anterior</button>
                    <button class="create" @click="create">Crear</button>
            </div>
        </div>
    </article>
</template>

<style lang="scss" scoped>
    @import url('../NewProject.scss');
</style>../../../../utils/graphql/mutations/create-project-jira