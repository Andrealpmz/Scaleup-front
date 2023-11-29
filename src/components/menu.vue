<template>
    <div class="hamburger-menu">
      <div class="menu-icon" @click="toggleMenu">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
      <ul v-if="isOpen" class="menu-items">
        <li><a href="#">Item 1</a></li>
        <li><a href="#">Item 2</a></li>
        <li><a href="#">Item 3</a></li>
        <li><a href="#">Item 4</a></li>
      </ul>
    </div>
  </template>
  
  
  <script setup lang="ts">
  import { ref } from "vue";
  const isOpen = ref(false);
  
  const toggleMenu = () => {
    isOpen.value = !isOpen.value;
  };
  </script>
  
  <style scoped>
  .hamburger-menu {
    position: fixed;
    left: 0;
    top: 0;
    width: 60px; /* Ancho del menú vertical */
    background: #333; /* Color de fondo */
    padding: 10px;
    display: flex;
    flex-direction: column; /* Establece la dirección de la columna para el menú vertical */
    align-items: flex-start; /* Alinea los elementos a la izquierda */
    height: 100%; /* Altura del menú que se extiende a lo largo de la pantalla */
  }
  
  .menu-icon {
    cursor: pointer;
  }
  
  .bar {
    width: 25px;
    height: 3px;
    background-color: #fff; /* Color de las barras */
    margin: 5px 0;
  }
  
  .menu-items {
    list-style: none;
    padding: 0;
    margin: 0;
    position: absolute;
    left: 60px; /* Ancho del menú vertical más el espacio */
    top: 0;
    background: #fff; /* Color del menú desplegable */
    border: 1px solid #333;
    border-left: none; /* Elimina el borde izquierdo para que parezca que el menú está junto al icono */
    border-radius: 0 5px 5px 0; /* Bordes redondeados a la derecha */
    z-index: 100;
    height: 100%; /* Altura del menú que se extiende a lo largo de la pantalla */
    overflow: auto; /* Agrega desplazamiento si el contenido es más largo que la altura del menú */
  }
  
  .menu-items li {
    margin: 10px 20px;
  }
  
  .menu-items a {
    text-decoration: none;
    color: #333;
  }
  
  /* Estilos responsivos */
  .menu-items.responsive {
    display: block;
    position: static;
    border: none;
    height: auto;
    overflow: visible;
  }
  
  @media (min-width: 768px) {
    /* Estilos para dispositivos de escritorio (ancho mínimo de 768px) */
    .menu-items {
      position: static;
      border: none;
      height: auto;
      overflow: visible;
    }
    .menu-icon {
      display: none;
    }
  }
  </style>