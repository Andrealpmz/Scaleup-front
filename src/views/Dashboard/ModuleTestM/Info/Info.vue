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
                <div class="CircleS cir8"></div>
                <div class="QuestionsInfo">
                    <h2 class="titleCategory">Información y datos</h2>
                    <p>{{ QContested }} / {{ TotalQ }} preguntas</p>
                    <div class="ProgressQuestionsS">
                        <div class="progress cir8" :style="{width: `${(QContested/TotalQ)*100}%`}"></div>
                    </div>
                </div>
            </div>
            <div class="descQuestion">
                <p>La gestión efectiva de la información y los datos es esencial en la era digital, donde la toma de decisiones informada depende de la calidad y accesibilidad de los datos. Esta categoría evalúa cómo la empresa aborda la recopilación, almacenamiento y utilización de información crítica. Preguntas clave incluyen la existencia de una estrategia de gestión de datos, la calidad de la información recopilada, y la implementación de tecnologías de análisis de datos.</p>
            </div>
            <div class="preguntas">
                <h2 class="titleQuestion">Preguntas</h2>
                <details @toggle="isOpen = !isOpen">
                    <summary>
                        <div class="Question">
                            <div class="iconQuestion cir8">
                                <img src="@assets/svg/Checked.svg">
                            </div>
                            <span class="textQuestion">Información</span>
                        </div>
                        <div class="btnDetails">
                            <i :class="isOpen ? 'pi pi-angle-up' : 'pi pi-angle-down'"></i>
                        </div>
                    </summary>
                    <div class="contentInfoQ">
                        <div id="items-left">
                            <div class="info">
                                <div class="tips">
                                    <img class="imgTest" draggable="false" src="@assets/svg/TestMaduration/C8/simTest18.svg">
                                    <p id="infoAdvertising">
                                        El comercio electrónico es una parte fundamental de cualquier estrategia de negocios moderna y es esencial para mantenerse relevante y competitivo en el mercado actual.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="items-right">
                            <div class="info">
                                <p class="paragraph">
                                    ¿En que grado se encuentra digitalizada la informacion de tu organizacion?
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
                            <div class="iconQuestion cir8">
                                <img src="@assets/svg/Checked.svg">
                            </div>
                            <span class="textQuestion">Información</span>
                        </div>
                        <div class="btnDetails">
                            <i :class="isOpen ? 'pi pi-angle-up' : 'pi pi-angle-down'"></i>
                        </div>
                    </summary>
                    <div class="contentInfoQ">
                        <div id="items-left">
                            <div class="info">
                                <div class="tips">
                                    <img class="imgTest" draggable="false" src="@assets/svg/TestMaduration/C8/simTest19.svg">
                                    <p id="infoAdvertising">
                                        Al invertir en una infraestructura de seguridad sólida, una organización se protege contra ataques y fortalece la confianza de los clientes.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="items-right">
                            <div class="info">
                                <p class="paragraph">
                                    ¿Cuenta con tableros de análisis de datos en su organización?
                                </p>
                                <p class="InfoContested">¿No tienes idea que contestar? Haz clic <span @click="openModal" class="enlaceInfo">aquí</span> para conocer sobre el tema</p>
                                <div class="optionsBlock">
                                    <div class="staticOptionBlock">Sí</div>
                                    <div class="staticOptionBlock">No</div>
                                    <div class="staticOptionBlock">No sé</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </details>

                <details @toggle="isOpen = !isOpen">
                    <summary>
                        <div class="Question">
                            <div class="iconQuestion cir8">
                                <img src="@assets/svg/Checked.svg">
                            </div>
                            <span class="textQuestion">Información</span>
                        </div>
                        <div class="btnDetails">
                            <i :class="isOpen ? 'pi pi-angle-up' : 'pi pi-angle-down'"></i>
                        </div>
                    </summary>
                    <div class="contentInfoQ">
                        <div id="items-left">
                            <div class="info">
                                <div class="tips">
                                    <img class="imgTest" draggable="false" src="@assets/svg/TestMaduration/C8/simTest20.svg">
                                    <p id="infoAdvertising">
                                        La innovación puede aumentar la productividad, mejorar la oferta y mantener a la empresa a la vanguardia. Es importante monitorear y mejorarla.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="items-right">
                            <div class="info">
                                <p class="paragraph">
                                    ¿Cuántas bases de datos maneja dentro de su organización?
                                </p>
                                <p class="InfoContested">¿No tienes idea que contestar? Haz clic <span @click="openModal" class="enlaceInfo">aquí</span> para conocer sobre el tema</p>
                                <div class="optionsBlock">
                                    <button class="btnOption b4">1 a 3</button>
                                    <button class="btnOption b4">4 a 5</button>
                                    <button class="btnOption b4">5 a 10</button>
                                    <button class="btnOption b4">10 a 20</button>
                                    <button class="btnOption b4">20 o más</button>
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