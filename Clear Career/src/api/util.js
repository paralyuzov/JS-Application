import { get, put, post, del } from "./api.js";

const itemName = "userData"

const endpoints = {
    dashboard: "data/offers?sortBy=_createdOn%20desc",
    add: "data/offers",
    details: "data/offers/",
    edit: "data/offers/",
    delete: "data/offers/",

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
    const query = encodeURIComponent(`name LIKE "${searchText}"`)
    const result = await get(`data/fruits?where=${query}`);
    return result
}

export async function applyOffer(offerId) {
    const result = post(`data/applications`, { offerId });
    return result;
}


export async function getTotalOffers(offerId) {
    const result = await get(`data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`);
    return result;
}

export async function getMyOffers(offerId, userId) {
    const result = await get(`data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
    return result;
}





