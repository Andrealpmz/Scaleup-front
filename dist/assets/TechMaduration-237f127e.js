import{z as M,A as f,S as k,G as O,J as H,P as N,_ as I,o as t,c as n,d as g,F as h,q as T,l as x,g as r,n as q,L as B,w as D,v as R,t as b,e as $,H as J,I as G}from"./index-8e5c7979.js";import{_ as Q}from"./ScaleUp-logo-3f2a48ad.js";import{S as w}from"./sweetalert2.all-169d0d87.js";const F="/assets/simMTresultado-458efa49.svg",W=O('<nav id="header" data-v-eac275eb><img src="'+H+'" draggable="false" class="logo" data-v-eac275eb></nav><article id="contentResult" data-v-eac275eb><div id="items-left" data-v-eac275eb><div class="info" data-v-eac275eb><img id="imageResult" draggable="false" src="'+F+'" data-v-eac275eb></div></div><div class="items-right" data-v-eac275eb><div class="info" data-v-eac275eb><div class="alignTextResul" data-v-eac275eb><p id="texto_Result" data-v-eac275eb><span class="titleResult" data-v-eac275eb>Gracias por completar nuestro formulario!</span><br data-v-eac275eb><br data-v-eac275eb> Estamos entusiasmados de procesar su información y brindarle una excelente experiencia. Le garantizamos que sus datos están seguros con nosotros y solo se usarán para fines internos.<br data-v-eac275eb><br data-v-eac275eb> Gracias nuevamente por confiar en nosotros y nos vemos pronto!.</p></div></div></div></article>',2),U=M({__name:"MTresultado",setup(z){console.log(w);async function e(_){try{const p=localStorage.getItem("userData"),y=JSON.parse(p);console.log(y);const E={userId:y._id,form:_},m=await fetch("https://k35dpbq0-3000.use2.devtunnels.ms/api/auth/update_form",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(E)});if(m.ok){const C=await m.json();console.log(C)}else console.error("Error en la solicitud:",m.statusText),alert("Error en la solicitud")}catch(p){console.error("Error al realizar la solicitud:",p),alert("Error en el servidor. Por favor, inténtalo de nuevo.")}}const u=f(!1),d=N();return k(()=>{e("terminado"),w.fire({icon:"info",title:"Información!",text:"Inicia sesión para ver tu resultado!"}),setTimeout(()=>{u.value=!0,d.push("/login")},6e3)}),(_,p)=>W}});const K=I(U,[["__scopeId","data-v-eac275eb"]]);const V=z=>(J("data-v-ca4b2197"),z=z(),G(),z),X={key:0,id:"header"},Y=V(()=>r("img",{src:Q,draggable:"false",class:"logo"},null,-1)),Z=[Y],ee={class:"testContent animate__animated animate__slideInUp"},ae={id:"items-left"},se={class:"info"},oe={class:"tips"},te=["src"],ne={key:1,id:"infoAdvertising"},re={class:"items-right"},ce={class:"info questions"},ie={class:"return"},le=V(()=>r("i",{class:"pi pi-angle-left material-symbols-outlined"},null,-1)),ue={class:"paragraph"},de={key:0,class:"options"},me={class:"ThreeColumns"},ve=["onClick"],ge={key:1,class:"ScaleBox"},pe={class:"blocNums"},ye=["onClick"],fe={class:"numberBtn"},_e={class:"optionsBlock"},he=["onClick"],be={key:1},ze=23,Te=M({__name:"TechMaduration",setup(z){const e=f(0),u=f(0),d=f(0),_=f(!1),p=f(!1),y=f(0);k(()=>{u.value=100/ze,d.value=u.value,A("en_progreso")});const E=localStorage.getItem("userData"),m=JSON.parse(E);console.log(m);async function C(o){try{const a={userId:m._id,total_p:o},i=await fetch("https://k35dpbq0-3000.use2.devtunnels.ms/api/auth/update_form_preguntas",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(i.ok){const s=await i.json();m.total_p=o,localStorage.setItem("userData",m),console.log(localStorage.getItem("userData"))}else console.error("Error en la solicitud:",i.statusText),alert("Error en la solicitud")}catch(a){console.error("Error al realizar la solicitud:",a),alert("Error en el servidor. Por favor, inténtalo de nuevo.")}}async function A(o){try{const a={userId:m._id,form:o},i=await fetch("https://k35dpbq0-3000.use2.devtunnels.ms/api/auth/update_form",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(i.ok){const s=await i.json();console.log(s)}else console.error("Error en la solicitud:",i.statusText),alert("Error en la solicitud")}catch(a){console.error("Error al realizar la solicitud:",a),alert("Error en el servidor. Por favor, inténtalo de nuevo.")}}function P(){e.value===11?(e.value=e.value-(_.value===!0?1:4),d.value-=u.value*(_.value===!0?1:4)):e.value===14?(e.value=e.value-(p.value===!0?1:2),d.value-=u.value*(p.value===!0?1:2)):(e.value--,d.value-=u.value)}function S(o,a){e.value===0||e.value===23||e.value===8?c[o].value=a+1:e.value===1?a%2==0?c[o].value=2+a/2*2:c[o].value=(1+(a-1)/2)*2:e.value===7||e.value===3||e.value===12||e.value===21?c[o].value=c[o].value+(a===0?1:0):c[o].value=10-a*2,e.value===7?(e.value=e.value+(a===0?1:4),d.value+=u.value*(a===0?1:4),_.value=a===0):e.value===12?(e.value=e.value+(a===0?1:2),d.value+=u.value*(a===0?1:2),p.value=a===0):(e.value++,d.value+=u.value),c[o].category_id,c[o].category,c[o].question,c[o].answers[a],c[o].value,y.value+=c[o].value,console.log("Valor total: "+y.value),console.log("Porcentaje: "+y.value/178*100+"%"),e.value===23&&C(y.value)}const L=[{src:"http://localhost:5173/src/assets/images/TestMaduration/C1/simTest1.png",info:"Los colaboradores son clave, trabajan juntos y brindan innovación. La empresa valora a sus colaboradores y brinda un buen entorno."},{src:"http://localhost:5173/src/assets/images/TestMaduration/C2/simTest2.png",info:"Para una digitalización exitosa, es necesaria una cultura inclusiva y una estrategia sólida alineada con los objetivos de la organización."},{src:"http://localhost:5173/src/assets/images/TestMaduration/C2/simTest3.png",info:"Las herramientas digitales son esenciales para la eficiencia y éxito de una organización, permiten automatización, mejoran comunicación y acceso a información en tiempo real."},{src:"http://localhost:5173/src/assets/svg/TestMaduration/C2/simTest4.svg",info:"Implementar tecnología en una organización puede mejorar eficiencia, toma de decisiones y operaciones, maximizando resultados de la inversión y llevando a la vanguardia de la innovación."},{src:"http://localhost:5173/src/assets/svg/TestMaduration/C3/simTest5.svg",info:"La innovación es crucial para mantenerse relevante en el mercado. Se trata de crear nuevas formas de mejorar la eficiencia y efectividad de la empresa."},{src:"http://localhost:5173/src/assets/svg/TestMaduration/C3/simTest6.svg",info:"Implementar canales digitales mejora eficiencia, satisfacción y seguridad. Es clave en la era digital."},{src:"http://localhost:5173/src/assets/svg/TestMaduration/C3/simTest7.svg",info:"Los canales digitales son una herramienta poderosa para vender productos y servicios en una organización."},{src:"http://localhost:5173/src/assets/svg/TestMaduration/C4/simTest8.svg",info:"El área de tecnología es clave para la eficiencia, innovación, seguridad y estrategia de una organización."},{src:"http://localhost:5173/src/assets/svg/TestMaduration/C4/simTestBool.svg",info:"La experiencia de los usuarios influye en su satisfacción y lealtad a la marca. Es importante monitorear y mejorarla."},{src:"http://localhost:5173/src/assets/svg/TestMaduration/C4/simTestBool2.svg",info:"El área de tecnología es clave para la eficiencia, innovación, seguridad y estrategia de una organización."},{src:"http://localhost:5173/src/assets/svg/TestMaduration/C4/simTestBool3.svg",info:"El comercio electrónico es una parte fundamental de cualquier estrategia de negocios moderna y es esencial para mantenerse relevante y competitivo en el mercado actual."},{src:"http://localhost:5173/src/assets/svg/TestMaduration/C5/simTest9.svg",info:"La digitalización de productos y servicios es esencial para cualquier organización que busque mantenerse relevante y competitiva en el mercado actual."},{src:"http://localhost:5173/src/assets/images/TestMaduration/C5/simTest10.png",info:"La conexión a internet es importante para mantener a una organización relevante y competitiva. Mejora la comunicación, la productividad y la eficiencia y brinda acceso a nuevas oportunidades de negocios y tecnologías."},{src:"http://localhost:5173/src/assets/images/TestMaduration/C5/simTest11.png",info:"La seguridad informática es clave para proteger la información y mejorar la eficiencia de una organización."},{src:"http://localhost:5173/src/assets/svg/TestMaduration/C6/simTest12.svg",info:"La infraestructura en la nube permite a las organizaciones acceder a recursos informáticos a través de Internet, con ventajas como escalabilidad, reducción de costos, seguridad y continuidad de negocios."},{src:"http://localhost:5173/src/assets/svg/TestMaduration/C6/simTest13.svg",info:"La automatización de los procesos mejora la eficiencia y productividad, libera tiempo y recursos, reduce errores y mejora la consistencia de los procesos, permitiendo a las organizaciones ser más eficientes y competitivas."},{src:"http://localhost:5173/src/assets/svg/TestMaduration/C6/simTest14.svg",info:"La toma de decisiones efectiva es crítica en una organización, y requiere un proceso estructurado basado en datos y análisis, participación de diferentes perspectivas y colaboración entre equipos."},{src:"http://localhost:5173/src/assets/svg/TestMaduration/C7/simTest15.svg",info:"La tecnología ayuda a la ejecución y ajuste de los procesos internos de una organización al automatizar tareas, brindar visibilidad y control, lo que resulta en una mayor eficiencia y productividad."},{src:"http://localhost:5173/src/assets/svg/TestMaduration/C7/simTest16.svg",info:"La conexión a internet es importante para mantener a una organización relevante y competitiva. Mejora la comunicación, la productividad y la eficiencia y brinda acceso a nuevas oportunidades de negocios y tecnologías."},{src:"http://localhost:5173/src/assets/svg/TestMaduration/C7/simTest17.svg",info:"Para una digitalización exitosa, es necesaria una cultura inclusiva y una estrategia sólida alineada con los objetivos de la organización."},{src:"http://localhost:5173/src/assets/svg/TestMaduration/C8/simTest18.svg",info:"El comercio electrónico es una parte fundamental de cualquier estrategia de negocios moderna y es esencial para mantenerse relevante y competitivo en el mercado actual."},{src:"http://localhost:5173/src/assets/svg/TestMaduration/C8/simTest19.svg",info:"Al invertir en una infraestructura de seguridad sólida, una organización se protege contra ataques y fortalece la confianza de los clientes."},{src:"http://localhost:5173/src/assets/svg/TestMaduration/C8/simTest20.svg",info:"La innovación puede aumentar la productividad, mejorar la oferta y mantener a la empresa a la vanguardia. Es importante monitorear y mejorarla."}],c=[{category_id:1,category:"Organización",question:"¿Cuántos colaboradores hacen parte de tu equipo?",content:"",value:0,answers:["1 a 10","11 a 25","26 a 50","51 a 80","81 a 100","101 a 500"]},{category_id:2,category:"Estrategía y cultura",question:"¿En qué medida implementa herramientas digitales en su organización (CRM automatizado, Sistemas de gestión, sistemas de auditoría, etc.)?",content:"",value:0,answers:["1","2","3","4","5","6","7","8","9","10"]},{category_id:2,category:"Estrategía y cultura",question:"¿Cómo calificas la implementación de tecnología en tu organización para resolver problemas?",content:"",value:0,answers:["Somos referentes de nuestro sector!","Vamos en la dirección correcta","Avanzando, pero mucho por mejorar","Hemos dado algunos pasos","Estamos en ceros"]},{category_id:2,category:"Estrategía y cultura",question:"Tu organización es reactiva ( atender problemas cuando ya han causado consecuencias) o proactivo (se logran atener los problemas antes de que sucedan previniendo daños y consecuencias)",content:"",value:0,answers:["Proactiva","Reactiva"]},{category_id:3,category:"Experiencia del cliente o usuario",question:"¿En qué medida implementas canales digitales formales (no WhatsApp, entre otros) para la comunicación externa e interna en tu organización?",content:"",value:0,answers:["Somos referentes de nuestro sector!","Vamos en la dirección correcta","Avanzando, pero mucho por mejorar","Hemos dado algunos pasos","Estamos en ceros"]},{category_id:3,category:"Experiencia del cliente o usuario",question:"¿En qué medida usas canales digitales para vender tus productos y servicios?",content:"",value:0,answers:["Somos referentes de nuestro sector!","Vamos en la dirección correcta","Avanzando, pero mucho por mejorar","Hemos dado algunos pasos","Estamos en ceros"]},{category_id:3,category:"Experiencia del cliente o usuario",question:"¿En qué medida usas tecnología para mejorar la experiencia de tus usuarios o clientes?",content:"",value:0,answers:["Somos referentes de nuestro sector!","Vamos en la dirección correcta","Avanzando, pero mucho por mejorar","Hemos dado algunos pasos","Estamos en ceros"]},{category_id:4,category:"Organización, comunicación y talento",question:"¿Cuentas con un área de tecnología?",content:"",value:0,answers:["Sí","No"]},{category_id:4,category:"Organización, comunicación y talento",question:"¿Con cuantas personas cuentas para el área de tecnología?",content:"",value:0,answers:["1 a 3","4 a 6","7 a 12","13 a 20","21 a 30","31 a 50"]},{category_id:4,category:"Organización, comunicación y talento",question:"¿Consideras adecuado el nivel de conocimientos digitales del personal de tu negocio?",content:"",value:0,answers:["Somos referentes de nuestro sector!","Vamos en la dirección correcta","Avanzando, pero mucho por mejorar","Hemos dado algunos pasos","Estamos en ceros"]},{category_id:4,category:"Organización, comunicación y talento",question:"¿El personal de tu negocio está motivado frente al reto de la transformación digital?",content:"",value:0,answers:["Somos referentes de nuestro sector!","Vamos en la dirección correcta","Avanzando, pero mucho por mejorar","Hemos dado algunos pasos","Estamos en ceros"]},{category_id:5,category:"Productos y servicios",question:"¿Es digital la presentación de los productos y/o servicios que prestas a tus cliente",content:"",value:0,answers:["Somos referentes de nuestro sector!","Vamos en la dirección correcta","Avanzando, pero mucho por mejorar","Hemos dado algunos pasos","Estamos en ceros"]},{category_id:5,category:"Productos y servicios",question:"¿Cuántos productos digitales tiene implementados en su organizacion?",content:"",value:0,answers:["Sí","No"]},{category_id:5,category:"Productos y servicios",question:"¿Qué tan importante es la tecnología en el valor que aportan tus productos y servicios?",content:"",value:0,answers:["Somos referentes de nuestro sector!","Vamos en la dirección correcta","Avanzando, pero mucho por mejorar","Hemos dado algunos pasos","Estamos en ceros"]},{category_id:6,category:"Infraestructura tecnológica",question:"¿Ha definido estandares y/o procesos de seguridad informática en la organización?",content:"",value:0,answers:["Somos referentes de nuestro sector!","Vamos en la dirección correcta","Avanzando, pero mucho por mejorar","Hemos dado algunos pasos","Estamos en ceros"]},{category_id:6,category:"Infraestructura tecnológica",question:"En que medida implementa tu negocio infraestructura en la nube",content:"",value:0,answers:["Somos referentes de nuestro sector!","Vamos en la dirección correcta","Avanzando, pero mucho por mejorar","Hemos dado algunos pasos","Estamos en ceros"]},{category_id:6,category:"Infraestructura tecnológica",question:"¿Qué proveedores Cloud implementa en su organización?",content:"",value:0,answers:["AWS","GCP","Azure","Digital Ocean","Otros"]},{category_id:7,category:"Procesos",question:"¿En qué grado se encuentran automatizados tus procesos de negocio?",content:"",value:0,answers:["Somos referentes de nuestro sector!","Vamos en la dirección correcta","Avanzando, pero mucho por mejorar","Hemos dado algunos pasos","Estamos en ceros"]},{category_id:7,category:"Procesos",question:"¿En qué nivel tu negocio procesa y tomas decisiones con los datos que recopiles?",content:"",value:0,answers:["Somos referentes de nuestro sector!","Vamos en la dirección correcta","Avanzando, pero mucho por mejorar","Hemos dado algunos pasos","Estamos en ceros"]},{category_id:7,category:"Procesos",question:"¿En qué medida la tecnología te ayuda a ejecutar, ajustar y mejorar los procesos internos del negocio?",content:"",value:0,answers:["Somos referentes de nuestro sector!","Vamos en la dirección correcta","Avanzando, pero mucho por mejorar","Hemos dado algunos pasos","Estamos en ceros"]},{category_id:8,category:"Información y datos",question:"¿En que grado se encuentra digitalizada la informacion de tu organizacion?",content:"",value:0,answers:["Somos referentes de nuestro sector!","Vamos en la dirección correcta","Avanzando, pero mucho por mejorar","Hemos dado algunos pasos","Estamos en ceros"]},{category_id:8,category:"Información y datos",question:"¿Cuenta con tableros de análisis de datos en su organización?",content:"",value:0,answers:["Sí","No","No sé"]},{category_id:8,category:"Información y datos",question:"¿Cuántas bases de datos maneja dentro de su organización?",content:"",value:0,answers:["1 a 3","4 a 5","5 a 10","10 a 20","20 o más"]}];return(o,a)=>(t(),n(h,null,[e.value!=23?(t(),n("nav",X,Z)):g("",!0),(t(),n(h,null,T(c,(i,s)=>r("div",{key:s},[e.value!=23?(t(),n("div",{key:0,class:q("progressBar Bar"+e.value),style:B({width:d.value+"%"})},null,6)):g("",!0),D(r("div",ee,[r("div",ae,[r("div",se,[r("div",oe,[(t(),n(h,null,T(L,(v,l)=>r("div",{key:l},[l===s?(t(),n("img",{key:0,id:"imagenSimTest",draggable:"false",src:v.src,style:{"margin-bottom":"20px"}},null,8,te)):g("",!0),l===s?(t(),n("p",ne,b(v.info),1)):g("",!0)])),64))])])]),r("div",re,[r("div",ce,[r("div",ie,[e.value>0?(t(),n("span",{key:0,onClick:a[0]||(a[0]=v=>P()),id:"btnReturn"},[le,$(" Volver ")])):g("",!0)]),r("h1",{class:q("titulo t"+i.category_id)},b(i.category),3),r("p",ue,b(i.question),1),s===0||s===22||s===8?(t(),n("div",de,[r("div",me,[(t(!0),n(h,null,T(c[s].answers,(v,l)=>(t(),n("button",{key:l,onClick:j=>S(s,l),class:q("btnOption b"+i.category_id)},b(v),11,ve))),128))])])):g("",!0),s===1?(t(),n("div",ge,[r("div",pe,[(t(!0),n(h,null,T(c[s].answers,(v,l)=>(t(),n("div",{key:l,class:"btnOptionScale b2Number",onClick:j=>S(s,l)},[r("small",fe,b(v),1)],8,ye))),128))])])):g("",!0),s!=0&&s!=1&&s!=8&&s!=22?(t(!0),n(h,{key:2},T(c[s].answers,(v,l)=>(t(),n("div",_e,[r("button",{onClick:j=>S(s,l),class:q("btnOptionBlock b"+i.category_id)},b(v),11,he)]))),256)):g("",!0)])])],512),[[R,e.value===s]])])),64)),e.value===23?(t(),n("div",be,[x(K)])):g("",!0)],64))}});const Se=I(Te,[["__scopeId","data-v-ca4b2197"]]);export{Se as default};