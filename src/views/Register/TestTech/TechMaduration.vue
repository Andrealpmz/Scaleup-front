<script setup lang="ts">
    import MTresultado from './MTresultado.vue';
    import { ref, onMounted} from 'vue';
    import 'animate.css';
    import { TestObject } from './TestObject';

    const step = ref(0);
    const test = [] as TestObject[];
    const porcent = ref(0);
    const progress = ref(0);
    const boolStep7 = ref(false);
    const boolStep12 = ref(false);
    const totalQuestions = 23;
    const numberTotal = ref(0);

    onMounted(() => {
        porcent.value = 100/totalQuestions;
        progress.value = porcent.value;
        const formStatus = 'en_progreso';
    })

    function btnBack() {
        if(step.value === 11){
            step.value = step.value - ((boolStep7.value === true) ? 1 : 4)
            progress.value -= porcent.value * ((boolStep7.value === true) ? 1 : 4);
        }else if(step.value === 14){
            step.value = step.value - ((boolStep12.value === true) ? 1 : 2)
            progress.value -= porcent.value * ((boolStep12.value === true) ? 1 : 2);
        }else {
            step.value--;
            progress.value -= porcent.value;
        }
    }

    function captureData(i: number, index: number){

        //Valor númerico asignado por pregunta
        if(step.value === 0 || step.value === 23 || step.value === 8){
            data[i].value = (index + 1);
        }else if(step.value === 1){
            if (index % 2 == 0) {
                data[i].value = 2 + ((index / 2) * 2);
            } else {
                data[i].value = (1 + ((index - 1) / 2)) * 2;
            }
        }else if(step.value === 7 || step.value === 3 || step.value === 12 || step.value === 21){
            data[i].value = data[i].value + ((index === 0) ? 1 : 0);
        }else{
            data[i].value = 10 - (index * 2);
        }

        // Lógica de progreso de preguntas
        if(step.value === 7){
            step.value = step.value + ((index === 0) ? 1 : 4)
            progress.value += porcent.value * ((index === 0) ? 1 : 4);
            boolStep7.value = ((index === 0) ? true : false);
        }else if(step.value === 12){
            step.value = step.value + ((index === 0) ? 1 : 2)
            progress.value += porcent.value * ((index === 0) ? 1 : 2);
            boolStep12.value = ((index === 0) ? true : false);
        }else {
            step.value++;
            progress.value += porcent.value;
        }

        //Guardado en objeto por pregunta
        const testM = {
            category_id : data[i].category_id,
            category : data[i].category,
            question : data[i].question,
            answer : {
                content : data[i].answers[index],
                value : data[i].value,
            }
        }

        numberTotal.value += data[i].value;
        console.log('Valor total: ' + numberTotal.value);
        console.log('Porcentaje: ' + (numberTotal.value/178)*100 + '%');
        test.push(testM);
    }

    const imgs = [
        {src: "http://localhost:5173/src/assets/images/TestMaduration/C1/simTest1.png", info: 'Los colaboradores son clave, trabajan juntos y brindan innovación. La empresa valora a sus colaboradores y brinda un buen entorno.'},
        {src: "http://localhost:5173/src/assets/images/TestMaduration/C2/simTest2.png", info: 'Para una digitalización exitosa, es necesaria una cultura inclusiva y una estrategia sólida alineada con los objetivos de la organización.'},
        {src: "http://localhost:5173/src/assets/images/TestMaduration/C2/simTest3.png", info: 'Las herramientas digitales son esenciales para la eficiencia y éxito de una organización, permiten automatización, mejoran comunicación y acceso a información en tiempo real.'},
        {src: "http://localhost:5173/src/assets/svg/TestMaduration/C2/simTest4.svg", info: 'Implementar tecnología en una organización puede mejorar eficiencia, toma de decisiones y operaciones, maximizando resultados de la inversión y llevando a la vanguardia de la innovación.'},
        {src: "http://localhost:5173/src/assets/svg/TestMaduration/C3/simTest5.svg", info: 'La innovación es crucial para mantenerse relevante en el mercado. Se trata de crear nuevas formas de mejorar la eficiencia y efectividad de la empresa.'},
        {src: "http://localhost:5173/src/assets/svg/TestMaduration/C3/simTest6.svg", info: 'Implementar canales digitales mejora eficiencia, satisfacción y seguridad. Es clave en la era digital.'},
        {src: "http://localhost:5173/src/assets/svg/TestMaduration/C3/simTest7.svg", info: 'Los canales digitales son una herramienta poderosa para vender productos y servicios en una organización.'},
        {src: "http://localhost:5173/src/assets/svg/TestMaduration/C4/simTest8.svg", info: 'El área de tecnología es clave para la eficiencia, innovación, seguridad y estrategia de una organización.'},
        {src: "http://localhost:5173/src/assets/svg/TestMaduration/C4/simTestBool.svg", info: 'La experiencia de los usuarios influye en su satisfacción y lealtad a la marca. Es importante monitorear y mejorarla.'},
        {src: "http://localhost:5173/src/assets/svg/TestMaduration/C4/simTestBool2.svg", info: 'El área de tecnología es clave para la eficiencia, innovación, seguridad y estrategia de una organización.'},
        {src: "http://localhost:5173/src/assets/svg/TestMaduration/C4/simTestBool3.svg", info: 'El comercio electrónico es una parte fundamental de cualquier estrategia de negocios moderna y es esencial para mantenerse relevante y competitivo en el mercado actual.'},
        {src: "http://localhost:5173/src/assets/svg/TestMaduration/C5/simTest9.svg", info: 'La digitalización de productos y servicios es esencial para cualquier organización que busque mantenerse relevante y competitiva en el mercado actual.'},
        {src: "http://localhost:5173/src/assets/images/TestMaduration/C5/simTest10.png", info: 'La conexión a internet es importante para mantener a una organización relevante y competitiva. Mejora la comunicación, la productividad y la eficiencia y brinda acceso a nuevas oportunidades de negocios y tecnologías.'},
        {src: "http://localhost:5173/src/assets/images/TestMaduration/C5/simTest11.png", info: 'La seguridad informática es clave para proteger la información y mejorar la eficiencia de una organización.'},
        {src: "http://localhost:5173/src/assets/svg/TestMaduration/C6/simTest12.svg", info: 'La infraestructura en la nube permite a las organizaciones acceder a recursos informáticos a través de Internet, con ventajas como escalabilidad, reducción de costos, seguridad y continuidad de negocios.'},
        {src: "http://localhost:5173/src/assets/svg/TestMaduration/C6/simTest13.svg", info: 'La automatización de los procesos mejora la eficiencia y productividad, libera tiempo y recursos, reduce errores y mejora la consistencia de los procesos, permitiendo a las organizaciones ser más eficientes y competitivas.'},
        {src: "http://localhost:5173/src/assets/svg/TestMaduration/C6/simTest14.svg", info: 'La toma de decisiones efectiva es crítica en una organización, y requiere un proceso estructurado basado en datos y análisis, participación de diferentes perspectivas y colaboración entre equipos.'},
        {src: "http://localhost:5173/src/assets/svg/TestMaduration/C7/simTest15.svg", info: 'La tecnología ayuda a la ejecución y ajuste de los procesos internos de una organización al automatizar tareas, brindar visibilidad y control, lo que resulta en una mayor eficiencia y productividad.'},
        {src: "http://localhost:5173/src/assets/svg/TestMaduration/C7/simTest16.svg", info: 'La conexión a internet es importante para mantener a una organización relevante y competitiva. Mejora la comunicación, la productividad y la eficiencia y brinda acceso a nuevas oportunidades de negocios y tecnologías.'},
        {src: "http://localhost:5173/src/assets/svg/TestMaduration/C7/simTest17.svg", info: 'Para una digitalización exitosa, es necesaria una cultura inclusiva y una estrategia sólida alineada con los objetivos de la organización.'},
        {src: "http://localhost:5173/src/assets/svg/TestMaduration/C8/simTest18.svg", info: 'El comercio electrónico es una parte fundamental de cualquier estrategia de negocios moderna y es esencial para mantenerse relevante y competitivo en el mercado actual.'},
        {src: "http://localhost:5173/src/assets/svg/TestMaduration/C8/simTest19.svg", info: 'Al invertir en una infraestructura de seguridad sólida, una organización se protege contra ataques y fortalece la confianza de los clientes.'},
        {src: "http://localhost:5173/src/assets/svg/TestMaduration/C8/simTest20.svg", info: 'La innovación puede aumentar la productividad, mejorar la oferta y mantener a la empresa a la vanguardia. Es importante monitorear y mejorarla.'},
    ];

    const data = [
        { category_id: 1, category: 'Organización', question: '¿Cuántos colaboradores hacen parte de tu equipo?', content: '', value: 0, answers: ['1 a 10', '11 a 25', '26 a 50', '51 a 80', '81 a 100', '101 a 500']},
        { category_id: 2, category: 'Estrategía y cultura', question: '¿En qué medida implementa herramientas digitales en su organización (CRM automatizado, Sistemas de gestión, sistemas de auditoría, etc.)?', content: '', value: 0, answers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']},
        { category_id: 2, category: 'Estrategía y cultura', question: '¿Cómo calificas la implementación de tecnología en tu organización para resolver problemas?', content: '', value: 0, answers: ['Somos referentes de nuestro sector!', 'Vamos en la dirección correcta', 'Avanzando, pero mucho por mejorar', 'Hemos dado algunos pasos', 'Estamos en ceros']},
        { category_id: 2, category: 'Estrategía y cultura', question: 'Tu organización es reactiva ( atender problemas cuando ya han causado consecuencias) o proactivo (se logran atener los problemas antes de que sucedan previniendo daños y consecuencias)', content: '', value: 0, answers: ['Proactiva', 'Reactiva']},
        { category_id: 3, category: 'Experiencia del cliente o usuario', question: '¿En qué medida implementas canales digitales formales (no WhatsApp, entre otros) para la comunicación externa e interna en tu organización?', content: '', value: 0, answers: ['Somos referentes de nuestro sector!', 'Vamos en la dirección correcta', 'Avanzando, pero mucho por mejorar', 'Hemos dado algunos pasos', 'Estamos en ceros']},
        { category_id: 3, category: 'Experiencia del cliente o usuario', question: '¿En qué medida usas canales digitales para vender tus productos y servicios?', content: '', value: 0, answers: ['Somos referentes de nuestro sector!', 'Vamos en la dirección correcta', 'Avanzando, pero mucho por mejorar', 'Hemos dado algunos pasos', 'Estamos en ceros']},
        { category_id: 3, category: 'Experiencia del cliente o usuario', question: '¿En qué medida usas tecnología para mejorar la experiencia de tus usuarios o clientes?', content: '', value: 0, answers: ['Somos referentes de nuestro sector!', 'Vamos en la dirección correcta', 'Avanzando, pero mucho por mejorar', 'Hemos dado algunos pasos', 'Estamos en ceros']},
        { category_id: 4, category: 'Organización, comunicación y talento', question: '¿Cuentas con un área de tecnología?', content: '', value: 0, answers: ['Sí', 'No']},
        { category_id: 4, category: 'Organización, comunicación y talento', question: '¿Con cuantas personas cuentas para el área de tecnología?', content: '', value: 0, answers: ['1 a 3', '4 a 6', '7 a 12', '13 a 20', '21 a 30', '31 a 50']},
        { category_id: 4, category: 'Organización, comunicación y talento', question: '¿Consideras adecuado el nivel de conocimientos digitales del personal de tu negocio?', content: '', value: 0, answers: ['Somos referentes de nuestro sector!', 'Vamos en la dirección correcta', 'Avanzando, pero mucho por mejorar', 'Hemos dado algunos pasos', 'Estamos en ceros']},
        { category_id: 4, category: 'Organización, comunicación y talento', question: '¿El personal de tu negocio está motivado frente al reto de la transformación digital?', content: '', value: 0, answers: ['Somos referentes de nuestro sector!', 'Vamos en la dirección correcta', 'Avanzando, pero mucho por mejorar', 'Hemos dado algunos pasos', 'Estamos en ceros']},
        { category_id: 5, category: 'Productos y servicios', question: '¿Es digital la presentación de los productos y/o servicios que prestas a tus cliente', content: '', value: 0, answers: ['Somos referentes de nuestro sector!', 'Vamos en la dirección correcta', 'Avanzando, pero mucho por mejorar', 'Hemos dado algunos pasos', 'Estamos en ceros']},
        { category_id: 5, category: 'Productos y servicios', question: '¿Cuántos productos digitales tiene implementados en su organizacion?', content: '', value: 0, answers: ['Sí', 'No']},
        { category_id: 5, category: 'Productos y servicios', question: '¿Qué tan importante es la tecnología en el valor que aportan tus productos y servicios?', content: '', value: 0, answers: ['Somos referentes de nuestro sector!', 'Vamos en la dirección correcta', 'Avanzando, pero mucho por mejorar', 'Hemos dado algunos pasos', 'Estamos en ceros']},
        { category_id: 6, category: 'Infraestructura tecnológica', question: '¿Ha definido estandares y/o procesos de seguridad informática en la organización?', content: '', value: 0, answers: ['Somos referentes de nuestro sector!', 'Vamos en la dirección correcta', 'Avanzando, pero mucho por mejorar', 'Hemos dado algunos pasos', 'Estamos en ceros']},
        { category_id: 6, category: 'Infraestructura tecnológica', question: 'En que medida implementa tu negocio infraestructura en la nube', content: '', value: 0, answers: ['Somos referentes de nuestro sector!', 'Vamos en la dirección correcta', 'Avanzando, pero mucho por mejorar', 'Hemos dado algunos pasos', 'Estamos en ceros']},
        { category_id: 6, category: 'Infraestructura tecnológica', question: '¿Qué proveedores Cloud implementa en su organización?', content: '', value: 0, answers: ['AWS', 'GCP', 'Azure', 'Digital Ocean', 'Otros']},
        { category_id: 7, category: 'Procesos', question: '¿En qué grado se encuentran automatizados tus procesos de negocio?', content: '', value: 0, answers: ['Somos referentes de nuestro sector!', 'Vamos en la dirección correcta', 'Avanzando, pero mucho por mejorar', 'Hemos dado algunos pasos', 'Estamos en ceros']},
        { category_id: 7, category: 'Procesos', question: '¿En qué nivel tu negocio procesa y tomas decisiones con los datos que recopiles?', content: '', value: 0, answers: ['Somos referentes de nuestro sector!', 'Vamos en la dirección correcta', 'Avanzando, pero mucho por mejorar', 'Hemos dado algunos pasos', 'Estamos en ceros']},
        { category_id: 7, category: 'Procesos', question: '¿En qué medida la tecnología te ayuda a ejecutar, ajustar y mejorar los procesos internos del negocio?', content: '', value: 0, answers: ['Somos referentes de nuestro sector!', 'Vamos en la dirección correcta', 'Avanzando, pero mucho por mejorar', 'Hemos dado algunos pasos', 'Estamos en ceros']},
        { category_id: 8, category: 'Información y datos', question: '¿En que grado se encuentra digitalizada la informacion de tu organizacion?', content: '', value: 0, answers: ['Somos referentes de nuestro sector!', 'Vamos en la dirección correcta', 'Avanzando, pero mucho por mejorar', 'Hemos dado algunos pasos', 'Estamos en ceros']},
        { category_id: 8, category: 'Información y datos', question: '¿Cuenta con tableros de análisis de datos en su organización?', content: '', value: 0, answers: ['Sí', 'No', 'No sé']},
        { category_id: 8, category: 'Información y datos', question: '¿Cuántas bases de datos maneja dentro de su organización?', content: '', value: 0, answers: ['1 a 3', '4 a 5', '5 a 10', '10 a 20', '20 o más']}
    ];
</script>

<template>
    <div class="returnMobile">
        <span @click="btnBack()" id="btnReturnMobile" v-if="step > 0 && step != 23">
            <i class="pi pi-arrow-left material-symbols-outlined"></i>
        </span>
    </div>
    <nav id="header" v-if="step != 23">
        <img src="@assets/svg/ScaleUp-logo.svg" draggable="false" class="logo">
    </nav>
    <div v-for="(dataT, i) in data" :key="i">
        <div v-if="step != 23" :class="'progressBar Bar' + step" :style="{width: progress + '%'}"></div>

        <div v-show="step === i" class="testContent animate__animated animate__slideInUp">
            <div id="items-left">
                <div class="info">
                    <div class="tips">
                        <div v-for="(img, idI) in imgs" :key="idI">
                            <img v-if="idI === i" id="imagenSimTest" draggable="false" :src="img.src" style="margin-bottom: 20px;" />
                            <p v-if="idI === i" id="infoAdvertising">
                                {{ img.info }}
                            </p> 
                        </div>
                    </div>
                </div>
            </div>
            <div class="items-right">
                <div class="info questions">
                    <div class="return">
                        <span @click="btnBack()" id="btnReturn" v-if="step > 0">
                            <i class="pi pi-angle-left material-symbols-outlined"></i>
                            Volver
                        </span>
                    </div>
                    <h1 :class="'titulo t'+(dataT.category_id)">{{ dataT.category }}</h1>
                    <p class="paragraph">{{ dataT.question }}</p>
                    <div class="options" v-if="i === 0 || i === 22 || i === 8">
                        <div class="ThreeColumns">
                            <button v-for="(dataA, index) in data[i].answers" :key="index" @click="captureData(i, index)" :class="'btnOption b'+(dataT.category_id)">{{ dataA }}</button>
                        </div>
                    </div>
                    <div class="ScaleBox" v-if="i === 1">
                        <div class="blocNums">
                            <div v-for="(dataA, index) in data[i].answers" :key="index" class="btnOptionScale b2Number" @click="captureData(i, index)">
                                <small class="numberBtn">{{ dataA }}</small>
                            </div>
                        </div>
                    </div>
                    <div class="optionsBlock" v-for="(dataA, index) in data[i].answers" v-if="i != 0 && i != 1 && i != 8 && i != 22">
                        <button @click="captureData(i, index)" :class="'btnOptionBlock b'+(dataT.category_id)">{{ dataA }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="step === 23">
        <MTresultado :sendTest="test"/>
    </div>
</template>

<style scoped>
    @import url('./test.scss');
</style>