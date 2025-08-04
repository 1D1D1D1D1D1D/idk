const fs = require('fs');
require('dotenv').config();
const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

const axios = require('axios');
server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);



// server.post('/chat/completions', async (req, res) => {
//     let rawBody = '';
//     req.on('data', chunk => (rawBody += chunk));
//     req.on('end', async () => {
//         try {
//             const parsed = JSON.parse(rawBody);
//             const response = await fetch('https://models.github.ai/inference', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${process.env.CHATGPT_API_KEY}`
//                 },
//                 body: JSON.stringify({
//                     model: parsed.model || 'openai/gpt-4.1',
//                     messages: parsed.messages,
//                     stream: true
//                 })
//             });

//             if (!response.ok || !response.body) {
//                 return res.status(500).end('Streaming failed');
//             }

//             res.setHeader('Content-Type', 'text/event-stream');
//             res.setHeader('Cache-Control', 'no-cache');
//             res.setHeader('Connection', 'keep-alive');

//             const reader = response.body.getReader();
//             const decoder = new TextDecoder();

//             while (true) {
//                 const { done, value } = await reader.read();
//                 if (done) break;
//                 res.write(decoder.decode(value));
//             }

//             res.end();
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ error: 'Stream error' });
//         }
//     });
// });
server.use(async (req, res, next) => {
    await new Promise((res) => {
        setTimeout(res, 800);
    });
    next();
});
server.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const { users = [] } = db;

        const userFromBd = users.find(
            (user) => user.username === username && user.password === password,
        );

        if (userFromBd) {
            return res.json(userFromBd);
        }

        return res.status(403).json({ message: 'User not found' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

// eslint-disable-next-line
server.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'AUTH ERROR' });
    }

    next();
});

server.use(router);
server.listen(8001, () => {
    console.log('server is running on 8001 port');
});

