<template>
    <nav id="header">
        <img src="@/assets/svg/ScaleUp-logo.svg" draggable="false" class="logo">
    </nav>
    <article id="content">
        <div id="items-left">
            <div class="info">
                <img id="imageLeft" draggable="false" src="@/assets/svg/TestMaduration/simRegister.svg">
            </div>
        </div>
        <div class="items-right">
            <div class="info">
                <p id="texto">Te invitamos a responder nuestra encuesta para evaluar tu madurez
                tecnológica. Esta encuesta te ayudará a conocer cuál es tu nivel de 
                familiaridad con la tecnología y cómo puedes mejorar tu uso de 
                la misma en el futuro.</p>
                <div id="button">
                    <router-link to="/TechnologyReadiness">
                        <button id="btnStart">Comencemos</button>
                    </router-link>
                </div>
            </div>
        </div>
    </article>
</template>

<style scoped>
    @import url('./test.scss');
</style>