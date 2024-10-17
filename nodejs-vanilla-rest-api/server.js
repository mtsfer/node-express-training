import http from "http";
import {getProducts, getProductById, createProduct, updateProduct, deleteProduct} from "./controllers/product-controller.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
    if (req.url === '/api/products' && req.method === 'GET') {
        await getProducts(req, res);
    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET') {
        await getProductById(req, res);
    } else if (req.url === '/api/products' && req.method === 'POST') {
        await createProduct(req, res);
    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'PUT') {
        await updateProduct(req, res);
    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'DELETE') {
        await deleteProduct(req, res);
    } else {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({message: "Route Not Found"}));
    }
});

server.listen(PORT, () => `Server running on port ${PORT}`);
