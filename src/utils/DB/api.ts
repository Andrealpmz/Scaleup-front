import axios from 'axios';
import typeProject from '../interfaces/project';
import Area from '../interfaces/area';
import typeTeam from '../interfaces/team';
import Role from '../interfaces/role';
import User from '../interfaces/user';
import Resource from '../interfaces/resource';

const baseURL = 'http://localhost:3000';

const apiClient = axios.create({
  baseURL,
});

export async function getAllProjects(id: number): Promise<typeProject[]> {
  const response = await apiClient.get(`/organizations/projects/org/${id}`);
  return response.data;
}

export async function getOneProjects(id_org : number) {
  const response = await apiClient.get(`/organizations/project/id/${id_org}`);
  return response.data;
}

export async function getAllResources(project_id : number) {
  const response = await apiClient.get(`/organizations/project/recursos/${project_id}`);
  return response.data;
}

export async function getAllArea(type : String) {
  const response = await apiClient.get(`/organizations/${type}/areas/`);
  return response.data;
}

export async function getAllRoles() {
  const response = await apiClient.get(`/organizations/roles/`);
  return response.data;
}

export async function getAllUsers() {
  const response = await apiClient.get(`/user/users/`);
  return response.data;
}

export async function getOrganization(nit : number) {
  const response = await apiClient.get(`/organizations/${nit}`);
  return response.data;
}

export async function createOrganization(data: any) {
  const response = await apiClient.post('/organizations', data);
  return response.data;
}

export async function loginOrganization(data: any) {
  const response = await apiClient.post('/organizations/login', data);
  return response.data;
}

export async function createProject(data: typeProject) {
  const response = await apiClient.post('/organizations/project', data);
  return response.data;
}

export async function AssignTeam(data: typeTeam) {
  const response = await apiClient.post('/organizations/project/team', data);
  return response.data;
}

export async function saveResource(data: Resource) {
  const response = await apiClient.post('/organizations/Resources', data);
  return response.data;
}

export async function assignArea(data: Area) {
  const response = await apiClient.post('/organizations/Area', data);
  return response.data;
}

export async function createRol(data: Role) {
  const response = await apiClient.post('/organizations/Role', data);
  return response.data;
}

export async function insertUser(data: User) {
  const response = await apiClient.post('/user/create', data);
  return response.data;
}

export async function deleteProject(id: number) {
  const response = await apiClient.delete(`/organizations/project/${id}`);
  return response.data;
}
