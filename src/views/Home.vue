<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import gql from 'graphql-tag'
  import { useQuery } from '@vue/apollo-composable';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const boolMenu = ref(false);

  function burgerOpen() {
    boolMenu.value = true;
  }

  function btnClose() {
    boolMenu.value = false;
  }

  const CHARACTERS_QUERY = gql`
   query {
      getOneOrganization(nit: "0-10954545676"){
        nit
        name_org
        name
        last_name
        email
        phone
        country
        city
        password
      }
    }
  `
const { result, loading, error } = useQuery(CHARACTERS_QUERY);
</script>

<template>
  <div class="principal">
      <div class="Banner">
        <div id="LinearBack">
          <div v-show="boolMenu === true" class="backgroundBurger"></div>
          <div class="boxLogo">
            <img src="@assets/svg/ScaleUp-logo-blanco.svg" draggable="false" class="logo">
          </div>
          <div class="close">
            <button class="buttonBurgerMenu burger"><i @click="burgerOpen" class="pi pi-bars"></i></button>
          </div>
          <header class="headerScale">
            <nav class="menu" :class="{'Open': boolMenu === true}">
              <div class="close">
                <button v-show="boolMenu === true" @click="btnClose" class="buttonCloseMenu"><i class="pi pi-times"></i></button>
              </div>
              <ul class="menuItems">
                <li class="item">Inicio</li>
                <li class="item">Producto</li>
                <li class="item">Soluciones</li>
                <li class="item">Precio</li>
                <li class="item">
                  <router-link to="/login">
                    <button type="button" class="Login" value="Ingresar">Ingresar</button>
                  </router-link>
                </li>
                <router-link to="/register">
                  <button type="button" class="register" value="Registrate">Registrate</button>
                </router-link>
              </ul>
            </nav>
          </header>
          <div class="TextBanner">
            <div class="itemsBlock">
              <h1 class="title">¡Hola! <br>¿Estás listo para llevar tu idea al siguiente nivel?</h1>
              <p class="paragraphBanner">
                No esperes más para unirte a la revolución digital. ¡Con ScaleUp, el futuro de tu negocio está a solo unos clics de distancia! 
                Contáctanos hoy mismo para obtener más información y solicitar una demostración gratuita. ¡Hagamos que tu negocio brille en el 
                mundo digital!
              </p>
              <button class="btnStart">Inicia con nosotros</button>
            </div>
          </div>
          <div class="imageSection">
            <img class="imageBanner" draggable="false" src="@assets/images/Landing/image_dash_recorted.png">
          </div>
        </div>
        <div class="diagonalDesign"></div>
      </div>
  
      <div class="Test">
        <h1>Conceptualiza tus ideas desde cero al éxito</h1>
        <p class="paragraphTitle">Impulsa el éxito con herramientas de transformación digital que integran, innovan y gestionan tus iniciativas en tiempo real.</p>
  
        <div class="cards">
          <div class="cardSingle">
            <div class="circle"><span>1</span></div>
            <div class="content">
              <img draggable="false" src="@assets/svg/Landing/VectorFocus.svg" class="vectorCards" alt="">
              <h2>Crear iniciativas</h2>
              <p>Desarrolla tus ideas en un entorno intuitivo y fácil de usar, diseñado específicamente para la creación 
                de iniciativas y startups exitosas.</p>
            </div>
          </div>
          <div class="cardSingle">
            <div class="circle"><span>2</span></div>
            <div class="content">
              <img draggable="false" src="@assets/svg/Landing/VectorLine.svg" class="vectorCards" alt="">
              <h2>Entérate de tu etapa</h2>
              <p>Controla la evolución de tu proyecto con actualizaciones en tiempo real y herramientas de análisis de desempeño, 
                asegurándote de que tu negocio avance en la dirección correcta</p>
            </div>
          </div>
          <div class="cardSingle">
            <div class="circle"><span>3</span></div>
            <div class="content">
              <img draggable="false" src="@assets/svg/Landing/VectorTeam.svg" class="vectorCards" alt="">
              <h2>Colaboración en equipo</h2>
              <p>Invita a tu equipo y colabora en el diseño y desarrollo de tu startup. Comparte ideas, asigna tareas y monitorea el progreso 
                de cada miembro para garantizar la eficiencia del trabajo en equipo.</p>
            </div>
          </div>
        </div>
      </div>
  
      <div id="section3">
        <h1>Análisis de <span class="colorBlue">Transformación Digital</span></h1>
        <p class="paragraphSection p3">Abraza el futuro: analiza, transforma y digitaliza tu negocio hoy.</p>
        <img draggable="false" src="@assets/svg/Landing/PreviewViews.svg" alt="">
      </div>

      <div class="section4">
        <h1 class="titleSection">Innovación y Crecimiento </h1>
        <p class="paragraphSection">Un enfoque dinámico y adaptable para impulsar la innovación, transformar desafíos en oportunidades y co-crear soluciones a medida que permitan a las empresas alcanzar el éxito sostenible en un mundo en constante cambio</p>
        <div class="twoColumns">
          <div class="left">
            <div class="itemsListSection4">
              <div class="circleList"><img draggable="false" src="@assets/svg/Landing/clock-time.svg"></div> 
              <p><b>Automatizar procesos:</b>  ahorra tiempo y recursos al automatizar tareas repetitivas y procesos de negocio</p>
            </div>
            <div class="itemsListSection4">
              <div class="circleList"><img draggable="false" src="@assets/svg/Landing/chart-line.svg"></div>
              <p><b>Analizar datos:</b>  Obtén información valiosa de tus datos con nuestras herramientas de análisis avanzadas.</p>
            </div>
            <div class="itemsListSection4">
              <div class="circleList"><img draggable="false" src="@assets/svg/Landing/data-integration.svg"></div> 
              <p><b>Integración y colaboración:</b> Integra fácilmente nuestras soluciones con tus sistemas y aplicaciones existentes</p>
            </div>
            <div class="itemsListSection4">
              <div class="circleList"><img draggable="false" src="@assets/svg/Landing/Vector.svg"></div> 
              <p><b>Escalabilidad:</b> Herramientas que pueden escalar para adaptarse al crecimiento de una organización.</p>
            </div>
          </div>
          <div class="right">
            <img id="imageLeft" draggable="false" src="@assets/svg/TestMaduration/simRegister.svg">
          </div>
      </div>
    </div>

    <div class="footer">
      <div class="logoInfo">
        <img src="@assets/svg/ScaleUp-logo-blanco.svg" draggable="false" class="logo">
        <p class="infoFooter">Experimentamos la innovación como una cultura, no como un procedimiento.</p>
      </div>
      <div class="rightFooter">
        <div class="networks">
          <a href="https://www.facebook.com/GraciaLab.co"><img src="@assets/svg/Landing/facebook.svg" class="netw"/></a>
          <a href="http://instagram.com/gracialab.co"><img src="@assets/svg/Landing/instagram.svg" class="netw"/></a>
          <a href="https://wa.me/573188618626"><img src="@assets/svg/Landing/whatsapp.svg" class="netw"/></a>
          <a href="https://www.linkedin.com/company/gracialab"><img src="@assets/svg/Landing/linkedin.svg" class="netw"/></a>
        </div>
        <div class="footerDetails">
          <p>Copyright © 2023</p>
          <p>Politica de servicio</p>
          <p>Términos de servicio</p>
        </div>
      </div>
    </div>
    
  </div>
</template>

<style scoped>
  @import url('./OnBoard.scss');
</style>