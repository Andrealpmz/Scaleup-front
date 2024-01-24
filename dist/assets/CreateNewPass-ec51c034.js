import{s as h}from"./inputtext.esm-b76ec9ec.js";import{S as t}from"./sweetalert2.all-169d0d87.js";import{_ as w,h as x,o as l,c,g as a,l as p,n as u,d as m,G as f,H as g,I as F,J as k}from"./index-8e5c7979.js";import{_}from"./lock-7c7b8546.js";console.log(t);const b={props:["token"],data(){return{password:{pass:"",pass2:""},resetToken:null,validateFields:!1}},components:{InputText:h},created(){this.resetToken=this.$route.params.token},methods:{async createPass(){try{const o={resetToken:this.resetToken,password:this.password.pass};if(console.log(o.resetToken),console.log(this.resetToken),this.validatePassword(this.password.pass,this.password.pass2)!==!0){console.error("Las contraseñas deben ser iguales"),t.fire({icon:"warning",title:"Importante!",text:"Las contraseñas deben ser iguales. Por favor, verifica tus contraseñas."});return}const e=await fetch(`https://k35dpbq0-3000.use2.devtunnels.ms/api/auth/reset_password/${this.resetToken}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.resetToken}`},body:JSON.stringify(o)});if(console.log(e),e.ok){const v=await e.json();t.fire({icon:"success",title:"Bien!",text:"Contraseña actualizada con éxito!"}).then(()=>{setTimeout(()=>{window.location.href="/login"},1e3)})}else e.status===401?(console.error("Error en la solicitud:",e.statusText),t.fire({icon:"error",title:"Error!",text:"Token no válido o expirado, reenvia el correo"}).then(()=>{setTimeout(()=>{window.location.href="/forgotPass"},1e3)}),console.log(e)):t.fire({icon:"error",title:"Error!",text:"Error"})}catch(o){console.error("Error al realizar la solicitud:",o),t.fire({icon:"warning",title:"Importante!",text:"Error en el servidor."})}},validatePassword(o,e){return o===e}}};const n=o=>(g("data-v-5a7c7001"),o=o(),F(),o),T={id:"content"},y=f('<div id="items-left" data-v-5a7c7001><div id="info" data-v-5a7c7001><img src="'+k+'" draggable="false" class="logo" data-v-5a7c7001><h1 class="text" data-v-5a7c7001> Una solución para cada tipo de negocio </h1><p class="pfText" data-v-5a7c7001>¿Estás listo para conocer en detalle la operación de tu agencia?</p></div></div>',1),C={class:"login"},P={class:"formp"},I=f('<div id="form-titlefgt" data-v-5a7c7001><h1 class="title-fgt" data-v-5a7c7001>Crear nueva contraseña</h1></div><div class="textinfofg" data-v-5a7c7001><p class="textForgot" data-v-5a7c7001>Crea una nueva contraseña que no uses en ningún otro sitio.</p></div><label class="form-label" for="#password" data-v-5a7c7001>Nueva contraseña</label>',3),V={class:"p-input-icon-left"},E=n(()=>a("i",{class:"icons-form"},[a("img",{draggable:"false",src:_,class:"material-symbols-rounded"})],-1)),N={key:0,class:"p-error"},S=n(()=>a("div",{id:"space"},null,-1)),q=n(()=>a("label",{class:"form-label",for:"#password"},"Confirmar nueva contraseña",-1)),B={class:"p-input-icon-left"},L=n(()=>a("i",{class:"icons-form"},[a("img",{draggable:"false",src:_,class:"material-symbols-rounded"})],-1)),z={key:1,class:"p-error"},U={key:2,class:"p-error"},j=n(()=>a("div",{id:"space"},null,-1));function A(o,e,v,J,s,i){const d=x("InputText");return l(),c("article",T,[y,a("div",C,[a("form",P,[I,a("span",V,[E,p(d,{type:"password",class:u(["p-inputtext-sm",{"p-invalid":s.password.pass===""&&s.validateFields!=!1}]),modelValue:s.password.pass,"onUpdate:modelValue":e[0]||(e[0]=r=>s.password.pass=r),required:"",placeholder:"Ingresa una nueva contraseña"},null,8,["class","modelValue"])]),s.password.pass===""&&s.validateFields!=!1?(l(),c("small",N,"La contraseña es requerida")):m("",!0),S,q,a("span",B,[L,p(d,{type:"password",class:u(["p-inputtext-sm",{"p-invalid":(s.password.pass2===""||i.validatePassword(s.password.pass,s.password.pass2)!=!0)&&s.validateFields!=!1}]),modelValue:s.password.pass2,"onUpdate:modelValue":e[1]||(e[1]=r=>s.password.pass2=r),required:"",placeholder:"Confirma tu nueva contraseña"},null,8,["class","modelValue"])]),s.password.pass2===""&&s.validateFields!=!1?(l(),c("small",z,"La confirmación de contraseña es requerida")):i.validatePassword(s.password.pass,s.password.pass2)!=!0&&s.validateFields!=!1?(l(),c("small",U,"Las contraseñas deben ser iguales")):m("",!0),j,a("input",{class:"btnForgot",onClick:e[2]||(e[2]=(...r)=>i.createPass&&i.createPass(...r)),type:"button",value:"Cambiar contraseña"})])])])}const K=w(b,[["render",A],["__scopeId","data-v-5a7c7001"]]);export{K as default};