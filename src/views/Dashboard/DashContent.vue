<script lang="ts" setup>
    import { ref } from 'vue'; 
    import navbar from '@components/navbar.vue';
    import Avatar from 'primevue/avatar';
    import Calendar from 'primevue/calendar';
    import AvatarGroup from 'primevue/avatargroup'; 
    import "primevue/resources/themes/lara-light-indigo/theme.css"; 
    import "primevue/resources/primevue.min.css";
    import "primeicons/primeicons.css";

    const date = ref();
    const props = defineProps({
        user: {
            type: Object,
            required: true,
            default: () => ({ 
                id: 1,
                name: 'Angelica',
                last_name: 'Hernandez'
            })
        }
    })
</script>


<template>
    <div class="contentDash">
        <navbar style="position: relative;"/>
        <header id="headerInfo">
            <div class="CirclePhoto">
                <img class="picProfile" draggable="false" src="@assets/images/Dashboard/profile.jpeg">
            </div>
            <div class="infoProfile">
                <h2 class="Greeting">Hola de nuevo {{ props.user.name }}!</h2>
                <p class="position">Chief Executive Officer</p>
            </div>
        </header>
        <div id="Elements">
            <div class="ChilElement">
                <div class="Items1">
                    <div class="TwoColumns">
                        <div class="Box1 cardDashHome">
                            <h3 class="titleCardsDash">Resumen</h3>
                            <div class="flexResumen">
                                <div class="graph">
                                    <img class="grafica" draggable="false" src="@assets/svg/Graphic.svg">
                                </div>
                                <div class="card justify-content-center calendarBox">
                                    <Calendar class="calendar" v-model="date" inline showWeek/>
                                </div>
                            </div>
                        </div>
                        <div class="blockItem1">
                            <div class="team cardDashHome">
                                <div class="flex">
                                    <h3 class="titleCardsDash">Equipo de trabajo</h3>
                                    <router-link to="/TeamList"><button class="btnCards">Ver todos</button></router-link>
                                </div>
                                <div class="card flex justify-content-center teamAvatars">
                                    <AvatarGroup>
                                        <Avatar name="Nombre" class="avatar" image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" size="large" shape="circle" />
                                        <Avatar title="Nombre" class="avatar" image="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png" size="large" shape="circle" />
                                        <Avatar title="Nombre" class="avatar" image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" size="large" shape="circle" />
                                        <Avatar title="Nombre" class="avatar" image="https://primefaces.org/cdn/primevue/images/avatar/ionibowcher.png" size="large" shape="circle" />
                                        <Avatar title="Nombre" class="avatar" image="https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png" size="large" shape="circle" />
                                        <Avatar title="Nombre" class="avatar" label="+2" shape="circle" size="large" style="background-color: '#181818', color: '#ffffff'" />
                                    </AvatarGroup>
                                </div>
                            </div>
                            <div class="meetings cardDashHome">
                                <div class="flex">
                                    <h3 class="titleCardsDash">Reuniones</h3>
                                    <button class="btnCards">Ver todas</button>
                                </div>
                                <div class="reunions">
                                    <div class="meet">
                                        <div class="day">15</div>
                                        <div class="block">
                                            <div class="titleMeet">Daily</div>
                                            <div class="description">Descripción</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="reunions">
                                    <div class="meet">
                                        <div class="day">21</div>
                                        <div class="block">
                                            <div class="titleMeet">Daily</div>
                                            <div class="description">Descripción</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="TwoColumns">
                        <div class="Box1 cardDashHome">
                            <h3 class="titleCardsDash">Resumen</h3>
                            <div class="flexResumen">
                                <div class="graph">
                                    <img class="grafica" draggable="false" src="@assets/svg/Graphic.svg">
                                </div>
                                <div class="card justify-content-center calendarBox">
                                    <Calendar class="calendar" v-model="date" inline showWeek/>
                                </div>
                            </div>
                        </div>
                        <div class="blockItem1">
                            <div class="team cardDashHome">
                                <div class="flex">
                                    <h3 class="titleCardsDash">Equipo de trabajo</h3>
                                    <router-link to="/TeamList"><button class="btnCards">Ver todos</button></router-link>
                                </div>
                                <div class="card flex justify-content-center teamAvatars">
                                    <AvatarGroup>
                                        <Avatar name="Nombre" class="avatar" image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" size="large" shape="circle" />
                                        <Avatar title="Nombre" class="avatar" image="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png" size="large" shape="circle" />
                                        <Avatar title="Nombre" class="avatar" image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" size="large" shape="circle" />
                                        <Avatar title="Nombre" class="avatar" image="https://primefaces.org/cdn/primevue/images/avatar/ionibowcher.png" size="large" shape="circle" />
                                        <Avatar title="Nombre" class="avatar" image="https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png" size="large" shape="circle" />
                                        <Avatar title="Nombre" class="avatar" label="+2" shape="circle" size="large" style="background-color: '#181818', color: '#ffffff'" />
                                    </AvatarGroup>
                                </div>
                            </div>
                            <div class="meetings cardDashHome">
                                <div class="flex">
                                    <h3 class="titleCardsDash">Reuniones</h3>
                                    <button class="btnCards">Ver todas</button>
                                </div>
                                <div class="reunions">
                                    <div class="meet">
                                        <div class="day">15</div>
                                        <div class="block">
                                            <div class="titleMeet">Daily</div>
                                            <div class="description">Descripción</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="reunions">
                                    <div class="meet">
                                        <div class="day">21</div>
                                        <div class="block">
                                            <div class="titleMeet">Daily</div>
                                            <div class="description">Descripción</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <div class="Items3">
                    
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
   @import url('./Dashboard.scss');
</style>
