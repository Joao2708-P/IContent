import axios, { Axios, AxiosResponse } from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});

const api2 = axios.create()

export interface Search
{
    search: string;
}

export interface Content
{
    id: string;
    title: string;
    body: string;
    slug: string;
    image_content: string;
    assessment: string;
    schoolSubjectId: string;
    schoolLevelId: string;
}

export interface User
{
    name: string;
    user_name: string;
    email: string;
    password: string;
    image_user: string;
    schoolLevelId: string;
}

export interface Level
{
    id: string;
    level: string;
    slug: string;
}

export interface Auht
{
    email: string
    password: string    
}

export async function getUniqueContent(id: string)
{
    try
    {
        const response: AxiosResponse<Content>= await api.get(`/get-content/${id}`);
        const content: Content = response.data
        const contentData: Content = content as Content

        return contentData
    }
    catch(error)
    {
        throw new Error("Erro ao buscar o conteúdo: " + error);
    }
}


export async function getContent(): Promise<Content[]> 
{
    try 
    {
        const response: AxiosResponse<Content[]> = await api.get(`/get-all-contents`);
        return response.data
    }
    catch(error)
    {
        throw new Error('Erro ao buscar conteúdo');
    }
}

export async function getNivel(): Promise<Level[]>
{
    try 
    {
        const response: AxiosResponse<Level[]> = await api.get('/get-all-levels')
        console.log(response)
        return response.data;
    }
    catch(error)
    {
        console.log(error)
        throw new Error('Erro eu pegar o nível: ')
    }
}

export async function getUniqueLevel(id: string): Promise<Level>
{
    try
    {
        console.log(id)
        const response: AxiosResponse<Level> = await api.get(`/get-level/${id}`);
        
        const levels: Level = response.data
        const levelData: Level = levels as Level

        return levelData
    }
    catch(error)
    {
        throw new Error('Erro ao pegar nível');
    }
}

export async function postUser(user: User): Promise<User[]> 
{
    try
    {
        console.log(user)
        const response: AxiosResponse<User[]> = await api.post('/create-user', user)
        return response.data
    }
    catch(error)
    {
        throw new Error('Erro ao criar usuário');
    }
}