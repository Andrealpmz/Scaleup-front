<script setup lang="ts">
    import { ref, defineEmits } from 'vue';
    import ProjectStore from '@src/stores/dataProject';
    
    const dataProject = ProjectStore();
    const submitted = ref(false);
    const dataSpecific = ref("");
    const clkAddSpecific = ref(false);
    const wizardStep = ref(2);
    const emit = defineEmits(['StepActual']);

    function create(){
        submitted.value = true;
        if(dataProject.objGeneral != "" && dataProject.objSpecifics.length != 0 && dataProject.objGeneral.length >= 20 ){
            wizardStep.value = 3;
            emit('StepActual', wizardStep.value);
        }
    }

    function back(){
        wizardStep.value = 1;
        emit('StepActual', wizardStep.value);
    }

    function addSpecific() {
        clkAddSpecific.value = true;
        if(dataSpecific.value != "" && dataSpecific.value.length >= 20){
            dataProject.addObjSpecific(dataSpecific.value);
            dataSpecific.value = '';
            clkAddSpecific.value = false;
        }
    }

    function removeSpecific(index : number) {
        dataProject.objSpecifics.splice(index, 1);
    }
</script>

<template>
    <article class="panel-NP">
        <div class="left">
            <div class="formObjt">
                <div class="TituloBox">
                    <h1 class="title">Definición de objetivos</h1>
                    <p class="sub-title">Define los objetivos que va a llevar acabo el proyecto.</p>
                </div>
                <div class="data">
                    <label class="form-label">Objetivo general <span class="required">*</span></label>
                    <input 
                        :class="{'p-invalid':(dataProject.objGeneral === '' || dataProject.objGeneral.length < 20) && submitted === true}" 
                        v-model="dataProject.objGeneral" 
                        class="inputForm" 
                        type="text">
                    <small v-if="dataProject.objGeneral === '' && submitted === true" class="p-error">El objetivo general es requerido</small>
                    <small v-else-if="dataProject.objGeneral.length < 20 && submitted === true" class="p-error">El objetivo general tiene que ser más largo</small>
                </div>
                <div class="data">
                    <label class="form-label">Objetivo específico <span class="required">*</span></label>
                    <div class="inputFlex">
                        <input 
                            :class="{'p-invalid':dataProject.objSpecifics.length === 0 && submitted || dataSpecific.length < 20 && clkAddSpecific}" 
                            class="inputForm" 
                            v-model="dataSpecific" 
                            type="text"
                            @keyup.enter="addSpecific">
                        <button class="btnAddObjt" :class="{'p-invalid':dataProject.objSpecifics.length === 0 && submitted === true}" @click="addSpecific">
                            <i :style="{ color: dataProject.objSpecifics.length === 0 && submitted === true ? '#e24c4c' : '' }" class="pi pi-plus"></i>
                        </button>
                    </div>
                    <small v-if="dataSpecific.length < 20 && clkAddSpecific === true" class="p-error">El objetivo específico es muy corto</small>
                </div>
                <div class="data">
                    <div class="objSpecific" :class="{'p-invalid':dataProject.objSpecifics.length === 0 && submitted === true}">
                        <div class="textSpecifics" v-if="dataProject.objSpecifics.length != 0">
                            <span id="Specifics" v-for="(specific, index) in dataProject.objSpecifics" :key="specific">
                                {{ index + 1 }}. {{ specific }}
                                <button class="buttonClose" @click="removeSpecific(index)">
                                    <img class="btnClose" draggable="false" src="@assets/svg/close.svg">
                                </button>
                            </span>
                        </div>
                        <div class="centerBox" v-if="dataProject.objSpecifics.length === 0">
                            <span 
                                :style="{ color: dataProject.objSpecifics.length === 0 && submitted === true ? '#e24c4c' : '' }" 
                                id="textEmpty">
                                Aun no hay objetivos específicos
                            </span>
                        </div>
                    </div>
                    <small v-if="dataProject.objSpecifics.length === 0 && submitted === true" class="p-error">Los objetivos específicos son requeridos</small>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="infoRight">
                <img draggable="false" class="ObjectiveSVG" src="@assets/svg/Projects/Objectives.svg">
                <div class="buttons">
                    <div class="buttonsBox objButtons">
                        <button class="cancel" @click="back">Anterior</button>
                        <button class="create" @click="create">Siguiente</button>
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>

<style lang="scss" scoped>
    @import url('../NewProject.scss');
</style>