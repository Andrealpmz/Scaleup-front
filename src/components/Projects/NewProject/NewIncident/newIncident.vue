<script setup lang="ts">
    import { ref, reactive } from 'vue';
    import './newIncident.scss';

    const incident = reactive({
        nameIncident: '',
        desc: '',
        encargado: '',
        storyPoints: ''
    });

    const members = [
        {
            photo : 'https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png',
            name: 'Andres'
        },
        {
            photo : 'https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png',
            name: 'Esteban'
        }
    ]

    const submitted = ref<boolean>(false);
    const SendStatus = ref<boolean>(false);
    const displayModal = ref<boolean>(false);

    const emits = defineEmits(['modalClose']);

    function GenerateIncident(){
        submitted.value = true;
        if((incident.nameIncident && incident.desc && incident.encargado && incident.storyPoints)!= ''){
            SendStatus.value = true;
            close();
        }
    }

    function close(){
        displayModal.value = false;
        emits('modalClose', displayModal.value);
    }
</script>

<template>
    <div class="formNewIncident">
        <div class="content">
            <div class="dialog-header">
                <button class="btnCloseModal" @click="close"><i class="pi pi-times iconX"></i></button>
            </div>
            <h1 class="titulo">Crear incidencia</h1>
            <div class="data">
                <label class="form-label">Nombre de incidencia <span class="required">*</span></label>
                <input :class="{'p-invalid':incident.nameIncident === '' && submitted === true}"  v-model="incident.nameIncident" class="inputForm" type="text">
                <small v-if="incident.nameIncident === '' && submitted === true" class="p-error">El nombre de incidencia es requerido</small>
            </div>
            <div class="data">
                <label class="form-label">Descripción <span class="required">*</span></label>
                <input :class="{'p-invalid':incident.desc === '' && submitted === true}"  v-model="incident.desc" class="inputForm" type="text">
                <small v-if="incident.desc === '' && submitted === true" class="p-error">La descripción es requerida</small>
            </div>
            <div class="data">
                <label class="form-label">Responsable <span class="required">*</span></label>
                <select :class="{'p-invalid':incident.encargado === '' && submitted === true}" v-model="incident.encargado" class="inputForm select"> 
                    <option disabled value="">Seleccion un responsable</option>
                    <option :value="data.name" v-for="(data, i) in members">
                        <Avatar class="avatar" image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" shape="circle"/> 
                        {{ data.name }}
                    </option>
                </select>
                <small v-if="incident.encargado === '' && submitted === true" class="p-error">El responsable es requerido</small>
            </div>
            <div class="data">
                <label class="form-label">Puntos de historia <span class="required">*</span></label>
                <input :class="{'p-invalid':incident.storyPoints === '' && submitted === true}"  v-model="incident.storyPoints" class="inputForm" type="text">
                <small v-if="incident.storyPoints === '' && submitted === true" class="p-error">Los puntos de historia son requeridos</small>
            </div>
            <div class="buttonSend">
                <button class="btnSend" @click="GenerateIncident">Crear incidencia</button>
            </div>
        </div>
    </div>
</template>