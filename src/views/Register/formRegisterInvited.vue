<script lang="ts" setup> 
    import { ref, reactive } from 'vue';
    import InputText from 'primevue/inputtext';
    import InputMask from 'primevue/inputmask';
    import MemberStore from '@src/stores/dataMember';

    const user = MemberStore();
    const user_data = reactive({
        password2: '',
        code: ''
    })

    const step = ref<number>(1)
    const maxStep = ref<number>(4)
    const validarStep1 = ref<boolean>(false)
    const validarStep2 = ref<boolean>(false)
        
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
                if((user.password && user_data.password2 && user_data.code)!= ''){
                    if(validatePassword(user.password, user_data.password2)){            
                        step.value++
                    }
                }
            }
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
                    <img id="imagen" v-if="step === 1" draggable="false" src="@assets/images/Register/regis-sims1.png"/>
                    <img id="imagen3" v-if="step === 2" draggable="false" src="@assets/images/Register/regis-sims3.png"/>
                    <img id="imagen2" v-if="step === 3" draggable="false" src="@assets/images/Register/regis-sims4.png"/>
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
                        </div>
                        <hr id="line">
                        <div v-if="step === 1">
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
                        <div v-if="step === 2">
                            <div id="form-title">
                                <h1 class="title-log">Crea tu contraseña</h1>
                                <p id="linkRegistro">Estas a un paso de conocer tu etapa de madurez tecnológica.</p>
                            </div>
                            <label class="form-label" for="#password">Nueva contraseña</label>
                            <span class="p-input-icon-left">
                                <i class="icons-form"><span class="material-symbols-rounded">
                                    lock
                                </span></i>
                                <InputText 
                                    type="password" 
                                    :class="{'p-invalid':user.password === '' && validarStep2 === true}"
                                    class="p-inputtext-sm" 
                                    v-model="user.password" 
                                    placeholder="Ingresa una nueva contraseña" />
                            </span>
                            <small v-if="user.password === '' && validarStep2 === true" class="p-error">La contraseña es requerida</small>
                            <div id="space"></div>
                            <label class="form-label" for="#password">Confirmar nueva contraseña</label>
                            <span class="p-input-icon-left">
                                <i class="icons-form"><img draggable="false" src="@assets/svg/icon/lock.svg" class="material-symbols-rounded"/></i>
                                <InputText 
                                    type="password" 
                                    :class="{'p-invalid':(user_data.password2 === '' || validatePassword(user.password, user_data.password2)!= true) && validarStep2 === true}"
                                    class="p-inputtext-sm" 
                                    v-model="user_data.password2" 
                                    required
                                    placeholder="Confirma tu nueva contraseña" />
                            </span>
                            <small v-if="user_data.password2 === '' && validarStep2 === true" class="p-error">La confirmación de contraseña es requerida</small>
                            <small v-else-if="validatePassword(user.password, user_data.password2)!= true && validarStep2 === true" class="p-error">Las contraseñas deben ser iguales</small>
                            <p id="paragraph">A tu correo electrónico recibirás un código de confirmación para validar tu identidad</p>
                            <label class="form-label" for="#nombre">Código</label>
                            <span class="p-input-icon-left">
                                <i class="icons-form"><img draggable="false" src="@assets/svg/icon/lock.svg" class="material-symbols-rounded"/></i>
                                <InputText 
                                    type="text" 
                                    class="p-inputtext-sm" 
                                    :class="{'p-invalid':user_data.code === '' && validarStep2 === true}"
                                    v-model="user_data.code" 
                                    required
                                    placeholder="Ingresa el código" />
                            </span>
                            <small v-if="user_data.code === '' && validarStep2 === true" class="p-error">El código es requerido</small>
                        </div>
                        <div v-if="step === 3">
                            <div id="ready">
                                <img id="Done" draggable="false" src="@assets/svg/done.svg">
                                <h2 id="titleStep">Envía tu solicitud</h2>
                                <p class="paragraph">Revisa toda la información diligenciada anteriormente en los pasos anteriores y, si todo está bien, continuaras en <b>Scale Up.</b></p>
                            </div>
                        </div>
                    </form>                   
                </div>
                <div class="formNext">
                    <button id="btnBack" type="button" v-if="step != 1" @click="previousStep">Anterior</button>
                    <button id="btnSig" type="button" v-if="step != 3" @click="nextStep">Siguiente</button>
                    <router-link to="/Dashboard">
                        <button id="btnSubmit" type="submit" v-if="step === 3">Registrarse</button>
                    </router-link>
                </div>
            </div>
        </div>
    </article>
</template>

<style scoped lang="scss">
    @import url('./register.scss');
</style>