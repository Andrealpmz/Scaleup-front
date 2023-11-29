<script lang="ts">
export default {
  data() {
    return {
      activeItem: null as null | number, // Especifica que activeItem puede ser null o un número
    };
  },
  methods: {
    selectItem(item: number) { // Especifica el tipo de item como número
      this.activeItem = item;
    },
  },
};
</script>

<template>
     <div>
        <nav class="navbarDash">
        <img src="@assets/svg/ScaleUp-logo.svg" draggable="false" class="logo">
    </nav>
        <ul class="menuList">
        <li :class="{ active: activeItem === 1 }" @click="selectItem(1)">Item 1</li>
        <li :class="{ active: activeItem === 2 }" @click="selectItem(2)">Item 2</li>
        <li :class="{ active: activeItem === 3 }" @click="selectItem(3)">Item 3</li>
        <li :class="{ active: activeItem === 4 }" @click="selectItem(4)">Item 4</li>
        </ul>
    </div>
</template>

<style scoped>
    .logo {
    width: 160px;
    margin-left: 60px;
    cursor: default;
    user-select: none;
}

    .navbarDash {
        box-sizing: border-box;
        position: absolute;
        width: 100%;
        height: 70px;
        left: 0px;
        top: 0px;
        background: #FFFFFF;
        float: left;
        display: flex;
        box-shadow: 0 0.375rem 0.625rem -0.375rem rgb(0 0 0 / 20%);
        z-index: 30;
    }
    .navbarDash p {
        color: #576DD3;
        float: left;
        margin-left: 50px;
        font-size: 24px;
        font-weight: 500;
        font-family: 'Rubik', sans-serif;
    }
    .menuList {
        margin: 100px 0 0;
        padding: 0;
        list-style: none;
    }

    .menuList li {
        padding: 10px;
        color: #576DD3;
        cursor: pointer;
        font-weight: 500;
        font-family: 'Rubik', sans-serif;
        transition: background-color 0.2s, border-radius 0.2s;
    }

    .menuList li:hover {
        background-color: #576DD3;
        color: #FFFFFF;
    }

    .menuList li.active {
        background-color: #576DD3;
        color: #FFFFFF;
        border-radius: 5px;
    }
</style>