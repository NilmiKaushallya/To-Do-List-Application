import axios from "axios";
import {LOGIN, MARK_TODO, UPDATE_TODO} from './apiConstants.js';
import {REGISTER} from './apiConstants.js';
import {CREATE_TODO} from './apiConstants.js';
import {TODO_LIST} from './apiConstants.js';
import {DELETE_TODO} from './apiConstants.js';

export const login = async (data) =>{
    return axios.post(LOGIN, data)
}

export const register = async (data) =>{
    return axios.post(REGISTER, data)
}

export const createTodoApi = async (data) =>{
    let token = getToken();
    console.log(token, 'token');

    return axios.post(CREATE_TODO, data, {
        headers: {
            auth: token
        }
    })
}

export const getTodoApi = async (data) =>{
    let token = getToken();
    console.log(token, 'token');

    return axios.get(TODO_LIST, {
        headers: {
            auth: token
        }
    })
}

export const deleteTodoApi = async (data) =>{
    let token = getToken();
    console.log(token, 'token');

    return axios.post(DELETE_TODO, data, {
        headers: {
            auth: token
        }
    })
}

export const MarkTodoApi = async (data) =>{
    let token = getToken();

    return axios.post(MARK_TODO, data, {
        headers: {
            auth: token
        }
    })
}

export const UpdateTodoApi = async (data) =>{
    let token = getToken();

    return axios.post(UPDATE_TODO, data, {
        headers: {
            auth: token
        }
    })
}

export function getToken() {
    let user= localStorage.getItem('user');
    if(!user) return
    const userobj=JSON.parse(user);
    return userobj.token;
}