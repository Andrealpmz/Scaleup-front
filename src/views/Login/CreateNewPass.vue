<script lang="ts">
import InputText from 'primevue/inputtext';

export default {
    data() {
        return {
            password: {
                pass: '',
                pass2: ''
            },
            email:{
                email: ''
            },
            validateFields: false
        }
    }, 

    components: {
        InputText
    },

    methods: {
        async createPass() {
  try {
    const local_user = localStorage.getItem('userData');
    const obj_local_user = JSON.parse(local_user);

    const userData = {
      mail: this.email.email, // Asegúrate de usar la misma clave (email) que en el backend
      password: this.password.pass, // Obtener la nueva contraseña desde la propiedad del componente
    };

    if (this.validatePassword(this.password.pass, this.password.pass2) !== true) {
      console.error("Las contraseñas deben ser iguales");
      alert("Las contraseñas deben ser iguales. Por favor, verifica tus contraseñas.");
      return; // No continúes con la solicitud al servidor
    }

    const response = await fetch(import.meta.env.VITE_BACKEND + "/auth/update_pass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    if (response.ok) {
      const data = await response.json();
      alert("Contraseña actualizada con éxito!");
      window.location.href = '/login';
    } else if (response.status === 404){
      console.error("Error en la solicitud:", response.statusText);
      alert("Usuario no existe");
    }else{
        alert("Error");
    }
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    alert("Error en el servidor. Por favor, inténtalo de nuevo.");
  }
},

        validatePassword(password1: string, password2: string): boolean {
            return password1 === password2;
        },
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
            <form class="formp">
            <div id="form-titlefgt">
                <h1 class="title-fgt">Crear nueva contraseña</h1>
            </div>
            <div class="textinfofg">
                <p class="textForgot">Crea una nueva contraseña que no uses en ningún otro sitio.</p>
            </div>
            <label class="form-label" for="#email">Correo electronico</label>
            <span class="p-input-icon-left">
                <i class="icons-form">
                    <img draggable="false" src="@assets/svg/icon/mail.svg" class="material-symbols-rounded"/></i>
                <InputText 
                    type="text" 
                    class="p-inputtext-sm" 
                    :class="{'p-invalid':email.email === '' }"
                    v-model="email.email" 
                    required
                    placeholder="Ingresa el email registrado" />
            </span>
            <small v-if="email.email === ''" class="p-error">El email es requerido</small>
            <div id="space"></div>

            <label class="form-label" for="#password">Nueva contraseña</label>
            <span class="p-input-icon-left">
                <i class="icons-form">
                    <img draggable="false" src="@assets/svg/icon/lock.svg" class="material-symbols-rounded"/></i>
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
                    <i class="icons-form">
                        <img draggable="false" src="@assets/svg/icon/lock.svg" class="material-symbols-rounded"/></i>
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
                <div id="space"></div>
            <input class="btnForgot" @click="createPass" type="button" value="Cambiar contraseña"/>
            </form>
        </div>
    </article>
</template>

<style lang="scss" scoped>
    @import url('./login.scss');
</style>