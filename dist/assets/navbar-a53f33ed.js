import{_ as n}from"./ScaleUp-logo-3f2a48ad.js";import{_ as c,o as _,c as i,g as s,t as l,H as m,I as p}from"./index-8e5c7979.js";const d={data(){return{activeItem:null,companyName:""}},methods:{selectItem(e){this.activeItem=e},cerrarSesion(){localStorage.removeItem("userData"),this.$router.push("/")}},mounted(){const e=localStorage.getItem("userData");if(e){const a=JSON.parse(e);a&&a.company_name&&(this.companyName=a.company_name)}}},u="/assets/logout-71a129ab.svg";const g=e=>(m("data-v-b81643e3"),e=e(),p(),e),v={class:"navbarDash"},h=g(()=>s("img",{src:n,draggable:"false",class:"logo"},null,-1)),f={class:"icon-container"},I={style:{margin:"24px","margin-left":"1050px"}};function S(e,a,b,y,o,t){return _(),i("div",null,[s("nav",v,[h,s("button",f,[s("img",{src:u,onClick:a[0]||(a[0]=(...r)=>t.cerrarSesion&&t.cerrarSesion(...r)),class:"icon-small"})]),s("div",null,[s("h4",I," Empresa "+l(o.companyName),1)])])])}const N=c(d,[["render",S],["__scopeId","data-v-b81643e3"]]);export{N as n};
