<script lang="ts">
import InputText from 'primevue/inputtext';

export default {
    data() {
        return {
            email: '',
            sendMsgEmail: false
        }
    },

    components: {
        InputText
    }, 

    methods: {
        SendEmail(){
            this.sendMsgEmail = true;
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
                <h1 class="title-fgt">¿Olvidaste tu contraseña?</h1>
            </div>
            <div class="textinfofg">
                <p class="textForgot">¡Sin preocupaciones! Simplemente ingresa tu correo electrónico 
                    y te enviaremos un enlace para restablecer la contraseña.
                </p>
            </div>
            <div id="groupForgot">
                <span class="p-input-icon-left">
                    <i class="icons-form">
                        <img draggable="false" src="@assets/svg/icon/mail.svg" class="material-symbols-rounded"/>
                    </i>
                    <InputText 
                        type="text"
                        class="p-inputtext-sm" 
                        :class="{'p-invalid':email === '' && sendMsgEmail != false}"
                        v-model="email"
                        placeholder="Ingresa tu email" />
                </span>
                <small v-if="email === '' && sendMsgEmail != false" class="p-error">El email es requerido</small>
                <input class="btnForgot" type="button" @click="SendEmail" value="Enviar código de recuperación">
            </div>
            <div id="btnDown">
                <router-link to="/login"><span id="linkLogin">Volver a iniciar sesión</span></router-link>
            </div>

            </form>
        </div>
    </article>
</template>

<style lang="scss" scoped>
    @import url('./login.scss');
</style>