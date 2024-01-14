<script lang="ts" setup> 
    import { ref, reactive } from 'vue';
    import InputText from 'primevue/inputtext';
    import InputMask from 'primevue/inputmask';
    import OrgStore from '@src/stores/dataOrganization';
    import { useRouter } from 'vue-router';

    const user = OrgStore();
    const user_data = reactive({
        password2: '',
        code: ''
    })

    const step = ref<number>(1)
    const maxStep = ref<number>(4)
    const validarStep1 = ref<boolean>(false)
    const validarStep2 = ref<boolean>(false)
    const validarStep3 = ref<boolean>(false)
    const business = ['Idea', 'StartUp', 'Pyme', 'Nacional', 'Internacional'];
        
    const isValidEmail = function(val : string) {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || false;
    }

    function nextStep(){
        if(step != maxStep){
            if(step.value === 1){
                validarStep1.value = true;
                if((user.name && user.last_name && user.phone) != '' && isValidEmail(user.email) != false){
                    step.value++
                }                      
            }else if(step.value === 2){
                validarStep2.value = true;
                if((user.name_org && user.type && user.nit && user.city)!= ''){
                    step.value++
                }
            }else if(step.value === 3){
                validarStep3.value = true;
                if((user.password && user_data.password2 && user_data.code)!= ''){
                    if(validatePassword(user.password, user_data.password2)){            
                        step.value++
                    }
                }
            }
            
        }
    }

    const router = useRouter();
    const redirect = ref(false);

    async function sendMutation() {
    const userData = {
        nombre: user.name,
        mail: user.email,
        tel: user.phone,
        company_name: user.name_org,
        company_type: user.type,
        city: user.city,
        nit: user.nit,
        password: user.password,
        category: null,
        total_p: null,
        respuestas_p: null,
        porcentaje: null,
        form: 'sin_iniciar',
    };

    const userDataJSON = JSON.stringify(userData);
    console.log(userDataJSON);

    try {
    const responsePromise = fetch(import.meta.env.VITE_BACKEND + "/auth/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: userDataJSON,
    });

    // Set up a timeout promise for 3 seconds
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error('Timeout'));
        }, 5000);
    });

    // Use Promise.race to race between response and timeout
    const winner = await Promise.race([responsePromise, timeoutPromise]);

    if (winner instanceof Response) {
        // Request was successful
        if (winner.ok) {
            // HTTP status code is in the range 200-299
            console.log('Solicitud exitosa');
            redirect.value = true;
            router.push('/login');
        } else {
            // HTTP status code is not in the range 200-299
            if (winner.status === 400) {
                // Handle specific error for status code 400
                const errorData = await winner.json();
                console.error('Error en la solicitud:', errorData.message);
                alert(errorData.message);
            } else {
                // Handle other HTTP status codes
                console.error('Error en la solicitud. Código de estado:', winner.status);
                alert('Error en el servidor');
            }
        }
    } else {
        // Timeout occurred
        console.error('Timeout: La solicitud ha tardado demasiado');
        alert('La solicitud ha tardado demasiado, por favor recargar');
    }
} catch (error) {
    console.error('Error al realizar la solicitud:', error);
    alert('Error en el servidor');
}
}



    const validatePassword = function (password1: string, password2: string): boolean{
        return password1 === password2;
    }

    function previousStep(){
        if(step.value != 1){
            step.value--
        }
    }
</script>

<template>
    <article id="content">
        <div id="left">
            <div class="elements">
                <div class="sims">
                    <img id="imagen" v-show="step === 1" draggable="false" src="@assets/images/Register/regis-sims1.png"/>
                    <img id="imagen2" v-show="step === 2" draggable="false" src="@assets/images/Register/regis-sims2.png"/>
                    <img id="imagen3" v-show="step === 3" draggable="false" src="@assets/images/Register/regis-sims3.png"/>
                    <img id="imagen2" v-show="step === 4" draggable="false" src="@assets/images/Register/regis-sims4.png"/>
                </div>
               
                <p class="textLeft">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Cras accumsan purus at mauris imperdiet accumsan.
                </p>
            </div>
        </div>
        <div id="right">
            <div class="forum">
                <h1 class="titulo">Inicia aquí con nosotros</h1>
                <div class="card">
                    <form action="">
                        <div id="Stepper">
                            <div id="step1" class="activeStep"><span class="numStep">1</span></div>
                            <div id="barraS1" v-bind:style="step >= 2 ? 'background: #65D4DC; transition: all ease 0.5s':'#EFF0F7; transition: all ease 0.5s'">
                                <div id="initialBar"></div>
                            </div>                          
                            <div id="step2" v-bind:style="step >= 2 ? 'background: #65D4DC; color: #fff; transition: all ease 0.5s;':'#EFF0F7; transition: all ease 0.5s'"><span class="numStep">2</span></div>
                            <div id="barraS2" v-bind:style="step >= 3 ? 'background: #65D4DC':'#EFF0F7; transition: all ease 0.5s'"></div>
                            <div id="step3" v-bind:style="step >= 3 ? 'background: #65D4DC; color: #fff; transition: all ease 0.5s':'#EFF0F7; transition: all ease 0.5s'"><span class="numStep">3</span></div>
                            <div id="barraS3" v-bind:style="step >= 4 ? 'background: #65D4DC':'#EFF0F7; transition: all ease 0.5s'"></div>
                            <div id="step4" v-bind:style="step >= 4 ? 'background: #65D4DC; color: #fff; transition: all ease 0.5s':'#EFF0F7; transition: all ease 0.5s'"><span class="numStep">4</span></div>
                        </div>
                        <hr id="line">
                        <div v-show="step === 1" class="contentForm">
                            <div id="form-title">
                                <h1 class="title-log">Conozcámonos</h1>
                                <p id="linkRegistro">Lorem ipsum dolor sit amet consectetur adipisc.</p>
                            </div>
                            
                            <div class="twoColumns">
                                <div class="inputLeft">
                                    <div class="inputSingle">
                                        <label class="form-label" for="#nombre">Nombre</label>
                                        <span class="p-input-icon-left">
                                            <i class="icons-form"><img draggable="false" src="@assets/svg/icon/person.svg" class="material-symbols-rounded"/></i>
                                            <InputText 
                                                id="name"
                                                type="text" 
                                                :class="{'p-invalid':user.name === '' && validarStep1 === true}"
                                                class="p-inputtext-sm" 
                                                v-model="user.name" 
                                                placeholder="Ingresa tu nombre" />
                                        </span>
                                        <small v-if="user.name === '' && validarStep1 === true" class="p-error">El nombre es requerido</small>
                                    </div>
                                </div>
                                <div class="inputRight">
                                    <div class="inputSingle">
                                        <label class="form-label" for="#nombre">Apellido</label>
                                        <span class="p-input-icon-left">
                                            <i class="icons-form"><img draggable="false" src="@assets/svg/icon/person.svg" class="material-symbols-rounded"/></i>
                                            <InputText 
                                                id="lastName"
                                                type="text" 
                                                :class="{'p-invalid':user.last_name === '' && validarStep1 === true}"
                                                class="p-inputtext-sm" 
                                                v-model="user.last_name" 
                                                placeholder="Ingresa tu apellido" />
                                        </span>
                                        <small v-if="user.last_name === '' && validarStep1 === true" class="p-error">El apellido es requerido</small>
                                    </div>
                                </div>
                            </div>
                            <div class="inputCenter">
                                <div class="inputSingle">
                                    <label class="form-label" for="#email">Correo</label>
                                    <span class="p-input-icon-left">
                                        <i class="icons-form"><img draggable="false" src="@assets/svg/icon/mail.svg" class="material-symbols-rounded"/></i>
                                        <InputText 
                                            id="email"
                                            type="text" 
                                            :class="{'p-invalid': isValidEmail(user.email) === false && validarStep1 === true}"
                                            class="p-inputtext-sm" 
                                            v-model="user.email" 
                                            placeholder="Ingresa tu email" />
                                    </span>
                                    <small v-if="user.email === '' && validarStep1 === true" class="p-error">El email es requerido</small>
                                    <small v-if="isValidEmail(user.email) === false && validarStep1 === true && user.email != ''" class="p-error">El email no es válido</small>
                                </div>

                                <div class="inputSingle">
                                    <label class="form-label" for="#nombre">Telefono</label>
                                    <span class="p-input-icon-left">
                                        <i class="icons-form"><img draggable="false" src="@assets/svg/icon/smartphone.svg" class="material-symbols-rounded"/></i>
                                        <InputMask 
                                            id="phone" 
                                            type="tel"
                                            :class="{'p-invalid':user.phone === '' && validarStep1 === true}"
                                            class="p-inputtext-sm"
                                            mask="(999) 999-9999" 
                                            v-model="user.phone" 
                                            placeholder="Telefono" />
                                    </span>
                                    <small v-if="user.phone === '' && validarStep1 === true" class="p-error">El teléfono es requerido</small>
                                </div>
                            </div>
                        </div> 
                        <div v-show="step === 2" class="contentForm">
                            <div id="form-title">
                                <h1 class="title-log">Ahora conozcamos tu empresa</h1>
                                <p id="linkRegistro">Lorem ipsum dolor sit amet consectetur adipisc.</p>
                                
                                <div class="inputSingle">
                                    <label class="form-label" for="#nombre">Nombre de la compañia</label>
                                    <span class="p-input-icon-left">
                                        <i class="icons-form"><img draggable="false" src="@assets/svg/icon/domain.svg" class="material-symbols-rounded"/></i>
                                        <InputText 
                                            type="text" 
                                            :class="{'p-invalid':user.name_org === '' && validarStep2 === true}"
                                            class="p-inputtext-sm" 
                                            v-model="user.name_org" 
                                            placeholder="Ingresa el nombre de la compañia" />
                                    </span>
                                    <small v-if="user.name_org === '' && validarStep2 === true" class="p-error">El nombre de la compañía es requerido</small>
                                </div>

                                <div class="inputSingle">
                                    <label class="form-label" for="#nombre">Tipo de compañía</label>
                                    <div class="p-input-icon-left">
                                        <i class="icons-form"><img draggable="false" src="@assets/svg/icon/domain.svg" class="material-symbols-rounded"/></i>
                                        <select class="p-inputtext-sm" v-model="user.type" :class="{'p-invalid':user.type === '' && validarStep2 === true}">
                                            <option disabled value="" class="optionDis">Seleccione un tipo de compañia</option>
                                            <option v-for="opcion in business" :value="opcion">{{ opcion }}</option>
                                        </select>
                                    </div>
                                    <small v-if="user.type === '' && validarStep2 === true" class="p-error">El tipo de compañía es requerido</small>
                                </div>

                                <div class="inputSingle">
                                    <label class="form-label" for="#nombre">Ciudad</label>
                                    <span class="p-input-icon-left">
                                        <i class="icons-form"><img draggable="false" src="@assets/svg/icon/locationCity.svg" class="material-symbols-rounded"/></i>
                                        <input
                                            type="text" 
                                            :class="{'p-invalid':user.city === 0 && validarStep2 === true}"
                                            class="p-inputtext-sm" 
                                            v-model="user.city" 
                                            placeholder="Ingresa la ciudad" />
                                    </span>
                                    <small v-if="user.city === 0 && validarStep2 === true" class="p-error">La ciudad es requerida</small>
                                </div>

                                <div class="inputSingle">
                                    <label class="form-label" for="#nombre">NIT</label>
                                    <span class="p-input-icon-left">
                                        <i class="icons-form"><img draggable="false" src="@assets/svg/icon/domain.svg" class="material-symbols-rounded"/></i>
                                        <InputText 
                                            type="text" 
                                            :class="{'p-invalid':user.nit === '' && validarStep2 === true}"
                                            class="p-inputtext-sm" 
                                            v-model="user.nit" 
                                            placeholder="Ingresa tu NIT" />
                                    </span>
                                    <small v-if="user.nit === '' && validarStep2 === true" class="p-error">El NIT es requerido</small>
                                </div>
                            </div>
                        </div>
                        <div v-show="step === 3" class="contentForm">
                            <div id="form-title">
                                <h1 class="title-log">Crea tu contraseña</h1>
                                <p id="linkRegistro">Estas a un paso de conocer tu etapa de madurez tecnológica.</p>
                            </div>
                            <label class="form-label" for="#password">Nueva contraseña</label>
                            <span class="p-input-icon-left">
                                <i class="icons-form"><img draggable="false" src="@assets/svg/icon/lock.svg" class="material-symbols-rounded"/></i>
                                <InputText 
                                    type="password" 
                                    :class="{'p-invalid':user.password === '' && validarStep3 === true}"
                                    class="p-inputtext-sm" 
                                    v-model="user.password" 
                                    placeholder="Ingresa una nueva contraseña" />
                            </span>
                            <small v-if="user.password === '' && validarStep3 === true" class="p-error">La contraseña es requerida</small>
                            <div id="space"></div>
                            <label class="form-label" for="#password">Confirmar nueva contraseña</label>
                            <span class="p-input-icon-left">
                                <i class="icons-form"><img draggable="false" src="@assets/svg/icon/lock.svg" class="material-symbols-rounded"/></i>
                                <InputText 
                                    type="password" 
                                    :class="{'p-invalid':(user_data.password2 === '' || validatePassword(user.password, user_data.password2)!= true) && validarStep3 === true}"
                                    class="p-inputtext-sm" 
                                    v-model="user_data.password2" 
                                    required
                                    placeholder="Confirma tu nueva contraseña" />
                            </span>
                            <small v-if="user_data.password2 === '' && validarStep3 === true" class="p-error">La confirmación de contraseña es requerida</small>
                            <small v-else-if="validatePassword(user.password, user_data.password2)!= true && validarStep3 === true" class="p-error">Las contraseñas deben ser iguales</small>
                            <p id="paragraph">A tu correo electrónico recibirás un código de confirmación para validar tu identidad</p>
                            <label class="form-label" for="#nombre">Código</label>
                            <span class="p-input-icon-left">
                                <i class="icons-form"><img draggable="false" src="@assets/svg/icon/pin.svg" class="material-symbols-rounded"/></i>
                                <InputText 
                                    type="text" 
                                    class="p-inputtext-sm" 
                                    :class="{'p-invalid':user_data.code === '' && validarStep3 === true}"
                                    v-model="user_data.code" 
                                    required
                                    placeholder="Ingresa el código" />
                            </span>
                            <small v-if="user_data.code === '' && validarStep3 === true" class="p-error">El código es requerido</small>
                        </div>
                        <div id="view4" v-show="step === 4" class="contentForm">
                            <div class="contentStep4">
                                <div class="ready">
                                    <img id="Done" draggable="false" src="@assets/svg/done.svg">
                                    <h2 id="titleStep">Envía tu solicitud</h2>
                                    <p class="paragraph">Revisa toda la información diligenciada anteriormente en los pasos anteriores y, si todo está bien, continuaras en <b>Scale Up.</b></p>
                                </div>
                            </div>
                        </div>
                    </form>                   
                </div>
                <div class="formNext">
                    <button id="btnBack" type="button" v-if="step != 1" @click="previousStep">Anterior</button>
                    <button id="btnSig" type="button" v-if="step != 4" @click="nextStep">Siguiente</button>
                    <router-link to="/WelcomeUser">
                        <button id="btnSubmit" @click="sendMutation" type="submit" v-if="step === 4">Registrarse</button>
                    </router-link>
                </div>
            </div>
        </div>
    </article>
</template>

<style scoped lang="scss">
    @import url('./register.scss');
</style>