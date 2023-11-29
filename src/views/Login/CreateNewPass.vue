<script lang="ts">
import InputText from 'primevue/inputtext';

export default {
    data() {
        return {
            password: {
                pass: '',
                pass2: ''
            },
            validateFields: false
        }
    }, 

    components: {
        InputText
    },

    methods: {
        validatePassword(password1: string, password2: string): boolean {
            return password1 === password2;
        },

        createPass(){
            this.validateFields = true;
        }
    }
}
</script>

<template>
    <article id="content">
        <div id="items-left">
            <div id="info">
                <img src="@assets/svg/ScaleUp-logo-blanco.svg" draggable="false" class="logo">
                <h1 class="text">
                    Una solución para cada tipo de negocio
                </h1>
                <p class="pfText">¿Estás listo para conocer en detalle la operación de tu agencia?</p>
            </div>
        </div>
        <div class="login">
            <form class="form">
            <div id="form-titlefgt">
                <h1 class="title-fgt">Crear nueva contraseña</h1>
            </div>
            <div class="textinfofg">
                <p class="textForgot">Crea una nueva contraseña que no uses en ningún otro sitio.</p>
            </div>
            <label class="form-label" for="#password">Nueva contraseña</label>
            <span class="p-input-icon-left">
                <i class="icons-form"><img draggable="false" src="@assets/svg/icon/lock.svg" class="material-symbols-rounded"/></i>
                <InputText 
                    type="password" 
                    class="p-inputtext-sm" 
                    :class="{'p-invalid':password.pass === '' && validateFields != false}"
                    v-model="password.pass" 
                    required
                    placeholder="Ingresa una nueva contraseña" />
            </span>
            <small v-if="password.pass === '' && validateFields != false" class="p-error">La contraseña es requerida</small>
            <div id="space"></div>
            <label class="form-label" for="#password">Confirmar nueva contraseña</label>
            <span class="p-input-icon-left">
                    <i class="icons-form"><img draggable="false" src="@assets/svg/icon/lock.svg" class="material-symbols-rounded"/></i>
                    <InputText 
                        type="password" 
                        class="p-inputtext-sm" 
                        :class="{'p-invalid':(password.pass2 === '' || validatePassword(password.pass, password.pass2)!= true) && validateFields != false}"
                        v-model="password.pass2" 
                        required
                        placeholder="Confirma tu nueva contraseña" />
                </span>
                <small v-if="password.pass2 === '' && validateFields != false" class="p-error">La confirmación de contraseña es requerida</small>
                <small v-else-if="validatePassword(password.pass, password.pass2)!= true && validateFields != false" class="p-error">Las contraseñas deben ser iguales</small>
                            
            <input class="btnForgot" @click="createPass" type="button" value="Cambiar contraseña"/>
            </form>
        </div>
    </article>
</template>

<style lang="scss" scoped>
    @import url('./login.scss');
</style>