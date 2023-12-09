import { get, put, post, del } from "./api.js";

const itemName = "userData"

const endpoints = {
    dashboard: "data/motorcycles?sortBy=_createdOn%20desc",
    add: "data/motorcycles",
    details: "data/motorcycles/",
    edit: "data/motorcycles/",
    delete: "data/motorcycles/",

}

export function getUserData() {
    return JSON.parse(localStorage.getItem(itemName));
}

export function setUserData(data) {
    return localStorage.setItem(itemName, JSON.stringify(data));
}

export function clearUserData() {
    return localStorage.removeItem(itemName);
}

export async function getItems() {
    const result = await get(endpoints.dashboard);
    return result
}

export async function addItem(data) {
    const result = await post(endpoints.add, data)
}

export async function getDetails(id) {
    const result = await get(endpoints.details + id);
    return result;
}

export async function deleteItem(id) {
    await del(endpoints.delete + id)
}

export async function editItem(id, data) {
    const result = await put(endpoints.edit + id, data)
    return result
}

export async function searchItem(searchText) {
    const query = encodeURIComponent(`model LIKE "${searchText}"`)
    const result = await get(`data/motorcycles?where=${query}`);
    return result
}



