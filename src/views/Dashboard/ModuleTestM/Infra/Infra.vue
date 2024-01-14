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
                <div class="CircleS cir6"></div>
                <div class="QuestionsInfo">
                    <h2 class="titleCategory">Infraestructura y tecnología</h2>
                    <p>{{ QContested }} / {{ TotalQ }} preguntas</p>
                    <div class="ProgressQuestionsS">
                        <div class="progress cir6" :style="{width: `${(QContested/TotalQ)*100}%`}"></div>
                    </div>
                </div>
            </div>
            <div class="descQuestion">
                <p>La base tecnológica de una empresa es fundamental para su capacidad de transformación digital. Esta categoría evalúa la infraestructura tecnológica existente, los procesos digitales, y la gestión de datos. Preguntas específicas exploran la presencia de sistemas robustos, la automatización de procesos, y la calidad y seguridad de la gestión de datos digitales.</p>
            </div>
            <div class="preguntas">
                <h2 class="titleQuestion">Preguntas</h2>
                <details @toggle="isOpen = !isOpen">
                    <summary>
                        <div class="Question">
                            <div class="iconQuestion cir6">
                                <img src="@assets/svg/Checked.svg">
                            </div>
                            <span class="textQuestion">Infraestructura informática</span>
                        </div>
                        <div class="btnDetails">
                            <i :class="isOpen ? 'pi pi-angle-up' : 'pi pi-angle-down'"></i>
                        </div>
                    </summary>
                    <div class="contentInfoQ">
                        <div id="items-left">
                            <div class="info">
                                <div class="tips">
                                    <img class="imgTest" draggable="false" src="@assets/svg/TestMaduration/C6/simTest12.svg">
                                    <p id="infoAdvertising">
                                        La infraestructura en la nube permite a las organizaciones acceder a recursos informáticos a través de Internet, con ventajas como escalabilidad, reducción de costos, seguridad y continuidad de negocios.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="items-right">
                            <div class="info">
                                <p class="paragraph">
                                    ¿Ha definido estandares y/o procesos de seguridad informática en la organización?
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
                            <div class="iconQuestion cir6">
                                <img src="@assets/svg/Checked.svg">
                            </div>
                            <span class="textQuestion">Infraestructura informática</span>
                        </div>
                        <div class="btnDetails">
                            <i :class="isOpen ? 'pi pi-angle-up' : 'pi pi-angle-down'"></i>
                        </div>
                    </summary>
                    <div class="contentInfoQ">
                        <div id="items-left">
                            <div class="info">
                                <div class="tips">
                                    <img class="imgTest" draggable="false" src="@assets/svg/TestMaduration/C6/simTest13.svg">
                                    <p id="infoAdvertising">
                                        La automatización de los procesos mejora la eficiencia y productividad, libera tiempo y recursos, reduce errores y mejora la consistencia de los procesos, permitiendo a las organizaciones ser más eficientes y competitivas.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="items-right">
                            <div class="info">
                                <p class="paragraph">
                                    En que medida implementa tu negocio infraestructura en la nube
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
                            <div class="iconQuestion cir6">
                                <img src="@assets/svg/Checked.svg">
                            </div>
                            <span class="textQuestion">Infraestructura informática</span>
                        </div>
                        <div class="btnDetails">
                            <i :class="isOpen ? 'pi pi-angle-up' : 'pi pi-angle-down'"></i>
                        </div>
                    </summary>
                    <div class="contentInfoQ">
                        <div id="items-left">
                            <div class="info">
                                <div class="tips">
                                    <img class="imgTest" draggable="false" src="@assets/svg/TestMaduration/C6/simTest13.svg">
                                    <p id="infoAdvertising">
                                        La toma de decisiones efectiva es crítica en una organización, y requiere un proceso estructurado basado en datos y análisis, participación de diferentes perspectivas y colaboración entre equipos.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="items-right">
                            <div class="info">
                                <p class="paragraph">
                                    ¿Qué proveedores Cloud implementa en su organización?
                                </p>
                                <p class="InfoContested">¿No tienes idea que contestar? Haz clic <span @click="openModal" class="enlaceInfo">aquí</span> para conocer sobre el tema</p>
                                <div class="optionsBlock">
                                    <button class="btnOptionBlock">AWS</button>
                                    <button class="btnOptionBlock">GCP</button>
                                    <button class="btnOptionBlock">Azure</button>
                                    <button class="btnOptionBlock">Digital Ocean</button>
                                    <button class="btnOptionBlock">Otros</button>
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