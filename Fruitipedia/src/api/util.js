import { get, put, post, del } from "./api.js";

const itemName = "userData"

const endpoints = {
    dashboard: "data/fruits?sortBy=_createdOn%20desc",
    newFruit: "data/fruits",
    fruitDetails: "data/fruits/",
    editingFruit: "data/fruits/",
    deleteFruit: "data/fruits/",

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
    const result = await post(endpoints.newFruit, data)
}

export async function getDetails(id) {
    const result = await get(endpoints.fruitDetails + id);
    return result;
}

export async function deleteItem(id) {
    await del(endpoints.deleteFruit + id)
}

export async function editItem(id, data) {
    const result = await put(endpoints.editingFruit + id, data)
    return result
}

export async function searchItem(searchText) {
    const query = encodeURIComponent(`name LIKE "${searchText}"`)
    const result = await get(`data/fruits?where=${query}`);
    return result
}



