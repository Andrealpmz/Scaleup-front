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
                <div class="CircleS cir5"></div>
                <div class="QuestionsInfo">
                    <h2 class="titleCategory">Productos y servicios</h2>
                    <p>{{ QContested }} / {{ TotalQ }} preguntas</p>
                    <div class="ProgressQuestionsS">
                        <div class="progress cir5" :style="{width: `${(QContested/TotalQ)*100}%`}"></div>
                    </div>
                </div>
            </div>
            <div class="descQuestion">
                <p>En un mundo digital, la oferta de productos y servicios debe adaptarse a las demandas del mercado y las tendencias tecnológicas. Esta categoría analiza la oferta actual de la empresa en términos de innovación digital. Preguntas relevantes incluyen la introducción de nuevos productos digitales, la integración de tecnologías emergentes en los servicios existentes y la capacidad de la empresa para mantenerse a la vanguardia en su sector.</p>
            </div>
            <div class="preguntas">
                <h2 class="titleQuestion">Preguntas</h2>
                <details @toggle="isOpen = !isOpen">
                    <summary>
                        <div class="Question">
                            <div class="iconQuestion cir5">
                                <img src="@assets/svg/Checked.svg">
                            </div>
                            <span class="textQuestion strikethrough">Presentación digital</span>
                        </div>
                        <div class="btnDetails">
                            <i :class="isOpen ? 'pi pi-angle-up' : 'pi pi-angle-down'"></i>
                        </div>
                    </summary>
                    <div class="contentInfoQ">
                        <div id="items-left">
                            <div class="info">
                                <div class="tips">
                                    <img class="imgTest" draggable="false" src="@assets/svg/TestMaduration/C5/simTest9.svg">
                                    <p id="infoAdvertising">
                                        La digitalización de productos y servicios es esencial para cualquier organización que busque mantenerse relevante y competitiva en el mercado actual.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="items-right">
                            <div class="info">
                                <p class="paragraph">
                                    ¿Es digital la presentación de los productos y/o servicios que prestas a tus clientes?
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
                            <div class="iconQuestion cir5">
                                <img src="@assets/svg/Checked.svg">
                            </div>
                            <span class="textQuestion strikethrough">Presentación digital</span>
                        </div>
                        <div class="btnDetails">
                            <i :class="isOpen ? 'pi pi-angle-up' : 'pi pi-angle-down'"></i>
                        </div>
                    </summary>
                    <div class="contentInfoQ">
                        <div id="items-left">
                            <div class="info">
                                <div class="tips">
                                    <img class="imgTest" draggable="false" src="@assets/images/TestMaduration/C5/simTest10.png">
                                    <p id="infoAdvertising">
                                        La conexión a internet es importante para mantener a una organización relevante y competitiva. Mejora la comunicación, la productividad y la eficiencia y brinda acceso a nuevas oportunidades de negocios y tecnologías.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="items-right">
                            <div class="info">
                                <p class="paragraph">
                                    ¿Cuántos productos digitales tiene implementados en su organizacion?
                                </p>
                                <p class="InfoContested">¿No tienes idea que contestar? Haz clic <span @click="openModal" class="enlaceInfo">aquí</span> para conocer sobre el tema</p>
                                <div class="optionsBlock">
                                    <button class="btnOptionBlock">Sí</button>
                                    <button class="btnOptionBlock">No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </details>
               
                <details @toggle="isOpen = !isOpen">
                    <summary>
                        <div class="Question">
                            <div class="iconQuestion cir5">
                                <img src="@assets/svg/Checked.svg">
                            </div>
                            <span class="textQuestion strikethrough">Presentación digital</span>
                        </div>
                        <div class="btnDetails">
                            <i :class="isOpen ? 'pi pi-angle-up' : 'pi pi-angle-down'"></i>
                        </div>
                    </summary>
                    <div class="contentInfoQ">
                        <div id="items-left">
                            <div class="info">
                                <div class="tips">
                                    <img class="imgTest" draggable="false" src="@assets/images/TestMaduration/C5/simTest11.png">
                                    <p id="infoAdvertising">
                                        La seguridad informática es clave para proteger la información y mejorar la eficiencia de una organización.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="items-right">
                            <div class="info">
                                <p class="paragraph">
                                    ¿Qué tan importante es la tecnología en el valor que aportan tus productos y servicios?
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