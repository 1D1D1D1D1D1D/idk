const express = require('express');
const jsonServer = require('json-server');
const bodyParser = require('body-parser');
const fs = require('fs');
require('dotenv').config();
const path = require('path');
const { Readable } = require('stream')

const server = express();
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(bodyParser.json());


server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    const isPublic = ['/login'].some(publicPath => req.path.startsWith(publicPath));
    if (isPublic || req.method === 'OPTIONS') {
        return next();
    }
    next();
});
server.use(async (req, res, next) => {
    await new Promise((res) => {
        setTimeout(res, 800);
    });
    next();
});


// server.post('/chat/completions', async (req, res) => {
//     try {
//         const upstreamResponse = await fetch('https://models.github.ai/inference/chat/completions', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${process.env.CHATGPT_API_KEY}`
//             },
//             body: JSON.stringify({
//                 model: 'openai/gpt-4.1',
//                 messages: req.body.messages,
//                 stream: true
//             })
//         });

//         if (!upstreamResponse.ok || !upstreamResponse.body) {
//             return res.status(500).end('Streaming failed');
//         }

//         res.setHeader('Content-Type', 'text/event-stream');
//         res.setHeader('Cache-Control', 'no-cache');
//         res.setHeader('Connection', 'keep-alive');

//         // Конвертируем WebReadableStream → Node.js Readable
//         const nodeReadable = Readable.fromWeb(upstreamResponse.body);
//         nodeReadable.pipe(res);

//         nodeReadable.on('error', (err) => {
//             console.error('Stream error:', err);
//             res.end();
//         });

//     } catch (error) {
//         console.error('Proxy error:', error);
//         res.status(500).end('Internal Proxy Error');
//     }
// });
server.post('/login', (req, res) => {
    const { username, password } = req.body;
    const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'utf-8'));
    const user = db.users.find(u => u.username === username && u.password === password);

    if (user) {
        return res.json({
            ...user,
            token: user.id.toString()
        });
    }

    return res.status(403).json({ message: 'Invalid credentials' });
});

server.use((req, res, next) => {
    if (req.method === 'POST' && req.path === '/login') return next();

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'AUTH ERROR: Missing or invalid token' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'utf-8'));
        const user = db.users.find(u => u.id.toString() === token);

        if (!user) {
            return res.status(403).json({ message: 'AUTH ERROR: User not found' });
        }

        req.user = user;
        next();
    } catch (e) {
        return res.status(500).json({ message: 'Server error' });
    }
});

server.use(router);
server.listen(8001, () => {
    console.log(' Server running at http://localhost:8001');
});
