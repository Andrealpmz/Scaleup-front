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
                <div class="CircleS cir3"></div>
                <div class="QuestionsInfo">
                    <h2 class="titleCategory">Experiencia del cliente o usuario</h2>
                    <p>{{ QContested }} / {{ TotalQ }} preguntas</p>
                    <div class="ProgressQuestionsS">
                        <div class="progress cir3" :style="{width: `${(QContested/TotalQ)*100}%`}"></div>
                    </div>
                </div>
            </div>
            <div class="descQuestion">
                <p>La experiencia del cliente se ha vuelto fundamental en la era digital. Esta categoría evalúa cómo la empresa aborda las expectativas y necesidades de sus clientes a través de canales digitales. Preguntas clave incluyen la facilidad de navegación en plataformas digitales, la personalización de servicios en línea, y la atención a los comentarios y quejas de los clientes. La mejora continua de la experiencia del cliente digital es esencial para mantener la lealtad y la satisfacción del cliente.</p>
            </div>
            <div class="preguntas">
                <h2 class="titleQuestion">Preguntas</h2>
                <details @toggle="isOpen = !isOpen">
                    <summary>
                        <div class="Question">
                            <div class="iconQuestion cir3">
                                <img src="@assets/svg/Checked.svg">
                            </div>
                            <span class="textQuestion">Canales digitales</span>
                        </div>
                        <div class="btnDetails">
                            <i :class="isOpen ? 'pi pi-angle-up' : 'pi pi-angle-down'"></i>
                        </div>
                    </summary>
                    <div class="contentInfoQ">
                        <div id="items-left">
                            <div class="info">
                                <div class="tips">
                                    <img class="imgTest" draggable="false" src="@assets/svg/TestMaduration/C3/simTest5.svg">
                                    <p id="infoAdvertising">
                                        La innovación es crucial para mantenerse relevante en el mercado. Se trata de crear nuevas formas de mejorar la eficiencia y efectividad de la empresa.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="items-right">
                            <div class="info">
                                <p class="paragraph">
                                    ¿En qué medida implementas canales digitales formales (no WhatsApp, entre otros) para la comunicación externa e interna en tu organización?
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
                            <div class="iconQuestion cir3">
                                <img src="@assets/svg/Checked.svg">
                            </div>
                            <span class="textQuestion">Canales digitales</span>
                        </div>
                        <div class="btnDetails">
                            <i :class="isOpen ? 'pi pi-angle-up' : 'pi pi-angle-down'"></i>
                        </div>
                    </summary>
                    <div class="contentInfoQ">
                        <div id="items-left">
                            <div class="info">
                                <div class="tips">
                                    <img class="imgTest" draggable="false" src="@assets/svg/TestMaduration/C3/simTest6.svg">
                                    <p id="infoAdvertising">
                                        Implementar canales digitales mejora eficiencia, satisfacción y seguridad. Es clave en la era digital.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="items-right">
                            <div class="info">
                                <p class="paragraph">
                                    ¿En qué medida usas canales digitales para vender tus productos y servicios?
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
                            <div class="iconQuestion cir3">
                                <img src="@assets/svg/Checked.svg">
                            </div>
                            <span class="textQuestion">Canales digitales</span>
                        </div>
                        <div class="btnDetails">
                            <i :class="isOpen ? 'pi pi-angle-up' : 'pi pi-angle-down'"></i>
                        </div>
                    </summary>
                    <div class="contentInfoQ">
                        <div id="items-left">
                            <div class="info">
                                <div class="tips">
                                    <img class="imgTest" draggable="false" src="@assets/svg/TestMaduration/C3/simTest7.svg">
                                    <p id="infoAdvertising">
                                        Los canales digitales son una herramienta poderosa para vender productos y servicios en una organización.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="items-right">
                            <div class="info">
                                <p class="paragraph">
                                    ¿En qué medida usas tecnología para mejorar la experiencia de tus usuarios o clientes?
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