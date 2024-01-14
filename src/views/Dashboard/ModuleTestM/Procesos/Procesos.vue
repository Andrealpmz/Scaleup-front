<script lang="ts" setup>
    import navbarDash from '@components/navbar.vue';
    import { ref } from 'vue';

    const TotalQ = ref<number>(3);
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
                <div class="CircleS cir7"></div>
                <div class="QuestionsInfo">
                    <h2 class="titleCategory">Procesos</h2>
                    <p>{{ QContested }} / {{ TotalQ }} preguntas</p>
                    <div class="ProgressQuestionsS">
                        <div class="progress cir7" :style="{width: `${(QContested/TotalQ)*100}%`}"></div>
                    </div>
                </div>
            </div>
            <div class="descQuestion">
                <p>La eficiencia operativa y la agilidad en la ejecución de procesos son cruciales para la competitividad de una empresa en el entorno digital. Esta categoría evalúa cómo la organización planifica, implementa y optimiza sus procesos internos. Se exploran aspectos como la automatización de tareas, la adopción de metodologías ágiles, y la medición continua del rendimiento operativo. </p>
            </div>
            <div class="preguntas">
                <h2 class="titleQuestion">Preguntas</h2>
                <details @toggle="isOpen = !isOpen">
                    <summary>
                        <div class="Question">
                            <div class="iconQuestion cir7">
                                <img src="@assets/svg/Checked.svg">
                            </div>
                            <span class="textQuestion">Procesos técnologicos</span>
                        </div>
                        <div class="btnDetails">
                            <i :class="isOpen ? 'pi pi-angle-up' : 'pi pi-angle-down'"></i>
                        </div>
                    </summary>
                    <div class="contentInfoQ">
                        <div id="items-left">
                            <div class="info">
                                <div class="tips">
                                    <img class="imgTest" draggable="false" src="@assets/svg/TestMaduration/C7/simTest15.svg">
                                    <p id="infoAdvertising">
                                        La tecnología ayuda a la ejecución y ajuste de los procesos internos de una organización al automatizar tareas, brindar visibilidad y control, lo que resulta en una mayor eficiencia y productividad.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="items-right">
                            <div class="info">
                                <p class="paragraph">
                                    ¿En qué grado se encuentran automatizados tus procesos de negocio?
                                </p>
                                <p class="InfoContested">¿No tienes idea que contestar? Haz clic <span @click="openModal" class="enlaceInfo">aquí</span> para conocer sobre el tema</p>
                                <div class="optionsBlock">
                                    <div class="staticOptionBlock">Somos referentes de nuestro sector!</div>
                                    <div class="staticOptionBlock">Vamos en la dirección correcta</div>
                                    <div class="staticOptionBlock">Avanzando, pero mucho por mejorar</div>
                                    <div class="staticOptionBlock">Hemos dado algunos pasos</div>
                                    <div class="staticOptionBlock">Estamos en ceros</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </details>

                <details @toggle="isOpen = !isOpen">
                    <summary>
                        <div class="Question">
                            <div class="iconQuestion cir7">
                                <img src="@assets/svg/Checked.svg">
                            </div>
                            <span class="textQuestion">Procesos técnologicos</span>
                        </div>
                        <div class="btnDetails">
                            <i :class="isOpen ? 'pi pi-angle-up' : 'pi pi-angle-down'"></i>
                        </div>
                    </summary>
                    <div class="contentInfoQ">
                        <div id="items-left">
                            <div class="info">
                                <div class="tips">
                                    <img class="imgTest" draggable="false" src="@assets/svg/TestMaduration/C7/simTest16.svg">
                                    <p id="infoAdvertising">
                                        La conexión a internet es importante para mantener a una organización relevante y competitiva. Mejora la comunicación, la productividad y la eficiencia y brinda acceso a nuevas oportunidades de negocios y tecnologías.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="items-right">
                            <div class="info">
                                <p class="paragraph">
                                    ¿En qué nivel tu negocio procesa y tomas decisiones con los datos que recopiles?
                                </p>
                                <p class="InfoContested">¿No tienes idea que contestar? Haz clic <span @click="openModal" class="enlaceInfo">aquí</span> para conocer sobre el tema</p>
                                <div class="optionsBlock">
                                    <div class="staticOptionBlock">Somos referentes de nuestro sector!</div>
                                    <div class="staticOptionBlock">Vamos en la dirección correcta</div>
                                    <div class="staticOptionBlock">Avanzando, pero mucho por mejorar</div>
                                    <div class="staticOptionBlock">Hemos dado algunos pasos</div>
                                    <div class="staticOptionBlock">Estamos en ceros</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </details>

                <details @toggle="isOpen = !isOpen">
                    <summary>
                        <div class="Question">
                            <div class="iconQuestion cir7">
                                <img src="@assets/svg/Checked.svg">
                            </div>
                            <span class="textQuestion">Procesos técnologicos</span>
                        </div>
                        <div class="btnDetails">
                            <i :class="isOpen ? 'pi pi-angle-up' : 'pi pi-angle-down'"></i>
                        </div>
                    </summary>
                    <div class="contentInfoQ">
                        <div id="items-left">
                            <div class="info">
                                <div class="tips">
                                    <img class="imgTest" draggable="false" src="@assets/svg/TestMaduration/C7/simTest17.svg">
                                    <p id="infoAdvertising">
                                        Para una digitalización exitosa, es necesaria una cultura inclusiva y una estrategia sólida alineada con los objetivos de la organización.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="items-right">
                            <div class="info">
                                <p class="paragraph">
                                    ¿En qué medida la tecnología te ayuda a ejecutar, ajustar y mejorar los procesos internos del negocio?
                                </p>
                                <p class="InfoContested">¿No tienes idea que contestar? Haz clic <span @click="openModal" class="enlaceInfo">aquí</span> para conocer sobre el tema</p>
                                <div class="optionsBlock">
                                    <div class="staticOptionBlock">Somos referentes de nuestro sector!</div>
                                    <div class="staticOptionBlock">Vamos en la dirección correcta</div>
                                    <div class="staticOptionBlock">Avanzando, pero mucho por mejorar</div>
                                    <div class="staticOptionBlock">Hemos dado algunos pasos</div>
                                    <div class="staticOptionBlock">Estamos en ceros</div>
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