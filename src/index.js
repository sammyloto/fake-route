
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const locations = require('../locations.json');

io.on('connection', (socket) => {
    console.log('a user connected');
});


app.get('/fakeroute', async (req, res) => {
    // const locations = [
    //     { locationOne: [-1.289984, 36.783166] },
    //     { locationTwo: [-1.290928, 36.783271] },
    //     { locationThree: [-1.291744, 36.783410] },
    //     { locationFour: [-1.292403, 36.783480] },
    //     { locationFive: [-1.292344, 36.784247] },
    //     { locationSix: [-1.292280, 36.785513] },
    // ];

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
