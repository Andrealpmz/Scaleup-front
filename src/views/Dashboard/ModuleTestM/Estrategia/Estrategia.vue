<script lang="ts" setup>
    import navbarDash from '@components/navbar.vue';
    import { ref } from 'vue';

    const TotalQ = ref<number>(2);
    const QContested = ref<number>(1);
    const widthProgress = ref<number>(50);
    const displayModal = ref<boolean>(false);
    const displayModal2 = ref<boolean>(false);
    const displayModal3 = ref<boolean>(false);
    const isOpen = ref<boolean>(false);
    const isOpen2 = ref<boolean>(false);

    function openModal() {
        displayModal.value = true;
    }

    function openModal2() {
        displayModal2.value = true;
    }

    function openModal3() {
        displayModal3.value = true;
    }

    function close() {
        displayModal.value = false;
        displayModal2.value = false;
        displayModal3.value = false;
    }
    
</script>

<template>
    <navbarDash/>
    
    <div class="Modal" v-if="displayModal" :modal="true">
       <div class="containerModal">
        <div class="dialog-header">
            <button class="btnCloseModal" @click="close"><i class="pi pi-times iconX"></i></button>
        </div>
        <p class="textModal1">hola
        </p>
       </div>
    </div>

    <div class="Modal" v-if="displayModal2" :modal="true">
       <div class="containerModal">
        <div class="dialog-header">
            <button class="btnCloseModal" @click="close"><i class="pi pi-times iconX"></i></button>
        </div>
        <p class="textModal1">hola 2
        </p>
       </div>
    </div>

    <div class="Modal" v-if="displayModal3" :modal="true">
       <div class="containerModal">
        <div class="dialog-header">
            <button class="btnCloseModal" @click="close"><i class="pi pi-times iconX"></i></button>
        </div>
        <p class="textModal1">hola 3
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
                <div class="CircleS cir2"></div>
                <div class="QuestionsInfo">
                    <h2 class="titleCategory">Estrategía y Cultura</h2>
                    <p>{{ QContested }} / {{ TotalQ }} preguntas</p>
                    <div class="ProgressQuestionsS">
                        <div class="progress cir2" :style="{width: `${(QContested/TotalQ)*100}%`}"></div>
                    </div>
                </div>
            </div>
            <div class="descQuestion">
                <p>En un entorno empresarial en constante evolución, la adaptabilidad y la cultura organizacional desempeñan un papel crucial en el éxito de la transformación digital. 
                    Evaluar la estrategia y cultura de una empresa implica analizar la alineación de los objetivos de la organización con sus iniciativas digitales, así como la capacidad de los empleados para adaptarse a los cambios tecnológicos. Preguntas específicas en esta categoría exploran aspectos como la claridad de la visión digital, la participación de los empleados en la innovación y la existencia de programas de capacitación para fomentar una cultura digital.</p>
            </div>
            <div class="preguntas">
                <h2 class="titleQuestion">Preguntas</h2>
                <details @toggle="isOpen = !isOpen">
                    <summary>
                        <div class="Question">
                            <div class="iconQuestion cir2">
                                <img src="@assets/svg/Checked.svg">
                            </div>
                            <span class="textQuestion strikethrough">Herramientas digitales</span>
                        </div>
                        <div class="btnDetails">
                            <i :class="isOpen ? 'pi pi-angle-up' : 'pi pi-angle-down'"></i>
                        </div>
                    </summary>
                    <div class="contentInfoQ">
                        <div id="items-left">
                            <div class="info">
                                <div class="tips">
                                    <img class="imgTest" draggable="false" src="@assets/images/TestMaduration/C2/simTest2.png">
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
                                    ¿En qué medida implementa herramientas digitales en su organización (CRM automatizado, Sistemas de gestión, sistemas de auditoría, etc.)?
                                </p>
                                <p class="InfoContested">¿No tienes idea que contestar? Haz clic <span @click="openModal" class="enlaceInfo">aquí</span> para conocer sobre el tema</p>

                            </div>
                        </div>
                    </div>
                </details>

                <details @toggle="isOpen = !isOpen">
                    <summary>
                        <div class="Question">
                            <div class="iconQuestion cir2">
                                <img src="@assets/svg/Checked.svg">
                            </div>
                            <span class="textQuestion strikethrough">Herramientas digitales</span>
                        </div>
                        <div class="btnDetails">
                            <i :class="isOpen ? 'pi pi-angle-up' : 'pi pi-angle-down'"></i>
                        </div>
                    </summary>
                    <div class="contentInfoQ">
                        <div id="items-left">
                            <div class="info">
                                <div class="tips">
                                    <img class="imgTest" draggable="false" src="@assets/images/TestMaduration/C2/simTest3.png">
                                    <p id="infoAdvertising">
                                        Las herramientas digitales son esenciales para la eficiencia y éxito de una organización, permiten automatización, mejoran comunicación y acceso a información en tiempo real.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="items-right">
                            <div class="info">
                                <p class="paragraph">
                                    ¿Cómo calificas la implementación de tecnología en tu organización para resolver problemas?
                                </p>
                                <p class="InfoContested">¿No tienes idea que contestar? Haz clic <span @click="openModal2" class="enlaceInfo">aquí</span> para conocer sobre el tema</p>
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
                            <div class="iconQuestion cir2">
                                <img src="@assets/svg/Checked.svg">
                            </div>
                            <span class="textQuestion strikethrough">Herramientas digitales</span>
                        </div>
                        <div class="btnDetails">
                            <i :class="isOpen ? 'pi pi-angle-up' : 'pi pi-angle-down'"></i>
                        </div>
                    </summary>
                    <div class="contentInfoQ">
                        <div id="items-left">
                            <div class="info">
                                <div class="tips">
                                    <img class="imgTest" draggable="false" src="@assets/svg/TestMaduration/C2/simTest4.svg">
                                    <p id="infoAdvertising">
                                        Implementar tecnología en una organización puede mejorar eficiencia, toma de decisiones y operaciones, maximizando resultados de la inversión y llevando a la vanguardia de la innovación.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="items-right">
                            <div class="info">
                                <p class="paragraph">
                                    Tu organización es reactiva ( atender problemas cuando ya han causado consecuencias) o proactivo (se logran atener los problemas antes de que sucedan previniendo daños y consecuencias)
                                </p>
                                <p class="InfoContested">¿No tienes idea que contestar? Haz clic <span @click="openModal3" class="enlaceInfo">aquí</span> para conocer sobre el tema</p>
                                <div class="optionsBlock">
                                    <div class="staticOptionBlock">Proactiva</div>
                                    <div class="staticOptionBlock">Reactiva</div>
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