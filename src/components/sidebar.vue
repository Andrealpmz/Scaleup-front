<script setup lang="ts">

</script>

<template>
    <nav class="v-navigation-drawer">
        <div class="v-navigation-drawer__content">
            <div class="nav-header">
                <img src="@/assets/svg/ScaleUp-logo.svg" draggable="false" class="logo">
            </div>
            <ul class="list">
                <li class="nav-link">
                    <div class="nav-link router-link-active">
                        <span class="nav-item-title">
                            <i class="icon-active pi pi-home"></i>
                            Dashboard
                        </span>
                    </div>
                </li>
                <li class="nav-link">
                    <span class="nav-item-title">
                        <i class="icon pi pi-cog"></i>
                        Ajustes de cuenta
                    </span>
                </li>
                <li class="nav-section-title">
                    <div class="title-wrapper">
                        <span class="title-text">Pages</span>
                    </div>
                </li>
                <li class="nav-link">
                    <span class="nav-item-title">
                        <i class="icon pi pi-briefcase"></i>
                        Proyectos
                    </span>
                </li>
                <li class="nav-link">
                    <span class="nav-item-title">
                        <i class="icon pi pi-users"></i>
                        Miembros
                    </span>
                </li>
                <li class="nav-link">
                    <span class="nav-item-title">
                        <i class="icon pi pi-book"></i>
                        Test de madurez
                    </span>
                </li>
                <li class="nav-section-title"></li>
            </ul>
        </div>
    </nav>
</template>

<style scoped>
    .v-navigation-drawer{
        -webkit-overflow-scrolling: touch;
        display: flex;
        flex-direction: column;
        height: 100%;
        max-width: 100%;
        pointer-events: auto;
        box-shadow: 0 0 0 0 rgba(58,53,65, 0.08),0 0 0 0 rgba(58,53,65, 0.12),0 0 0 0 rgba(58,53,65, 0.04);
        background: #F1F2F9;
        color: rgb(58, 53, 65);
        position: absolute;
        left: 0;
        top: 0;
        width: 256px;
    }

    .list {
        margin: 0;
        margin-left: -40px;
    }

    .router-link-active {
        background: linear-gradient(270deg,#3853ce 0%,rgb(222, 152, 255) 300%);
        color: #FFF;
        box-shadow: 0 3px 3px -2px rgba(58,53,65, 0.08);
    }

    .router-link-active::before {
        opacity: calc(.04 * 1);
    }

    .title-wrapper {
        display: flex;
    }

    .title-text {
        width: 276px;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content:flex-start;
        column-gap: 0.625rem;
        text-transform: uppercase;
        margin-top: 15px;
        margin-bottom: 15px;
        font-size: .75rem;
        font-weight: 400;
        color: rgb(158, 157, 166);
        letter-spacing: .4px;
        font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    }

    .title-text::before {
        border-block-end: 1px solid rgba(50, 46, 56, 0.12);
        content: "";
        width: 13px;
        display: flex;
        align-items: center;
    }

    .title-text::after {
        border-block-end: 1px solid rgba(58, 53, 65, 0.12);
        content: "";
        text-decoration: inherit;
        vertical-align: inherit;
        display: flex;
        width: 62%;
        align-items: center;
    }

    .nav-item-title {
        padding-inline: 1.375rem;
        letter-spacing: .15px;
        display: flex;
        gap: 10px;
        align-items: center;
    }

    .icon-active {
        color: #fff;
    }

   i {
        align-items: center;
        display: inline-flex;
        font-feature-settings: "liga";
        height: 1em;
        justify-content: center;
        letter-spacing: normal;
        line-height: 1;
        position: relative;
        text-indent: 0;
        user-select: none;
        vertical-align: middle;
        width: 1em;
   }

    .nav-section-title {
        margin-block: 0;
        margin-inline: 0 1.125rem;
        padding-block: 0;
        white-space: nowrap;
        list-style: none;
    }

    .nav-link {
        overflow: hidden;
        border-end-end-radius: 3.125rem;
        border-start-end-radius: 3.125rem;
        margin-block-end: 0.375rem;
        list-style: none;
        height: 42px;
        width: 100%;
        text-align: left;
        margin-top: 7px;
        display: flex;
        align-items: center;
    }
    
    .nav-link:hover {
        background: #EAEAF1;
        cursor: pointer;
    }

    .nav-header{
        overflow: hidden;
        padding: 1rem 0.25rem 1rem 1.375rem;
        margin-inline: 0 1.125rem;
        min-block-size: 64px;
        transition: transform .25s ease-in-out;
    }

    .nav-header img {
        width: 150px;
        display: flex;
        justify-content: left;
        margin-left: 10px;
        margin-top: 10px;
    }

    .v-navigation-drawer__content{
        display: flex;
        flex-direction: column;
        flex: 0 1 auto;
        height: 100%;
        max-width: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }
</style>