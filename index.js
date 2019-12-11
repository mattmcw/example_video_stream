'use strict'

const fs = require('fs')
const express = require('express');
const WebSocket = require('ws');

const WSS_PORT = 8080;
const APP_PORT = 8000;
 
const wss = new WebSocket.Server({ port: WSS_PORT });

const viewers = [];
 
wss.on('connection', function connection (ws, req) {
    if (req.url === '/broadcast') {
        console.log('Broadcaster connected')
        ws.on('message', function incoming (data) {
            for (let viewer of viewers ) {
                viewer.send(data);
            }
        });
    } else if (req.url === '/view') {
        console.log('Viewer connected')
        viewers.push(ws)
    }
});


const app = express()

app.get('/view', (req, res, next) => {
    let body = fs.readFileSync('view.html', 'utf8')
    return res.end(body)
})

app.get('/broadcast', (req, res, next) => {
    let body = fs.readFileSync('broadcast.html', 'utf8')
    return res.end(body)
})

app.listen(APP_PORT, () => {

})