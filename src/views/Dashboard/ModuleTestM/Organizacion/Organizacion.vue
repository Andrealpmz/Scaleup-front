<script lang="ts" setup>
    import navbarDash from '@components/navbar.vue';
    import { ref } from 'vue';

    const TotalQ = ref<number>(1);
    const QContested = ref<number>(0);
    const widthProgress = ref<number>(50);
    const displayModal = ref<boolean>(false);
    const isOpen = ref<boolean>(false);
    const isOpen2 = ref<boolean>(false);

    const local_user = localStorage.getItem('userData');
const obj_local_user = JSON.parse(local_user);

if (obj_local_user.form === 'en_progreso') {
        QContested.value = 0;
  }
   else if (obj_local_user.form === 'terminado') {
    QContested.value = TotalQ.value;
  }

    function openModal() {
        displayModal.value = true;
    }

    function close() {
        displayModal.value = false;
    }
</script>

<template>
    <navbarDash/>
    
    <div class="Modal" v-if="displayModal" :modal="true">
       <div class="containerModal">
        <div class="dialog-header">
            <button class="btnCloseModal" @click="close"><i class="pi pi-times iconX"></i></button>
        </div>
        <p class="textModal">La implementación de herramientas digitales en una organización puede mejorar
            significativamente su eficiencia, ya que permiten automatizar procesos y reducir
            el tiempo y esfuerzo necesarios para realizar tareas cotidianas. Además, estas 
            herramientas también pueden mejorar la precisión y la calidad de los datos,
            lo que puede inpactar en mejores decisiones y una mayor satisfacción del cliente.
        </p>
       </div>
    </div>

    <div id="ContentQuestion">
        <div class="sub-header">
            <router-link to="/CategoriesTest">
                <button class="btnBackQuestions">
                    <i class="pi pi-arrow-left"></i>Volver
                </button>
            </router-link>
        </div>

        <div class="cardCategorySelected">
            <div class="SectionBottom layoutRight">
                <div v-if="QContested != TotalQ" class="CategoryStatusS">Incompleto</div>
                <div v-if="QContested === TotalQ" class="CategoryCompletedS">Completo</div>
            </div>
            <div class="dataCategory marginTop">
                <div class="CircleS cir1"></div>
                <div class="QuestionsInfo">
                    <h2 class="titleCategory">Organización</h2>
                    <p>{{ QContested }} / {{ TotalQ }} preguntas</p>
                    <div class="ProgressQuestionsS">
                        <div class="progress cir1" :style="{width: `${(QContested/TotalQ)*100}%`}"></div>
                    </div>
                </div>
            </div>
            <div class="descQuestion">
                <p>En la actualidad, las empresas que no se adaptan a los avances tecnológicos pueden quedar rezagadas en un mercado cada vez más competitivo.<br><br>
    
                Por lo tanto, es importante que las empresas implementen estrategias de transformación digital que les permitan mejorar la eficiencia, reducir costos,
                mejorar la satisfacción del cliente y, en última instancia, crecer y expandirse.<br><br>
    
                Las preguntas específicas que se realizan en este formulario están diseñadas para evaluar la capacidad de la empresa para llevar a cabo su transformación digital. 
                Por ejemplo, se pregunta sobre el grado de implementación de herramientas digitales, la estrategia de marketing digital, la presencia en redes sociales y la formación del personal en tecnologías digitales. Estas preguntas ayudan a la 
                empresa a comprender su nivel de madurez digital y a identificar áreas de mejora para avanzar en su transformación digital.</p>
            </div>
            <div class="preguntas">
                <h2 class="titleQuestion">Preguntas</h2>
                <details @toggle="isOpen = !isOpen">
                    <summary>
                        <div class="Question">
                            <div class="iconQuestion cir1">
                                <img src="@assets/svg/Checked.svg">
                            </div>
                            <span class="textQuestion">Cantidad de colaboradores</span>
                        </div>
                        <div class="btnDetails">
                            <i :class="isOpen ? 'pi pi-angle-up' : 'pi pi-angle-down'"></i>
                        </div>
                    </summary>
                    <div class="contentInfoQ">
                        <div id="items-left">
                            <div class="info">
                                <div class="tips">
                                    <img class="imgTest" draggable="false" src="@assets/images/TestMaduration/C1/simTest1.png">
                                    <p id="infoAdvertising">
                                        Para una digitalización exitosa, es necesaria una cultura inclusiva 
                                        y una estrategia sólida alineada con los objetivos de la organización.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="items-right">
                            <div class="info">
                                <p class="paragraph">
                                    ¿Cuántos colaboradores hacen parte de tu equipo?
                                </p>
                                <p class="InfoContested">¿No tienes idea que contestar? Haz clic <span @click="openModal" class="enlaceInfo">aquí</span> para conocer sobre el tema</p>
                                <div class="optionsBlock">
                                    <div class="staticOptionBlock">1 a 10</div>
                                    <div class="staticOptionBlock">11 a 25</div>
                                    <div class="staticOptionBlock">26 a 50</div>
                                    <div class="staticOptionBlock">51 a 80</div>
                                    <div class="staticOptionBlock">81 a 100</div>
                                    <div class="staticOptionBlock">101 a 500</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </details>

            </div>
        </div>
    </div>
</template>

<style scoped>
    @import url('../Categories.scss');
</style>