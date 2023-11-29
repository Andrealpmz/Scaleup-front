<script lang="ts" setup>
    import "primevue/resources/themes/lara-light-indigo/theme.css";  
    import "primevue/resources/primevue.min.css";
    import "primeicons/primeicons.css";
    
    import { ref, computed, onMounted, watchEffect, inject, provide } from 'vue';
    import navbar from '@src/components/navbar.vue';
    import gql from 'graphql-tag';
    import { useMutation, useQuery } from '@vue/apollo-composable'
    import popConfirm from '@src/components/Projects/ConfirmDelete/popConfirm.vue';
    import { useRouter, useRoute } from 'vue-router';
    import { getOneIssue } from '@src/utils/DB/apiJira';
    import { socket } from '@/socket';
    
    const router = useRouter();
    const route = useRoute();
    const state = ref('');

    const key = ref('');
    const booleanToken = ref(false);

    const { result } = useQuery(gql`query { getAllProjects(org_id: 1) { id name type celebration_day deadline description obj_general obj_specifics budget software state leader_id org_id } }`);
    
    const projects = computed(() => {
        return (result.value && result.value.getAllProjects) ? result.value.getAllProjects.map((project: any) => ({
            id: project.id,
            name: project.name,
            type: project.type,
            celebration_day: project.celebration_day,
            deadline: project.deadline,
            obj_general: project.obj_general,
            obj_specifics: project.obj_specifics,
            duration: project.duration,
            description: project.description,
            budget: project.budget,
            state: project.state
        })) : [];
    });

    const isFocused = ref(false);
    const open = ref<number>(-1);
    const search = ref<string>('');
    const searchInput = ref();
    const boolDeletePop = ref(false);

    const filteredProjects = computed(() => {
        return search.value
            ? projects.value.filter((project: any) =>
                project.name.toLowerCase().includes(search.value.toLowerCase())
            )
            : projects.value;
    });

    const getStateClass = (state: any) => {
        if (state === 'borrador') {
            return 'borrador';
        } else if (state === 'creado') {
            return 'created';
        } else if (state === 'en curso') {
            return 'inProgress';
        } else {
            return '';
        }
    };

    function openOptions(index: number) {
        open.value = open.value === index ? -1 : index;
    }

    function deleteWords() {
        search.value = '';
    }

    function onKeyDown() {
        isFocused.value = true;
        searchInput.value.focus();
    }

    function formatNumber(number: any) {
        const suffixes = ["", "k", "M", "B", "T"];
        const suffixNum = Math.floor(("" + number).length / 3);
        let shortValue = (suffixNum !== 0 ? (number / Math.pow(1000, suffixNum)).toFixed(1) : number.toFixed(1));
        if (shortValue.endsWith('.0')) {
            shortValue = shortValue.slice(0, -2);
        }
        return shortValue + suffixes[suffixNum];
    }

    function formatDate(dateStr : any) {
        const date = new Date(dateStr);
        const timezoneOffset = date.getTimezoneOffset() * 60000;
        const adjustedDate = new Date(date.getTime() + timezoneOffset);
        
        const day = adjustedDate.getDate().toString().padStart(2, '0');
        const month = (adjustedDate.getMonth() + 1).toString().padStart(2, '0');
        const year = adjustedDate.getFullYear().toString();

        return `${day}/${month}/${year}`;
    }

    function calculateDaysRemaining(deadlineStr: any) {
        const deadline = new Date(deadlineStr);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const differenceInTime = deadline.getTime() - currentDate.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
        return differenceInDays;
    }

    const calculatePercentageCompleted = (completedTasks: any, totalTasks: any) => ((completedTasks / totalTasks) * 100).toFixed(2);

    const client_id = import.meta.env.VITE_JIRA_ClIENTID;
    const secret_id = import.meta.env.VITE_JIRA_SECRETID;

    const bringToken = async () => {
        console.log("ejecutando fetch token")
        const paramCode = route.query?.code

        if (paramCode) {
            try {
            const response = await fetch(`https://auth.atlassian.com/oauth/token`, {
                method: 'POST',
                headers: {
                'content-type': 'application/json'
                },
                body: JSON.stringify({
                grant_type: 'authorization_code',
                client_id: client_id,
                client_secret: secret_id,
                code: paramCode,
                redirect_uri: 'https://f12a-179-33-166-104.ngrok-free.app/projects'
                })
            });

            const json = await response.json();
            //esta constante json deberia respondernos el token de jira, el cual guardaremos en base de datos para el usuario, de manera que hagamos uso de este token para hacer las request de Jira
            console.log("Token =>", json)
            if(json.access_token){
                localStorage.setItem('Token', json.access_token);
                booleanToken.value = true;
                await getDataAuth(json.access_token);
            }
            if(json.refresh_token){
                localStorage.setItem('refresh_token', json.refresh_token);
            }

            router.push('/projects');
            return json;
            } catch (err) {
                console.log("error =>", err)
            }
        }
    }

    const getDataAuth = async (token: string) => {
        console.log("ejecutando getDataAuth");

        try {
            const response = await fetch(`https://api.atlassian.com/oauth/token/accessible-resources`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            const data = await response.json();
            console.log('Recibiendo URL => ', data);
            if(data[0].url){
                localStorage.setItem('url', data[0].url);
            }
            if(data[0].id){
                localStorage.setItem('cloud_id', data[0].id);
            }
        } catch (error) {
            console.log('errorGetResources => ', error);
        }
    }

    const refreshToken = async () => {
        console.log("ejecutando refresh token");

        const refresh_token = localStorage.getItem('refresh_token');
        try {
            const response = await fetch(`https://auth.atlassian.com/oauth/token`, {
                method: 'POST',
                headers: {
                'content-type': 'application/json'
                },
                body: JSON.stringify({
                grant_type: 'refresh_token',
                client_id: client_id,
                client_secret: secret_id,
                refresh_token: refresh_token,
                })
            });
            const data = await response.json();
            if(data.access_token){
                localStorage.setItem('Token', data.access_token);
            }

            if(data.refresh_token){
                localStorage.setItem('refresh_token', data.refresh_token);
            }

            console.log('New Token: ', data);
        } catch (error) {
            console.log("error =>", error)
        }
    }

    const { mutate: createProject } = useMutation(gql`
            mutation createProject($input: CreateProjectDTO!){
                createProject(input: $input){
                    name
                }
            }
        `, () => ({
            variables: {
                input: {
                    name: "integracion Pagos 3",
                    key: "PYC",
                    description: "En este proyecto se integrarán pasarelas de pago",
                    org_id: 1,
                    token: localStorage.getItem('Token'),
                    cloud_id: localStorage.getItem('cloud_id')
                }
            }
        })
    )

    const endpoint = async () => {
        // const token : any= localStorage.getItem('Token');
        // const cloud_id : any = localStorage.getItem('cloud_id')

        try {
            const data = await createProject();
            console.log(data);
        } catch (error) {
            console.log("Error CreateJiraProject => ", error);
        }

        // await create_project_jira(
        //     "integracion Pagos",
        //     "PY",
        //     "En este proyecto se integrarán pasarelas de pago",
        //     1,
        //     token,
        //     cloud_id
        // )
    }

    onMounted(async () => {
        const tokenValue = localStorage.getItem('Token');
        if(tokenValue){
            booleanToken.value = true;
        }
        state.value = generateUUID();
        await bringToken();
    })

    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    const accessJira = () => {
        state.value = generateUUID();
    }
</script>

<template>
    <article class="panel-NP">
        <div class="contentProjects">
            <navbar style="position: relative;"/>
            <div v-if="!booleanToken">
                <div class="containerAccess">
                    <h1>Administra tus proyectos</h1>
                    <h2>Inicia sesión en tu cuenta de 
                        <span class="contImg">
                            <img class="logoJira" draggable="false" src="@assets/images/Projects/Jira/logoJira.png">
                        </span>
                        para tener el control de tus proyectos en Scale Up
                    </h2>
                    <a v-bind:href="`https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=${client_id}&scope=read%3Ajira-work%20manage%3Ajira-project%20manage%3Ajira-configuration%20read%3Ajira-user%20write%3Ajira-work%20manage%3Ajira-webhook%20manage%3Ajira-data-provider%20offline_access&redirect_uri=https%3A%2F%2Ff12a-179-33-166-104.ngrok-free.app%2Fprojects&state=${state}&response_type=code&prompt=consent`">
                        <button @click="accessJira" style="background: rgb(14, 76, 221); color: #fff; border-radius: 12px;">
                            Iniciar sesión en Jira
                        </button>
                    </a>
                </div>
                <img draggable="false" class="simLoginJira" src="@assets/images/Projects/Jira/simLoginjira.png">
            </div>
            <div v-if="booleanToken">
                <header id="headProjects">
                    <div id="optionsInfo">
                        <div class="contentTop">
                            <h1 class="title">GLab</h1>
                            <p class="sub-title"><i class="pi pi-briefcase"></i>Proyectos</p>
                        </div>
                        <div class="layout elementRight">
                            <div class="searchBox">
                                <div class="conInput" v-on:keydown="onKeyDown">
                                    <input 
                                    type="text"
                                    ref="searchInput" 
                                    aria-label="Search" 
                                    v-model="search" 
                                    draggable="false" 
                                    :class="{'focusedInput': isFocused === true || search != '' }" 
                                    @focus="isFocused = true" 
                                    @blur="isFocused = false"
                                    placeholder="Buscar proyectos"
                                    />
                                    <img v-if="search === ''" draggable="false" class="SearchSVG" src="@assets/svg/search.svg">
                                    <button v-if="search != ''" class="buttonClose">
                                        <img class="btnClose" @click="deleteWords" draggable="false" src="@assets/svg/close.svg">
                                    </button>
                                </div>
                            </div>
                            <router-link to="/projects/createProject">
                                <button class="btnCreateNewProject" @click="endpoint">Crear proyecto</button>
                            </router-link>
                            <button title="Refrescar Token" class="btnRefresh" @click="refreshToken">
                                <i class="pi pi-undo"></i>
                            </button>
                        </div>
                    </div>
                </header>
                <div class="cardsProjects">
                    <div class="card">
                        <div v-if="filteredProjects.length === 0 && search != ''" class="noResults"><span>No se encontraron resultados</span></div>
                        <div v-for="(project, index) in filteredProjects" :key="index" class="cardProjectSingle">
                            <popConfirm v-if="boolDeletePop === true" @close="boolDeletePop = false" :cardId="project.id" class="PopConfirm" />
                            <div class="buttonOptions">
                                <div class="elementsRight">
                                    <span class="state" :class="[getStateClass(project.state)]">{{ project.state }}</span>
                                    <button @click="openOptions(index)">
                                        <i class="pi pi-cog"></i>
                                    </button>
                                </div>
                                <div v-if="open === index" class="contentOptions">
                                    <div class="itemsOptions">
                                        <button class="btnOptions" v-if="project.state === 'borrador' || 'creado'">
                                            <i class="pi pi-play"></i><span>Iniciar</span>
                                        </button>
                                        <button class="btnOptions">
                                            <i class="pi pi-pencil"></i><span>Editar</span>
                                        </button>
                                        <button class="btnOptions">
                                            <i class="pi pi-tags"></i><span>Etiquetas</span>
                                        </button>
                                        <button @click="boolDeletePop = true" class="btnOptions red">
                                            <i class="pi pi-trash"></i><span>Eliminar</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="boxHead">
                                <img draggable="false" class="circle" src="@assets/images/PWA-images/logo.png">
                                <div class="titleCard">
                                    <h3>{{ project.name }}</h3>
                                    <p v-if="project.type != 'Gestionado por el equipo'"><b>Cliente:</b> {{ project.type }}</p>
                                    <p v-if="project.type === 'Gestionado por el equipo'">{{ project.type }}</p>
                                </div>
                            </div>
                            <div class="limits">
                                <div class="boxBudget">
                                    <div class="budget">
                                        <h3>${{ formatNumber(18200) }} / ${{ formatNumber(project.budget) }}</h3>
                                        <p>Total Presupuesto</p>
                                    </div>
                                </div>
                                <div class="titleCard">
                                    <p v-if="project.celebration_day != '0000-01-01T00:00:00.000Z'">Fecha inicial: {{ formatDate(project.celebration_day) }}</p>
                                    <p v-if="project.celebration_day === '0000-01-01T00:00:00.000Z'">Fecha inicial: indefinida</p>
                                    <p v-if="project.deadline != '0000-01-01T00:00:00.000Z'">Fecha límite: {{ formatDate(project.deadline) }}</p>
                                    <p v-if="project.deadline === '0000-01-01T00:00:00.000Z'">Fecha límite: indefinida</p>
                                </div>
                            </div>
                            <div class="description">
                                <p>{{ project.description }}</p>
                            </div>
                            <div class="line-divider"></div>
                            <div class="workTask" id="topDays">
                                <span class="hours">Total de horas: {{ 244 }}/{{ 300}}</span>
                                <div v-if="(project.celebration_day !== '0000-01-01T00:00:00.000Z' && project.deadline !== '0000-01-01T00:00:00.000Z')" :class="{'red': calculateDaysRemaining(project.deadline) < 0}" class="RemainingDays">
                                    <span>{{ calculateDaysRemaining(project.deadline) }} días restantes</span>
                                </div>
                            </div>
                            <div class="workTask" id="topDays">
                                <span>Tareas: 290/334</span>
                                <span>{{ calculatePercentageCompleted(285, 334) }}% completado</span>
                            </div>
                            <div class="progress">
                                <div class="contentProgress" :style="{ width: calculatePercentageCompleted(285, 334) + '%' }"></div>
                            </div>
                        </div>
                        <div v-if="projects.length < 2 && search.length === 0" class="addProject">
                            <div class="headCard"></div>
                            <div class="infoCard">
                                <h2>¡Crea un nuevo proyecto ahora mismo!</h2>
                                <p>Simplifica tus procesos, controla y maximiza la eficiencia de tus proyectos.</p>
                                <router-link to="/projects/createProject">
                                    <button class="btnCreateProject">Crear un proyecto</button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>

<style lang="scss" scoped>
    @import url('./Projects.scss');
</style>