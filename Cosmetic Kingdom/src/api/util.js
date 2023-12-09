import { get, put, post, del } from "./api.js";

const itemName = "userData"

const endpoints = {
    dashboard: "data/products?sortBy=_createdOn%20desc",
    add: "data/products",
    details: "data/products/",
    edit: "data/products/",
    delete: "data/products/",

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

export async function addBuys(productId) {
    const result = post(`data/bought`, { productId });
    return result;
}


export async function getTotalBuys(productId) {
    const result = await get(`data/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&count`);
    return result;
}

export async function getMyBuys(productId, userId) {
    const result = await get(`data/bought?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
    return result;
}





