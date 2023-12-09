import { get, put, post, del } from "./api.js";

const itemName = "userData"

const endpoints = {
    dashboard: "data/facts?sortBy=_createdOn%20desc",
    addFact: "data/facts",
    factDetails: "data/facts/",
    editFact: "data/facts/",
    deleteFact: "data/facts/",

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
    const result = await post(endpoints.addFact, data)
}

export async function getDetails(id) {
    const result = await get(endpoints.factDetails + id);
    return result;
}

export async function deleteItem(id) {
    await del(endpoints.deleteFact + id)
}

export async function editItem(id, data) {
    const result = await put(endpoints.editFact + id, data)
    return result
}

// export async function searchItem(searchText) {
//     const query = encodeURIComponent(`name LIKE "${searchText}"`)
//     const result = await get(`data/fruits?where=${query}`);
//     return result
// }



