import axios, { AxiosBasicCredentials } from 'axios';

const baseURL = 'https://glab-startups.atlassian.net/rest/api/3/';

const apiClient = axios.create({
  baseURL,
});

export async function getOneProjectJira(project_id: number) {
  const response = await apiClient.get(`/project/${project_id}`);
  return response.data;
}

export async function createProjectJira(issueData: any) {
    const response = await apiClient.post('/project', issueData);
    return response.data;
}
  
export async function getOneIssue(key: string, username: string, password: string) {
  const response = await apiClient.post(`issue/${key}`, null, {
    auth: setBasicAuth(username, password),
  });
  return response.data;
}

// Función para configurar la autenticación básica con usuario y contraseña
const setBasicAuth = (username: string, password: string): AxiosBasicCredentials => ({
  username,
  password,
});