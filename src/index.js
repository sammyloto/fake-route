const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', async (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
});

// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
// });

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        // eslint-disable-next-line no-console
        console.log(`message: ${msg}`);
    });
});


const server = app.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log('listening on *:3000');
});
process.on('SIGHUP', () => {
    server.close();
});
