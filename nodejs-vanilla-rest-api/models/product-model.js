import fs from "fs/promises";
import {v4 as uuidv4} from "uuid";
import {writeDataToFile} from "../utils.js";

let products = await fs.readFile('./data/products.json', 'utf8')
    .then(data => JSON.parse(data))
    .catch(err => console.log(err));

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products);
    });
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const product = products.find(product => product.id === id);
        resolve(product);
    })
}

function create(product) {
    return new Promise(async (resolve, reject) => {
        const newProduct = {id: uuidv4(), ...product};
        products.push(newProduct);
        await writeDataToFile('./data/products.json', products);
        resolve(newProduct);
    })
}

function update(id, product) {
    return new Promise(async (resolve, reject) => {
        const index = products.findIndex(product => product.id === id);
        products[index] = {id, ...product};
        await writeDataToFile('./data/products.json', products);
        resolve(products[index]);
    })
}

function remove(id) {
    return new Promise(async (resolve, reject) => {
        products = products.filter(product => product.id !== id);
        await writeDataToFile('./data/products.json', products);
        resolve();
    })
}

export {findAll, findById, create, update, remove};
