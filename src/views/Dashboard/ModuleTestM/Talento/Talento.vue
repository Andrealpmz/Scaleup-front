<script lang="ts" setup>
    import navbarDash from '@components/navbar.vue';
    import { ref } from 'vue';

    const TotalQ = ref<number>(2);
    const QContested = ref<number>(1);
    const widthProgress = ref<number>(50);
    const displayModal = ref<boolean>(false);
    const isOpen = ref<boolean>(false);
    const isOpen2 = ref<boolean>(false);

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
                <div class="CircleS cir4"></div>
                <div class="QuestionsInfo">
                    <h2 class="titleCategory">Organización, comunicación y talento</h2>
                    <p>{{ QContested }} / {{ TotalQ }} preguntas</p>
                    <div class="ProgressQuestionsS">
                        <div class="progress cir4" :style="{width: `${(QContested/TotalQ)*100}%`}"></div>
                    </div>
                </div>
            </div>
            <div class="descQuestion">
                <p>La eficiencia operativa y la colaboración interna son aspectos esenciales para una transformación digital exitosa. Esta categoría evalúa cómo la organización gestiona la comunicación interna, la toma de decisiones ágil y la atracción y retención de talento digital. Preguntas específicas abordan la existencia de canales de comunicación digital, la implementación de metodologías ágiles y el desarrollo de habilidades digitales entre los empleados.</p>
            </div>
            <div class="preguntas">
                <h2 class="titleQuestion">Preguntas</h2>
                <details @toggle="isOpen = !isOpen">
                    <summary>
                        <div class="Question">
                            <div class="iconQuestion cir4">
                                <img src="@assets/svg/Checked.svg">
                            </div>
                            <span class="textQuestion strikethrough">Área de tecnología</span>
                        </div>
                        <div class="btnDetails">
                            <i :class="isOpen ? 'pi pi-angle-up' : 'pi pi-angle-down'"></i>
                        </div>
                    </summary>
                    <div class="contentInfoQ">
                        <div id="items-left">
                            <div class="info">
                                <div class="tips">
                                    <img class="imgTest" draggable="false" src="@assets/svg/TestMaduration/C4/simTest8.svg">
                                    <p id="infoAdvertising">
                                        El área de tecnología es clave para la eficiencia, innovación, seguridad y estrategia de una organización.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="items-right">
                            <div class="info">
                                <p class="paragraph">
                                    ¿Cómo calificas la implementación de tecnología en tu organización para resolver problemas?
                                </p>
                                <p class="InfoContested">¿No tienes idea que contestar? Haz clic <span @click="openModal" class="enlaceInfo">aquí</span> para conocer sobre el tema</p>
                                <div class="optionsBlock">
                                    <button class="btnOptionBlock">SÍ</button>
                                    <button class="btnOptionBlock">No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </details>

                <details @toggle="isOpen = !isOpen">
                    <summary>
                        <div class="Question">
                            <div class="iconQuestion cir4">
                                <img src="@assets/svg/Checked.svg">
                            </div>
                            <span class="textQuestion strikethrough">Área de tecnología</span>
                        </div>
                        <div class="btnDetails">
                            <i :class="isOpen ? 'pi pi-angle-up' : 'pi pi-angle-down'"></i>
                        </div>
                    </summary>
                    <div class="contentInfoQ">
                        <div id="items-left">
                            <div class="info">
                                <div class="tips">
                                    <img class="imgTest" draggable="false" src="@assets/svg/TestMaduration/C4/simTestBool.svg">
                                    <p id="infoAdvertising">
                                        La experiencia de los usuarios influye en su satisfacción y lealtad a la marca. Es importante monitorear y mejorarla.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="items-right">
                            <div class="info">
                                <p class="paragraph">
                                    ¿Con cuantas personas cuentas para el área de tecnología?
                                </p>
                                <p class="InfoContested">¿No tienes idea que contestar? Haz clic <span @click="openModal" class="enlaceInfo">aquí</span> para conocer sobre el tema</p>
                                <div class="optionsBlock">
                                    <button class="btnOption b4">1 a 3</button>
                                    <button class="btnOption b4">4 a 6</button>
                                    <button class="btnOption b4">7 a 12</button>
                                    <button class="btnOption b4">13 a 20</button>
                                    <button class="btnOption b4">21 a 30</button>
                                    <button class="btnOption b4">31 a 50</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </details>

                <details @toggle="isOpen = !isOpen">
                    <summary>
                        <div class="Question">
                            <div class="iconQuestion cir4">
                                <img src="@assets/svg/Checked.svg">
                            </div>
                            <span class="textQuestion strikethrough">Área de tecnología</span>
                        </div>
                        <div class="btnDetails">
                            <i :class="isOpen ? 'pi pi-angle-up' : 'pi pi-angle-down'"></i>
                        </div>
                    </summary>
                    <div class="contentInfoQ">
                        <div id="items-left">
                            <div class="info">
                                <div class="tips">
                                    <img class="imgTest" draggable="false" src="@assets/svg/TestMaduration/C4/simTestBool2.svg">
                                    <p id="infoAdvertising">
                                        El área de tecnología es clave para la eficiencia, innovación, seguridad y estrategia de una organización.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="items-right">
                            <div class="info">
                                <p class="paragraph">
                                    ¿Consideras adecuado el nivel de conocimientos digitales del personal de tu negocio?
                                </p>
                                <p class="InfoContested">¿No tienes idea que contestar? Haz clic <span @click="openModal" class="enlaceInfo">aquí</span> para conocer sobre el tema</p>
                                <div class="optionsBlock">
                                    <button class="btnOptionBlock">Somos referentes de nuestro sector!</button>
                                    <button class="btnOptionBlock">Vamos en la dirección correcta</button>
                                    <button class="btnOptionBlock">Avanzando, pero mucho por mejorar</button>
                                    <button class="btnOptionBlock">Hemos dado algunos pasos</button>
                                    <button class="btnOptionBlock">Estamos en ceros</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </details>

                <details @toggle="isOpen = !isOpen">
                    <summary>
                        <div class="Question">
                            <div class="iconQuestion cir4">
                                <img src="@assets/svg/Checked.svg">
                            </div>
                            <span class="textQuestion strikethrough">Área de tecnología</span>
                        </div>
                        <div class="btnDetails">
                            <i :class="isOpen ? 'pi pi-angle-up' : 'pi pi-angle-down'"></i>
                        </div>
                    </summary>
                    <div class="contentInfoQ">
                        <div id="items-left">
                            <div class="info">
                                <div class="tips">
                                    <img class="imgTest" draggable="false" src="@assets/svg/TestMaduration/C4/simTestBool3.svg">
                                    <p id="infoAdvertising">
                                        El comercio electrónico es una parte fundamental de cualquier estrategia de negocios moderna y es esencial para mantenerse relevante y competitivo en el mercado actual.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="items-right">
                            <div class="info">
                                <p class="paragraph">
                                    ¿El personal de tu negocio está motivado frente al reto de la transformación digital?
                                </p>
                                <p class="InfoContested">¿No tienes idea que contestar? Haz clic <span @click="openModal" class="enlaceInfo">aquí</span> para conocer sobre el tema</p>
                                <div class="optionsBlock">
                                    <button class="btnOptionBlock">Somos referentes de nuestro sector!</button>
                                    <button class="btnOptionBlock">Vamos en la dirección correcta</button>
                                    <button class="btnOptionBlock">Avanzando, pero mucho por mejorar</button>
                                    <button class="btnOptionBlock">Hemos dado algunos pasos</button>
                                    <button class="btnOptionBlock">Estamos en ceros</button>
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