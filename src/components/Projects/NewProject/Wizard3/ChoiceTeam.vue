<script setup lang="ts">
    import { ref, onMounted, computed, defineEmits } from 'vue';
    import ProjectStoreOut from '@src/stores/dataProjectTeam';
    import { gql } from '@apollo/client/core'
    import { useQuery } from '@vue/apollo-composable';
    import formAddMember from './formAddMember.vue';

    const dataProjectOut = ProjectStoreOut();

    const search = ref('');
    const selectRef = ref<HTMLElement | null>(null);
    const hoveredCards = ref<Map<number, boolean>>(new Map<number, boolean>());
    const selectedRoles = ref<Map<number, number>>(new Map<number, number>());
    const selectedFilter = ref('Todos');
    const booleanNext = ref(false);
    const focusedCardIndex = ref(new Set<number>());
    const wizardStep = ref(3);
    const boolMemberOut = ref(false);
    const booleanRol = ref(false);
    const roleID = ref();
    const emit = defineEmits(['StepActual']);

    const { result } = useQuery(gql`
        query getAllUsers {
            getAllUsers {
                id
                name
                last_name
            }
        }
    `);

    const { result: rolesResult } = useQuery(gql`
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

    const getRoleName = (roleId: number) => {
        if (rolesResult.value && rolesResult.value.getAllRoles) {
            const role = rolesResult.value.getAllRoles.find((role: { id: number, name: string }) => role.id === roleId);
            return role ? role.name.replace('Desarrollador ', '') : '';
        }
        return '';
    }

    const assignTeam = async () => {
        
    };

    onMounted(() => {
        selectRef.value = document.querySelector('.filterTeam');
        if (result.value && result.value.getAllUsers) {
            result.value.getAllUsers.filter((user: { id: number, name: string, last_name: string, role_id: number }) => {
                selectedRoles.value.set(user.id, user.role_id)
            })
        }
        
        for (const user of dataProjectOut.team) {
            focusedCardIndex.value.add(user.user_id);
            
        }
    });

    const filteredCards = computed(() => {
        if (result.value && result.value.getAllUsers) {
            return result.value.getAllUsers.filter((user: { id: number, name: string, last_name: string, role_id: number }) => {
                const categoryMatch =
                selectedFilter.value === 'Todos' || getRoleName(user.role_id);
                const nameMatch = user.name.toLowerCase().includes(search.value.toLowerCase());
                return categoryMatch && nameMatch;
            }).map((user: { id: number, name: string, last_name: string, role_id: number }) => {
                return {
                    id: user.id,
                    name: user.name,
                    last_name: user.last_name,
                    role_id: user.role_id,
                };
            });
        } else {
            return [];
        }
    });

    const toggleSelect = () => {
        selectRef.value?.focus();
    };

    const selectCard = (index: number, role: number, selectedRole: string) => {
        if (focusedCardIndex.value.has(index)) {
            hoveredCards.value.set(index, false); //Oculta boton de eliminar
            focusedCardIndex.value.delete(index);
            const cardIndex = dataProjectOut.team.findIndex((team) => team.user_id === index);
            if (cardIndex !== -1) {
                dataProjectOut.team.splice(cardIndex, 1);
            }
        } else {
            focusedCardIndex.value.add(index);
            const role_id = role;
            dataProjectOut.team.push({user_id: index, role_id: role_id});
        }
        roleID.value = selectedRole;
        console.log(dataProjectOut.team)
    };

    const next = () => {
        booleanNext.value = true;
        if (dataProjectOut.team.length > 0) {
            wizardStep.value = 4;
            emit('StepActual', wizardStep.value);
            assignTeam();
        }
    };

    const back = () => {
        wizardStep.value = 2;
        emit('StepActual', wizardStep.value);
    };

    const deleteWords = () => {
        search.value = '';
    };

    const cards = computed(() => {
        if (result.value && result.value.getAllUsers) {
            return result.value.getAllUsers.map((user: { id: number, name: string, last_name: string, role_id: number }) => {
                return {
                    id: user.id,
                    name: user.name,
                    last_name: user.last_name,
                    role_id: user.role_id,
                };
            });
        } else {
            return [];
        }
    });

    const changeRoles = (userID: number, roleID : number) => {
        booleanRol.value = !booleanRol.value;
        if(booleanRol.value === true){
            selectedRoles.value.set(userID, roleID);
        }
    }

    const getCardName = (user_id: number) => {
        const card = cards.value.find((card: any) => card.id === user_id);
        return card ? card.name : '';
    };

    const getCardLastName = (user_id: number) => {
        const card = cards.value.find((card: any) => card.id === user_id);
        return card ? card.last_name : '';
    };
</script>

<template>
    <article class="panel-NP Choice__container">
        <formAddMember v-if="boolMemberOut" @close="boolMemberOut = false"/>
        <div class="left75">
            <div class="boxBlock">
                <div class="TituloBox title-section">
                    <h1 class="title t-ChoiceTeam">Elección del equipo de trabajo ideal</h1>
                    <p class="sub-title">Escoge el equipo de trabajo ideal para la ejecución de tus proyectos.</p>
    
                    <div class="searchBox">
                        <div class="conInput">
                            <img draggable="false" class="SearchSVG" src="@assets/svg/search.svg">
                            <input 
                                type="text"
                                ref="searchInput" 
                                aria-label="Search" 
                                v-model="search" 
                                draggable="false" 
                                placeholder="Buscar miembros del equipo"
                            />
                            <button v-if="search != ''" class="buttonClose">
                                <img class="btnClose" @click="deleteWords" draggable="false" src="@assets/svg/close.svg">
                            </button>
                            <div class="boxFilter" @click="toggleSelect">
                                <select class="filterTeam" v-model="selectedFilter">
                                    <option value="Todos">Todos</option>
                                    <option value="Frontend">Frontend</option>
                                    <option value="Backend">Backend</option>
                                    <option value="Disponibles">Disponibles</option>
                                </select>
                                <div class="iconSelect">
                                    <i style="color: #fff;" class="pi pi-angle-down downSelect"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cardsTeam">
                    <div v-if="filteredCards.length === 0 && search != ''" class="noResults"><span>No se encontraron resultados</span></div>
                    <div class="cards">
                        <div v-if="search === ''" class="addMemberOut" @click="boolMemberOut = true">
                            <img draggable="false" class="imgCardAdd" src="@assets/images/Projects/simAddMember.png">
                            <div class="titleCardAdd">
                                <h3>Crea un miembro externo</h3>
                            </div>
                            <button class="btnAdd">Crear</button>
                        </div>
                        <div :class="{ 'focused': focusedCardIndex.has(card.id) }" class="cardSingle" v-for="(card, index) in filteredCards" :key="index" @click="selectCard(card.id, card.role_id, roleID)">
                            <img v-if="selectedRoles.get(card.role_id) === 1" class="letterClasify" draggable="false" src="@assets/svg/Projects/ListonFrontend.svg"> 
                            <img v-if="selectedRoles.get(card.role_id) === 2" class="letterClasify" draggable="false" src="@assets/svg/Projects/ListonBackend.svg">
                            <img v-if="selectedRoles.get(card.role_id) === 3" class="letterClasify" draggable="false" src="@assets/svg/Projects/ListonFullStack.svg">
        
                            <div class="picMember">
                                <img draggable="false" class="foto" src="@assets/images/user_noPic.jpeg">
                            </div>
                            <div class="nameMember">
                                <h3>{{ card.name }} {{ card.last_name }}</h3>
                                <div class="flexBox">
                                    <p v-if="booleanRol === false">{{ getRoleName(selectedRoles.get(card.id) || 0) }}</p>
                                    <select v-if="booleanRol === true" class="selectRol" @click.stop v-model="roleID">
                                        <option v-for="role in roles" :value="role.id" :key="role.id">
                                            {{ role.name }}
                                        </option>
                                    </select>
                                    <button @click.stop @click="changeRoles(card.id, roleID)" class="changeRol" v-tooltip.top="'Cambiar rol'"><i class="pi pi-sync"></i></button>
                                </div>
                            </div>
                            <div class="boxBtnMore">
                                <button class="btnMoreMember">Ver más</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="right25">
            <div class="BoxProgress"></div>
            <div class="buttons btnsTeamSelect">
                <div class="boxSelectedTeam">
                    <div v-if="dataProjectOut.team.length === 0" class="TeamEmpty" :class="{ 'errorSelectTeam':  dataProjectOut.team.length === 0 && booleanNext}">Aun no se ha seleccionado el equipo de trabajo</div>
                    <div class="selectedTeam" v-for="cardS in dataProjectOut.team" :key="cardS.user_id" @mouseover="hoveredCards.set(cardS.user_id, true)" @mouseleave="hoveredCards.set(cardS.user_id, false)">
                        <img class="picSelectedTeam" draggable="false" src="@assets/images/user_noPic.jpeg">
                        <h3 class="nameSelected">{{ getCardName(cardS.user_id) }} {{ getCardLastName(cardS.user_id) }}</h3>
                        <div class="rightCardSelected">
                            <img v-if="selectedRoles.get(cardS.role_id) === 1" draggable="false" class="ClassifySelected" src="@assets/svg/Projects/ListonFrontend.svg">
                            <img v-if="selectedRoles.get(cardS.role_id) === 2" draggable="false" class="ClassifySelected" src="@assets/svg/Projects/ListonBackend.svg">
                            <img v-if="selectedRoles.get(cardS.role_id) === 3" draggable="false" class="ClassifySelected" src="@assets/svg/Projects/ListonFullStack.svg">
                            <button @click="selectCard(cardS.user_id, cardS.role_id, roleID)" v-show="hoveredCards.get(cardS.user_id)" class="btnDeleteMember">
                                <img class="btnDelete" draggable="false" src="@assets/svg/close.svg">
                            </button>
                        </div>
                        <!-- <p class="cargoSelected">{{ cards[index].cargo }}</p> -->
                    </div>
                </div>
                <div class="buttonsBox objButtons btnsChoice">
                    <button class="cancel" @click="back">Anterior</button>
                    <button class="create" @click="next">Siguiente</button>
                </div>
            </div>
        </div>
    </article>
</template>

<style lang="scss" scoped>
    @import url('../NewProject.scss');
</style>