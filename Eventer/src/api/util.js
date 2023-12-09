import { get, put, post, del } from "./api.js";

const itemName = "userData"

const endpoints = {
    dashboard: "data/events?sortBy=_createdOn%20desc",
    add: "data/events",
    details: "data/events/",
    edit: "data/events/",
    delete: "data/events/",
    addEventPeople: "data/going"

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
    return result;
}

export async function addItem(data) {
    const result = await post(endpoints.add, data);
}

export async function getDetails(id) {
    const result = await get(endpoints.details + id);
    return result;
}

export async function deleteItem(id) {
    await del(endpoints.delete + id);
}

export async function editItem(id, data) {
    const result = await put(endpoints.edit + id, data);
    return result;
}

export async function searchItem(searchText) {
    const query = encodeURIComponent(`model LIKE "${searchText}"`)
    const result = await get(`data/motorcycles?where=${query}`);
    return result
}

export async function addEventPeople(id) {
    await post(endpoints.addEventPeople, { eventId: id });
}

export async function getTotalGoing(id) {
    const url = `data/going?where=eventId%3D%22${id}%22&distinct=_ownerId&count`;
    return await get(url);

}
