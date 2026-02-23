import {
    io
} from "../app.js";

io.on('connection', (client) => {
    console.log('Se conecto un cliente: ', client.id);

    client.on('voted', (id) => {
        console.log('voted', id);
        client.broadcast.emit('voted2', {
            id
        })
    });
});