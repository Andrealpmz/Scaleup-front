<script lang="ts">
import InputText from 'primevue/inputtext';
import OrgStore from "@src/stores/dataOrganization";
import Swal from 'sweetalert2';
    import 'sweetalert2/dist/sweetalert2.min.css';

console.log(Swal);

export default {
  data() {
    return {
      mail: '',
      sendMsgEmail: false
    }
  },

  components: {
    InputText
  }, 

  methods: {
    async requestResetToken() {
const userData = {
  mail: this.mail,
};

const userDataJSON = JSON.stringify(userData);

      try {
        const response = await fetch(import.meta.env.VITE_BACKEND + "/auth/forgotPassword", {
            
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: userDataJSON,
        });
        if (response.ok) {
        const data = await response.json();
        Swal.fire({
                icon: 'success',
                title: 'Bien!',
                text: data.message + ', revisa tu correo y cierra esta página',
            });
        // Optionally, you can redirect the user or show a confirmation message
        } else {
        const errorData = await response.json();
        console.error("Error en la solicitud:", response.statusText);
        Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: errorData.error,
            });
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
        Swal.fire({
                icon: 'warning',
                title: 'Importante!',
                text: 'Usuario no existe',
            });
      }
    },
  },
}
</script>

<!-- rest of the template remains unchanged -->


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
                        :class="{'p-invalid':mail === '' && sendMsgEmail != false}"
                        v-model="mail"
                        placeholder="Ingresa tu email" />
                </span>
                <small v-if="mail === '' && sendMsgEmail != false" class="p-error">El email es requerido</small>
                <input class="btnForgot" type="button" @click="requestResetToken" value="Enviar código de recuperación">
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