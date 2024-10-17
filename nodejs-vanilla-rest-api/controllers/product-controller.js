import {findAll, findById, create, update, remove} from "../models/product-model.js";
import {getRequestBody} from "../utils.js";

// @desc    Gets all products
// @route   GET /api/products
async function getProducts(req, res) {
    try {
        const products = await findAll();
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(products));
    } catch (error) {
        console.log(error);
    }
}

// @desc    Gets product by id
// @route   GET /api/products/:id
async function getProductById(req, res) {
    try {
        const id = req.url.split('/')[3];
        const product = await findById(id);
        if (product) {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(product));
        } else {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: "Product Not Found"}));
        }
    } catch (error) {
        console.log(error);
    }
}

// @desc    Create a product
// @route   POST /api/products
async function createProduct(req, res) {
    try {
        const {title, description, price} = await getRequestBody(req);
        const product = {title, description, price};
        const newProduct = await create(product);
        res.writeHead(201, {"Content-Type": "application/json"});
        res.end(JSON.stringify(newProduct));
    } catch (error) {
        console.log(error);
    }
}

// @desc    Update a product
// @route   PUT /api/products/:id
async function updateProduct(req, res) {
    try {
        const id = req.url.split('/')[3];
        const product = await findById(id);
        if (product) {
            const {title, description, price} = await getRequestBody(req);
            const productData = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price,
            };
            const updatedProduct = await update(id, productData);
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(updatedProduct));
        } else {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: "Product Not Found"}));
        }
    } catch (error) {
        console.log(error);
    }
}

// @desc    Delete a product
// @route   DELETE /api/products/:id
async function deleteProduct(req, res) {
    const id = req.url.split('/')[3];
    const product = await findById(id);
    if (product) {
        await remove(id);
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify({message: `Product ${id} removed successfully`}));
    } else {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({message: "Product Not Found"}));
    }

}

export {getProducts, getProductById, createProduct, updateProduct, deleteProduct};
