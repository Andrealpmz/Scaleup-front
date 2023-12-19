<script lang="ts" setup>
import { onMounted, ref } from "vue";
import hotkeys from "hotkeys-js";
import navbarDash from "@components/navbar.vue";
import menuList from "@components/navbar.vue";
import { signOut } from "firebase/auth";
//import numberTotal from "../../Register/TestTech/TechMaduration.vue";

onMounted(() => {
//  console.log("checkFormStatus");
//  checkFormStatus();
})

const qData = [
        { title: 'Organizacion', total: 2, contested: 1, nameLink: 'Organization'},
        { title: 'Estrategía y cultura', total: 3, contested: 3, nameLink: 'Strategy-Culture'},
        { title: 'Experiencia del cliente o usuario', total: 3, contested: 3, nameLink: 'ClientExperience'},
        { title: 'Organizacion, comunicación y talento', total: 4, contested: 4, nameLink: 'OrgCulTalent'},
        { title: 'Productos y servicios', total: 3, contested: 3, nameLink: 'Product-Services'},
        { title: 'Infraestructura y tecnología', total: 4, contested: 4, nameLink: 'InfraTec'},
        { title: 'Procesos', total: 4, contested: 4, nameLink: 'Process'},
        { title: 'Información y datos', total: 3, contested: 3, nameLink: 'Info-Data'}
    ];

const allQuestionsAnswered = ref(false);

// Calcular la propiedad calculada
const calculateAllQuestionsAnswered = () => {
  const totalContested = qData.reduce(
    (acc, category) => acc + category.contested,
    0
  );
  const totalQuestions = qData.reduce(
    (acc, category) => acc + category.total,
    0
  );
  allQuestionsAnswered.value = totalContested === totalQuestions;
};

calculateAllQuestionsAnswered(); // Llamar a la función para calcularlo inicialmente

const isFocused = ref<boolean>(false);
const search = ref<string>("");
const searchInput = ref();

const btnGridFocused = ref<boolean>(true);
const btnListFocused = ref<boolean>(false);
const displayGrid = ref<boolean>(true);
const svg1Color = ref("#BABFC5");
const svg2Color = ref("#576DD3");
const userDataJSON = localStorage.getItem('userData');

console.log(userDataJSON);

hotkeys("command+k", onKeyDown);
hotkeys("control+k", onKeyDown);
hotkeys("shift+7", onKeyDown);

function onKeyDown() {
  isFocused.value = true;
  searchInput.value.focus();
}

function toggleButton(btnClicked: string) {
  if (btnClicked === "list") {
    btnListFocused.value = true;
    btnGridFocused.value = false;
    svg1Color.value = "#576DD3";
    svg2Color.value = "#BABFC5";
    displayGrid.value = false;
  } else if (btnClicked === "grid") {
    btnGridFocused.value = true;
    btnListFocused.value = false;
    displayGrid.value = true;
    svg2Color.value = "#576DD3";
    svg1Color.value = "#BABFC5";
  }
}

function deleteWords() {
  search.value = "";
}

const checkFormStatus = () => {
      
      const formStatus = 'en_progreso';

      switch (formStatus) {
        case 'en_progreso':
          // Show an alert to complete the test and provide a button
          const confirmMessage = 'Completa el test antes de ver más detalles. ¿Quieres ir al test ahora?';
          if (window.confirm(confirmMessage)) {
            // Redirect to the TechnologyReadiness page
            window.location.href = '/TechnologyReadiness';
          }
          break;
        default:
          // Handle other cases or do nothing
      }
    };

const numberTotal = ref(54);
const porcentajeRedondeado = ref(0);
function descargarInforme() {
            const porcentaje = (numberTotal.value / 178) * 100;
            const porcentajeRedondeado = Math.round(porcentaje);

            console.log('Valor total: ' + porcentaje);
            console.log('Valor total: ' + porcentajeRedondeado);

            if (porcentajeRedondeado >= 0 && porcentajeRedondeado <= 30) {
                window.open('https://drive.google.com/file/d/1AGR-PkoTv22YRcTkt_hYM3rLVOu8F65c/view?usp=sharing', '_blank');
            } else if (porcentajeRedondeado >= 31 && porcentajeRedondeado <= 60) {
                window.open('https://drive.google.com/file/d/1IxiSBIY76AMP3VQYtX_cB0dZk7RKA2kU/view?usp=share_link', '_blank');
            } else if (porcentajeRedondeado >= 61 && porcentajeRedondeado <= 80) {
                window.open('https://drive.google.com/file/d/1JE_vEnV15Z2T_8ikq1_siZjldA9nMz0q/view?usp=share_link', '_blank');
            } else if (porcentajeRedondeado >= 81 && porcentajeRedondeado <= 100) {
                window.open('https://drive.google.com/file/d/1T33hD0zKKrHI0S51gSjLJCOss49Dv5Si/view?usp=share_link', '_blank');
            } else {
                alert("Porcentaje no válido para descarga.");
            }
            return porcentajeRedondeado;
        }
</script>

<template>
  <navbarDash />
  <div id="Content">
    <div class="searchBox">
      <div class="conInput" v-on:keydown="onKeyDown">
        <img
          v-if="search === ''"
          draggable="false"
          class="SearchSVG"
          src="@assets/svg/search.svg"
        />
        <input
          type="text"
          ref="searchInput"
          aria-label="Search"
          v-model="search"
          draggable="false"
          :style="
            search !== ''
              ? { marginLeft: '10px', transition: 'none' }
              : { marginLeft: '0' }
          "
          :class="{ focusedInput: isFocused === true || search != '' }"
          @focus="isFocused = true"
          @blur="isFocused = false"
          placeholder="Buscar categorías"
        />
        <button v-if="search != ''" class="buttonClose">
          <img
            class="btnClose"
            @click="deleteWords"
            draggable="false"
            src="@assets/svg/close.svg"
          />
        </button>
      </div>
    </div>

    <div class="optionsInfo">
      <h2 class="titulo">Categorías Test Madurez</h2>
      <div class="layout elementRight">
        <div class="buttonsAlign">
          <button
            @click="toggleButton('list')"
            class="btnlist"
            :class="{ selected: btnListFocused === true }"
          >
            <i class="pi pi-list" :style="{ color: svg1Color }"></i>
          </button>
          <button
            class="btnGrid"
            @click="toggleButton('grid')"
            :class="{ selected: btnGridFocused === true }"
          >
            <i class="pi pi-th-large" :style="{ color: svg2Color }"></i>
          </button>
        </div>
      </div>
    </div>

    <div v-if="displayGrid === true" id="Categories">
      <router-link
        v-for="(category, i) in qData"
        :key="i"
        :to="'/CategoriesTest/' + category.nameLink"
      >
        <div class="cardCategory">
          <div class="dataCategory">
            <div class="Circle" :class="'cir' + (i + 1)"></div>
            <div class="QuestionsInfo">
              <h2 class="titleCategory">{{ category.title }}</h2>
              <p>{{ category.contested }} / {{ category.total }} preguntas</p>
              <div class="ProgressQuestions">
                <div
                  class="progress"
                  :class="'cir' + (i + 1)"
                  :style="{
                    width: `${(category.contested / category.total) * 100}%`,
                  }"
                ></div>
              </div>
            </div>
          </div>
          <p class="desc">
            Aquí se encontrara una pequeña descripción de la categoría
          </p>
          <div class="SectionBottom">
            <div
              v-if="category.contested != category.total"
              class="CategoryStatus"
            >
              Incompleto
            </div>
            <div
              v-if="category.contested === category.total"
              class="CategoryCompleted"
            >
              Completo
            </div>
            <button :class="`btnMore C${i + 1}`">Ver más</button>
          </div>
        </div>
      </router-link>
    </div>

    <div v-if="displayGrid === false" id="CategoriesList">
      <table class="tableStyle">
        <thead>
          <tr>
            <th>Categorías</th>
            <th>Preguntas</th>
            <th>Progreso</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody class="contentTable">
          <tr
            v-for="(data, i) in qData"
            class="itemHover"
            v-bind:class="{ Zebra: i % 2 === 0 }"
          >
            <td>
              <div class="titleQuestionL">
                <div :class="'circleList cir' + (i + 1)"></div>
                {{ data.title }}
              </div>
            </td>
            <td>
              <p>{{ data.contested }} / {{ data.total }}</p>
            </td>
            <td>
              <div class="ProgressQuestionsL">
                <div
                  :class="'progress cir' + (i + 1)"
                  :style="{ width: `${(data.contested / data.total) * 100}%` }"
                ></div>
              </div>
            </td>
            <td>
              <div
                v-if="data.contested != data.total"
                class="CategoryStatus center"
              >
                Incompleto
              </div>
              <div
                v-if="data.contested === data.total"
                class="CategoryCompleted center"
              >
                Completo
              </div>
            </td>
            <td>
              <router-link :to="'/CategoriesTest/' + data.nameLink">
                <button :class="`btnMore center C${i + 1}`" @click="">
                  Ver más
                </button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <div v-if="allQuestionsAnswered">
        <h2 class="titulo">Resultado test de maduración</h2>
            <div class="optionsInfoT">
                <div class="resultTestT">
                    <div class="dataCategoryT">
                        <h2>Diagnóstico de Madurez Tecnológica</h2>
                        <p>Tu porcentaje de madurez es:  </p>
                        <button id="downloadBtn" @click="descargarInforme">Descargar Informe</button>
                    </div>
                      <div class="imageContainer">
                        <!-- Tu imagen aquí -->
                        <img src="http://localhost:5173/src/assets/images/TestMaduration/C5/simTest10.png" alt="Descripción de la imagen">
                      </div>
                </div>
            </div>
      </div>
      <p v-else><router-link to="/TechnologyReadiness" tag="button" id="downloadBtn">
        Completa todo el test para obtener tu resultado.
      </router-link></p>
      
    </div>
  </div>
</template>

<style scoped>
@import url("./Categories.scss");
</style>
