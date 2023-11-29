<script lang="ts" setup>
    import FormInvited from './formTeamInvited.vue';
    import navbar from '@components/navbar.vue';
    import hotkeys from 'hotkeys-js';
    import { ref } from 'vue';
    const i = 8;

    //Constantes de búsqueda
    const isFocused = ref<boolean>(false);
    const search = ref<string>('');
    const btnGridFocused = ref<boolean>(true);
    const btnListFocused = ref<boolean>(false);
    const searchInput = ref();
        
    //Modal
    const displayModal = ref(false);

    //Buttons Grid
    const svg1Color = ref('#BABFC5');
    const svg2Color = ref('#576DD3');

    function openModal() {
        displayModal.value = true;
    }

    function deleteWords() {
        search.value = '';
    }

    function toggleButton(btnClicked : string) {
        if (btnClicked === 'list') {
            btnListFocused.value = true;
            btnGridFocused.value = false;
            svg1Color.value = '#576DD3';
            svg2Color.value = '#BABFC5';
        } else if (btnClicked === 'grid') {
            btnGridFocused.value = true;
            btnListFocused.value = false;
            svg2Color.value = '#576DD3';
            svg1Color.value = '#BABFC5';
        }
    }

    hotkeys('command+k', onKeyDown);
    hotkeys('control+k', onKeyDown);

    function onKeyDown() {
        isFocused.value = true;
        searchInput.value.focus();
    }

    function close(displayModalSend : boolean) {
        displayModal.value = displayModalSend;
    }

</script>

<template>
    <navbar style="z-index: 1;"/>

    <div class="Modal" v-if="displayModal" :modal="true">
        <FormInvited @modalClose="close"/>
    </div>

    <div id="ContentList">    
        <div id="optionsTop">
            <div class="tittle elementLeft">
                <div class="contentTop">
                    <h1 class="cantMembers">Nombre del proyecto</h1>
                </div>
            </div>
            <div class="elementRight">
                <button @click="openModal" class="btnAdd"><i class="pi pi-plus plus"></i>Agregar miembro</button>
            </div>
        </div>

        <div class="tittle left">
            <div id="optionsInfo">
                <div class="contentTop">
                    <h1 class="cantMembers">Total de miembros ({{ i }})</h1>
                    <p>Project Manager</p>
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
                                placeholder="Buscar personas"
                            />
                            <img v-if="search === ''" draggable="false" class="SearchSVG" src="@assets/svg/search.svg">
                            <button v-if="search != ''" class="buttonClose">
                                <img class="btnClose" @click="deleteWords" draggable="false" src="@assets/svg/close.svg">
                            </button>
                        </div>
                    </div>
                    <div class="buttonsAlign">
                        <button 
                            @click="toggleButton('list')"
                            class="btnlist"
                            :class="{'selected': btnListFocused === true}">
                            <i class="pi pi-list" :style="{color: svg1Color}"></i>
                        </button>
                        <button 
                            class="btnGrid"
                            @click="toggleButton('grid')"
                            :class="{'selected': btnGridFocused === true}" >
                            <i class="pi pi-th-large" :style="{color: svg2Color}"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <div id="cards">
            <div v-if="btnGridFocused != false" v-for="i in 8" :key="i" class="cardTeam">
                <img src="@assets/images/Dashboard/profile.jpeg" draggable="false" class="profilePic">
                <h2 class="nameProfile">Sandra Caseres</h2>
                <p class="cargo">Programador Senior</p>
                <router-link to="/Profile/id:1">
                    <button class="btnMore">Ver más</button>
                </router-link>
            </div>
        </div>

        <div id="cardsList">
            <div v-if="btnListFocused != false" v-for="i in 8" :key="i" class="cardTeamList">
                <div class="profile">
                    <h3 class="numberProfile">{{ i }}</h3>
                    <img src="@assets/images/Dashboard/profile.jpeg" draggable="false" class="profilePicList">
                    <div class="info">
                        <h2 class="nameProfileList">Sandra Caseres</h2>
                        <p class="cargoList">Programador Senior</p>
                    </div>
                </div>
                <router-link to="/Profile/id:1">
                    <button class="btnMoreList">Ver más</button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import url('../Dashboard.scss');
</style>