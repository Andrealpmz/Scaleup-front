import { createRouter, createWebHistory } from 'vue-router';
import Home from '@views/Home.vue';

function isAuthenticated() {
	const userData = localStorage.getItem('userData');
	return !!userData; // Retorna true si hay datos en el localStorage, false de lo contrario
  }
  

export default createRouter({
	history: createWebHistory(),
  	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
		},
		{
			path: '/Dashboard',
			name: 'Dashboard',
			component: () => import('@views/Dashboard/Dashboard.vue'),
		},
		{
			path: '/landing',
			name: 'landing',
			component: () => import('@views/Landing.vue'),
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('@views/Login/Login.vue'),
		},
		{
			path: '/forgotPass',
			name: 'forgotPass',
			component: () => import('@views/Login/ForgotPassword.vue'),
		},
		{
			path: '/register',
			name: 'register',
			component: () => import('@views/Register/Register.vue'),
		},
		{
			path: '/registerInvited',
			name: 'registerInvited',
			component: () => import('@views/Register/formRegisterInvited.vue'),
		},
		{
			path: '/CreatePass/:token',
			name: 'CreatePass',
			component: () => import('@views/Login/CreateNewPass.vue'),
			props: true,
		},
		{
			path: '/WelcomeUser',
			name: 'WelcomeUser',
			component: () => import('@views/Register/TestTech/welcomeRegister.vue'),
		},
		{
			path: '/TechnologyReadiness',
			name: 'TechnologyReadiness',
			component: () => import('@views/Register/TestTech/TechMaduration.vue'),
			beforeEnter: (to, from, next) => {
				if (isAuthenticated()) {
					const userData = localStorage.getItem('userData');
					const obj_local_user = JSON.parse(userData);
					if (obj_local_user && obj_local_user.total_p !== null && obj_local_user.total_p !== 0) {
					  next('/CategoriesTest'); 
					} else {
					  next();
					}
				  } else {
					next('/login');
				  }
			},
			},
		{
			path: '/TeamList',
			name: 'TeamList',
			component: () => import('@views/Dashboard/Team/WorkteamList.vue'),
		},
		{
			path: '/CategoriesTest',
			name: 'CategoriesTest',
			component: () => import('@views/Dashboard/ModuleTestM/CategoriesTM.vue'),
			beforeEnter: (to, from, next) => {
				if (isAuthenticated()) {
				next();
				} else {
				next('/login');
				}
			},
		},
		{
			path: '/CategoriesTest/Organization',
			name: 'Organization',
			component: () => import('@views/Dashboard/ModuleTestM/Organizacion/Organizacion.vue'),
			beforeEnter: (to, from, next) => {
				if (isAuthenticated()) {
				next();
				} else {
				next('/login');
				}
			},
		},
		{
			path: '/CategoriesTest/Strategy-Culture',
			name: 'Strategy-Culture',
			component: () => import('@views/Dashboard/ModuleTestM/Estrategia/Estrategia.vue'),
			beforeEnter: (to, from, next) => {
				if (isAuthenticated()) {
				next();
				} else {
				next('/login');
				}
			},
		},
		{
			path: '/CategoriesTest/ClientExperience',
			name: 'ClientExperience',
			component: () => import('@views/Dashboard/ModuleTestM/Experience/Experience.vue'),
			beforeEnter: (to, from, next) => {
				if (isAuthenticated()) {
				next();
				} else {
				next('/login');
				}
			},
		},
		{
			path: '/CategoriesTest/OrgCulTalent',
			name: 'OrgCulTalent',
			component: () => import('@views/Dashboard/ModuleTestM/Talento/Talento.vue'),
			beforeEnter: (to, from, next) => {
				if (isAuthenticated()) {
				next();
				} else {
				next('/login');
				}
			},
		},
		{
			path: '/CategoriesTest/Product-Services',
			name: 'Product-Services',
			component: () => import('@views/Dashboard/ModuleTestM/Productos/Productos.vue'),
			beforeEnter: (to, from, next) => {
				if (isAuthenticated()) {
				next();
				} else {
				next('/login');
				}
			},
		},
		{
			path: '/CategoriesTest/InfraTec',
			name: 'InfraTec',
			component: () => import('@views/Dashboard/ModuleTestM/Infra/Infra.vue'),
			beforeEnter: (to, from, next) => {
				if (isAuthenticated()) {
				next();
				} else {
				next('/login');
				}
			},
		},
		{
			path: '/CategoriesTest/Process',
			name: 'Process',
			component: () => import('@views/Dashboard/ModuleTestM/Procesos/Procesos.vue'),
			beforeEnter: (to, from, next) => {
				if (isAuthenticated()) {
				next();
				} else {
				next('/login');
				}
			},
		},
		{
			path: '/CategoriesTest/Info-Data',
			name: 'Info-Data',
			component: () => import('@views/Dashboard/ModuleTestM/Info/Info.vue'),
			beforeEnter: (to, from, next) => {
				if (isAuthenticated()) {
				next();
				} else {
				next('/login');
				}
			},
		},
		{
			path: '/Profile/:id',
			name: 'Profile',
			props: true,
			component: () => import('@views/Dashboard/Team/Profile.vue'),
		},
		{
			path: '/sidebar',
			name: 'sidebar',
			component: () => import('@components/sidebar.vue'),
		},
		{
			path: '/projects',
			name: 'projects',
			component: () => import('@views/Dashboard/Projects/Projects.vue'),
		},
		{
			path: '/projects/createProject/',
			name: 'newProject',
			component: () => import('@views/Dashboard/Projects/NewProject/createProject.vue'),
		},
		{
			path: '/projects/detalle',
			name: 'ProjectDetailing',
			component: () => import('@views/Dashboard/Projects/ProjectDetail/ProjectDetailing.vue'),
		},
  	],
})