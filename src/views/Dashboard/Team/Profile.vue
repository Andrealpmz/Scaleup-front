<script lang="ts" setup>
    import { defineProps } from 'vue'
    import navbar from '@components/navbar.vue';

    const props = defineProps({
        user: {
            type: Object,
            required: true,
            default: () => ({ 
                id: '1',
                username: 'ange025',
                name: 'Angelica Ramirez',
                cargo: 'Programadora Senior',
                email: 'angerami@comania.co',
                contacto: 3158965417,
                image: '/src/assets/images/Dashboard/profile.jpeg',
                rol: 'Administradora',
            })
        }
    })
</script>

<template>
    <navbar/>
    <div id="ContentProfile">
        <h1 class="title__Profile">
            <router-link to="/TeamList">
                <button class="buttonV">
                    <i class="pi pi-arrow-circle-left iconReturn"></i> 
                </button>
            </router-link>
            Perfil
        </h1>
        <div class="flex__wrapper">
            <div class="profile-background-image__image shadown__wrapper">
                <div class="banner__frontpage">
                    <img draggable="false" class="frontpage" src="@assets/images/Dashboard/bgProfileDefault.jpg" alt="portada">
                </div>
                <div class="imageProfile">
                    <img draggable="false" :src="props.user.image">
                </div>
                <div class="profile__name">
                    <span class="username__profile"><h5>@{{ props.user.username }}</h5></span>
                    <h3>{{ props.user.name }}</h3>
                    <h4>{{ props.user.cargo  }}</h4>
                </div>
            </div>
            <div class="graphics shadown__wrapper">
        
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import url('../Dashboard.scss');
</style>
  