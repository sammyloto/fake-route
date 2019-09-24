
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const locations = require('../locations.json');

io.on('connection', (socket) => {
    console.log('a user connected');
});


app.get('/fakeroute', async (req, res) => {
    const timeout = 3000;

    const done = locations.coordinates.forEach((item, index) => {
        // eslint-disable-next-line
        setTimeout(() => {
            io.emit('route', item, index);
            return JSON.stringify(item, index);
        }, index * timeout);
    });
    res.send(done);
});


const server = http.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log('listening on *:3000');
});
process.on('SIGHUP', () => {
    server.close();
});
