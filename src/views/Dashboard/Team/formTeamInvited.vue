<script lang="ts" setup>
    import InputText from 'primevue/inputtext';
    import { ref, reactive } from 'vue';

    const invited = reactive({
        email: '',
        rol: ''
    });

    const submitted = ref<boolean>(false);
    const SendStatus = ref<boolean>(false);
    const displayModal = ref<boolean>(false);
    const roles = ['Administrador', 'Gerente', 'Supervisor'];

    const emits = defineEmits(['modalClose']);

    function btnInvited(){
        submitted.value = true;
        if((invited.email && invited.rol)!= '' && isValidEmail(invited.email) != false){
            SendStatus.value = true;
        }
    }

    function close(){
        displayModal.value = false;
        emits('modalClose', displayModal.value);
    }

    const isValidEmail = function(val : string) {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || false;
    }
</script>

<template>
    <div v-if="SendStatus === false" class="contentForm">
        <form class="form">
            <div class="dialog-header">
                <button class="btnCloseModal" @click="close"><i class="pi pi-times iconX"></i></button>
            </div>
            <div id="form-title">
                <h1 class="titleDialog">Invita un nuevo miembro</h1>
            </div>
            <div class="input_form">
                <label class="form-label" for="#email">Email</label>
                <div class="fields">
                    <span class="p-input-icon-left">
                    <i class="icons-form"><img draggable="false" src="@assets/svg/icon/mail.svg" class="material-symbols-rounded"/></i>
                    <InputText 
                        type="text" 
                        class="p-inputtext-sm" 
                        :class="{'p-invalid':isValidEmail(invited.email) === false && submitted === true}"
                        v-model="invited.email" 
                        placeholder="Ingresa tu email" />
                    </span>
                    <small v-if="invited.email === '' && submitted === true" class="p-error">El email es requerido</small>
                    <small v-if="isValidEmail(invited.email) === false && submitted === true && invited.email != ''" class="p-error">El email no es válido</small>
                </div>
    
                <label class="form-label" for="#rol">Rol</label>
                <div class="p-input-icon-left">
                    <i class="icons-form"><img draggable="false" src="@assets/svg/icon/person.svg" class="material-symbols-rounded"/></i>
                    <select class="selectRol" v-model="invited.rol" :class="{'p-invalid':invited.rol === '' && submitted === true}">
                        <option disabled value="" class="optionDis">Seleccione un rol</option>
                        <option v-for="opcion in roles" :value="opcion">{{ opcion }}</option>
                    </select>
                </div>
                <small v-if="invited.rol === '' && submitted === true" class="p-error">El rol es requerido</small>
            </div>
            
            <div id="btnInferior">
                <div class="btnSubmit">
                    <input class="form-submit" type="button" @click="btnInvited" value="Enviar invitación">
                </div>
            </div>
        </form>
    </div>

    <div v-if="SendStatus === true" class="contentForm">
        <form class="form">
            <div class="dialog-header">
                <button class="btnCloseRegis" @click="close">Aceptar</button>
            </div>
            <div id="form-title">
                <h1 class="titleDialog2">Tu invitación fue enviada</h1>
            </div>
            <h2 class="textRegis">Haz enviado una invitación a tu colaborador para que haga parte de tu proyecto.</h2>
            <h2 class="textItalic">“El aporte y colaboración de cada miembro del equipo es fundamental para el éxito del proyecto.”</h2>
            <img class="image_invited" src="@assets/svg/MemberInvited.svg">
        </form>
    </div>
</template>

<style scoped>
    @import url('../Dashboard.scss');
</style>