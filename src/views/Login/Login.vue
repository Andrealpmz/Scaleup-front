<script setup lang="ts">
import { ref, reactive } from "vue";
import InputText from "primevue/inputtext";
import.meta.env.VITE_BACKEND;
import gql from "graphql-tag";
import OrgStore from "@src/stores/dataOrganization";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { userInfo } from "os";

/*     const user = reactive({
        email: '',
        password: ''
    }); */
const user = OrgStore();

const submitted = ref(false);

async function toAccess() {
  submitted.value = true;

  const userData = {
    mail: user.email,
    password: user.password,
    form: user.form,
  };

  const userDataJSON = JSON.stringify(userData);
  console.log(userDataJSON);

  try {
    const response = await fetch(import.meta.env.VITE_BACKEND + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: userDataJSON,
    });

    if (response.ok) {
      const data = await response.json();
      const formStatus = data.user.form;
      console.log(data.user);

      localStorage.clear();
      localStorage.setItem("userData", JSON.stringify(data.user));
      console.log(localStorage.getItem('userData'))

      /* 
            switch (formStatus) {
                case "terminado":
                    window.location.href = '/CategoriesTest';
                    break;
                case 'en_progreso':
                    window.location.href = '/CategoriesTest';
                    break;
                case 'sin_iniciar':
                    window.location.href = '/TechnologyReadiness';
                    break;
                default:
                    console.error('Unexpected form status:', formStatus);
                    alert('Estado desconocido, intenta de nuevo');
                    break;
            } */
    } else {
      console.error("Error en la solicitud:", response.statusText);
      alert("Error en la solicitud");
    }
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    alert("Error en el servidor. Por favor, inténtalo de nuevo.");
  }
}
</script>

<template>
  <article id="content">
    <div id="items-left">
      <div id="info">
        <img
          src="@assets/svg/ScaleUp-logo-blanco.svg"
          draggable="false"
          class="logo"
        />
        <h1 class="text">Una solución para cada tipo de negocio</h1>
        <p class="pfText">
          ¿Estás listo para conocer en detalle la operación de tu agencia?
        </p>
      </div>
    </div>
    <div class="login">
      <form class="form">
        <div id="form-title">
          <h1 class="title-log">Iniciar sesión</h1>
          <p id="linkRegistro">
            ¿Usuario nuevo?
            <router-link id="linkTo" to="/register">Regístrate</router-link>
          </p>
        </div>

        <div class="input_form">
          <label class="form-label" for="#email">Email</label>
          <div class="fields">
            <span class="p-input-icon-left">
              <i class="icons-form"
                ><img
                  draggable="false"
                  src="@assets/svg/icon/mail.svg"
                  class="material-symbols-rounded"
              /></i>
              <InputText
                type="text"
                class="p-inputtext-sm"
                :class="{
                  'p-invalid': user.email === '' && submitted === true,
                }"
                v-model="user.email"
                placeholder="Ingresa tu email"
              />
            </span>
            <small
              v-if="user.email === '' && submitted === true"
              class="p-error"
              >El email es requerido</small
            >
          </div>

          <label class="form-label" for="#password">Contraseña</label>
          <span class="p-input-icon-left">
            <i class="icons-form"
              ><img
                draggable="false"
                src="@assets/svg/icon/lock.svg"
                class="material-symbols-rounded"
            /></i>
            <InputText
              type="password"
              class="p-inputtext-sm"
              :class="{
                'p-invalid': user.password === '' && submitted === true,
              }"
              v-model="user.password"
              placeholder="Ingresa tu contraseña"
            />
          </span>
          <small
            v-if="user.password === '' && submitted === true"
            class="p-error"
            >La contraseña es requerida</small
          >
        </div>

        <div id="btnInferior">
          <router-link to="/forgotPass"
            ><span id="linkOlvido">¿Olvidaste la contraseña?</span></router-link
          >
          <div class="btnSubmit">
            <input
              class="form-submit"
              type="button"
              @click="toAccess"
              value="Ingresar"
            />
          </div>
        </div>
        <p id="Terms">
          Al iniciar sesión, acepta los
          <a href="#"
            >Términos de uso y reconoce la Política de privacidad y la Política
            de cookies.</a
          >
        </p>
      </form>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@import url("./login.scss");
</style>
