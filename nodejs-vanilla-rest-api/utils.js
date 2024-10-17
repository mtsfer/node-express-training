import fs from 'fs/promises';

async function writeDataToFile(filename, content) {
    await fs.writeFile(filename, JSON.stringify(content), { encoding: 'utf8' })
        .then(() => console.log('Successfully written'))
        .catch(err => console.log(`An error happening while writing product to file ${err}`));
}

function getRequestBody(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', (chunk) => body += chunk.toString());
            req.on('end', async () => resolve(JSON.parse(body)));
        } catch (error) {
            reject(error);
        }
    })
}

export {writeDataToFile, getRequestBody};
